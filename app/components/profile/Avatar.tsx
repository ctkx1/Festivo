import { useState } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native"
import { Session } from "@supabase/supabase-js"
import * as ImagePicker from "expo-image-picker"
import { avatarService } from "../../../services/avatarService"

interface AvatarProps {
	session: Session
	username: string
	avatarUrl: string | null
	dateOfBirth: Date | null
	updateProfile: (data: {
		username: string
		date_of_birth: Date | null
		avatar_url: string | null
	}) => Promise<void>
}

export default function Avatar({
	session,
	username,
	avatarUrl,
	dateOfBirth,
	updateProfile,
}: AvatarProps) {
	const [uploadingImage, setUploadingImage] = useState(false)
	const [imageError, setImageError] = useState(false)
	const [avatarKey, setAvatarKey] = useState(0)

	const pickImage = async () => {
		try {
			const permissionResult =
				await ImagePicker.requestMediaLibraryPermissionsAsync()

			if (!permissionResult.granted) {
				Alert.alert(
					"Błąd",
					"Potrzebujemy dostępu do Twoich zdjęć aby kontynuować"
				)
				return
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
				base64: true,
			})

			if (!result.canceled && result.assets && result.assets[0]) {
				const imageUri = result.assets[0].uri
				await uploadAvatar(imageUri)
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error("Błąd wyboru zdjęcia:", error.message)
				Alert.alert("Błąd", error.message)
			}
		}
	}

	const takePhoto = async () => {
		try {
			const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

			if (!permissionResult.granted) {
				Alert.alert("Błąd", "Potrzebujemy dostępu do kamery aby kontynuować")
				return
			}

			const result = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
				base64: true,
			})

			if (!result.canceled && result.assets && result.assets[0]) {
				const imageUri = result.assets[0].uri
				await uploadAvatar(imageUri)
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error("Błąd aparatu:", error.message)
				Alert.alert("Błąd", error.message)
			}
		}
	}

	const uploadAvatar = async (uri: string) => {
		try {
			setUploadingImage(true)
			setImageError(false)

			if (!session?.user) throw new Error("No user on the session!")

			const publicUrl = await avatarService.uploadAvatar(uri, session.user.id)

			// Increment avatar key to force refresh
			setAvatarKey(prevKey => prevKey + 1)

			// Update user profile with new avatar URL
			await updateProfile({
				username,
				date_of_birth: dateOfBirth,
				avatar_url: publicUrl,
			})

			Alert.alert("Sukces", "Zdjęcie profilowe zostało zaktualizowane")
		} catch (error) {
			if (error instanceof Error) {
				console.error("Błąd podczas przesyłania zdjęcia:", error)
				Alert.alert("Błąd podczas przesyłania zdjęcia", error.message)
				setImageError(true)
			}
		} finally {
			setUploadingImage(false)
		}
	}

	const renderAvatar = () => {
		if (uploadingImage) {
			return (
				<View className='w-24 h-24 bg-gray-700 rounded-full justify-center items-center'>
					<ActivityIndicator size='large' color='#F97316' />
				</View>
			)
		}

		if (avatarUrl && !imageError) {
			console.log("Renderowanie avatara z URL:", avatarUrl)
			return (
				<Image
					key={`avatar-${avatarKey}`} // Key to force refresh
					source={{ uri: avatarUrl }}
					className='w-24 h-24 rounded-full'
					onError={e => {
						console.error("Błąd ładowania obrazu:", e.nativeEvent.error)
						setImageError(true)
					}}
				/>
			)
		}

		// Fallback with initial
		return (
			<View className='w-24 h-24 bg-gray-700 rounded-full justify-center items-center'>
				<Text className='text-white text-lg font-bold'>
					{username ? username.charAt(0).toUpperCase() : "?"}
				</Text>
			</View>
		)
	}

	return (
		<View className='w-full items-center my-4'>
			<TouchableOpacity
				className='overflow-hidden mb-4 border-2 border-accent rounded-full'
				onPress={pickImage}
				disabled={uploadingImage}>
				{renderAvatar()}
			</TouchableOpacity>

			<View className='flex-row justify-center space-x-3'>
				<TouchableOpacity
					className='bg-transparent border border-accent py-2 px-4 rounded-lg'
					onPress={pickImage}
					disabled={uploadingImage}>
					<Text className='text-white text-center'>Wybierz zdjęcie</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className='bg-transparent border border-accent py-2 px-4 rounded-lg'
					onPress={takePhoto}
					disabled={uploadingImage}>
					<Text className='text-white text-center'>Zrób zdjęcie</Text>
				</TouchableOpacity>
			</View>

			{imageError && (
				<Text className='text-red-500 mt-2 text-center'>
					Wystąpił błąd z załadowaniem zdjęcia. Spróbuj ponownie.
				</Text>
			)}
		</View>
	)
}
