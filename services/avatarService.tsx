import { supabase } from "@/lib/supabase"
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { decode } from "base64-arraybuffer"

export const avatarService = {
	uploadAvatar: async (uri: string, userId: string): Promise<string> => {
		// Resize and compress image before uploading
		const manipResult = await manipulateAsync(
			uri,
			[{ resize: { width: 400, height: 400 } }],
			{ compress: 0.7, format: SaveFormat.JPEG, base64: true }
		)

		if (!manipResult.base64) {
			throw new Error("Nie udało się przetworzyć zdjęcia")
		}

		const base64FileData = manipResult.base64
		const contentType = "image/jpeg"
		const fileName = `avatar-${userId}-${Date.now()}.jpg`

		console.log("Przygotowano zdjęcie do wysłania:", fileName)

		// Convert base64 to ArrayBuffer
		const arrayBuffer = decode(base64FileData)

		// Upload to Supabase Storage
		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(fileName, arrayBuffer, {
				contentType,
				upsert: true,
			})

		if (error) {
			console.error("Błąd uploadu do storage:", error)
			throw error
		}

		console.log("Zdjęcie przesłane pomyślnie, plik:", fileName)

		// Set public permissions for the uploaded file
		const { error: aclError } = await supabase.storage
			.from("avatars")
			.update(fileName, arrayBuffer, {
				contentType,
				upsert: true,
				cacheControl: "3600",
			})

		if (aclError) {
			console.error("Błąd ustawiania uprawnień do pliku:", aclError)
		}

		// Get public URL
		const {
			data: { publicUrl },
		} = supabase.storage.from("avatars").getPublicUrl(fileName)

		const urlWithCacheBusting = `${publicUrl}?t=${Date.now()}`
		console.log("Uzyskano publiczny URL:", urlWithCacheBusting)

		// Test the URL before returning it
		try {
			const response = await fetch(urlWithCacheBusting, { method: "HEAD" })
			if (!response.ok) {
				console.error(
					"Nie można uzyskać dostępu do przesłanego zdjęcia, status:",
					response.status
				)
				throw new Error("Przesłane zdjęcie jest niedostępne")
			}
		} catch (fetchError) {
			console.error("Błąd podczas weryfikacji URL zdjęcia:", fetchError)
			throw new Error("Nie można zweryfikować URL zdjęcia")
		}

		// Return the public URL without cache busting for storage
		return publicUrl
	},
}
