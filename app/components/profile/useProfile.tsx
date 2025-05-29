import { useState, useEffect } from "react"
import { Alert } from "react-native"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

export default function useProfile(session: Session) {
	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState("")
	const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
	const [avatarKey, setAvatarKey] = useState(0)
	const [imageError, setImageError] = useState(false)

	useEffect(() => {
		if (session?.user?.id) {
			getProfile()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session?.user?.id])

	async function getProfile() {
		try {
			setLoading(true)
			setImageError(false)
			if (!session?.user) throw new Error("Brak zalogowanego użytkownika")

			const { data, error, status } = await supabase
				.from("profilestest")
				.select("username, date_of_birth, avatar_url")
				.eq("id", session.user.id)
				.single()

			if (error && status !== 406) throw error

			if (data) {
				setUsername(data.username)
				setDateOfBirth(data.date_of_birth ? new Date(data.date_of_birth) : null)

				if (data.avatar_url) {
					const testUrl = `${data.avatar_url}?t=${Date.now()}`
					try {
						const resp = await fetch(testUrl, { method: "HEAD" })
						if (resp.ok) {
							setAvatarUrl(testUrl)
						} else {
							setAvatarUrl(null)
							setImageError(true)
						}
					} catch {
						setAvatarUrl(null)
						setImageError(true)
					}
				} else {
					setAvatarUrl(null)
				}
			}
		} catch (err) {
			console.error(err)
			Alert.alert("Błąd", (err as Error).message)
		} finally {
			setLoading(false)
		}
	}

	async function updateProfile({
  username: newUsername,
  date_of_birth,
  avatar_url,
}: {
  username: string
  date_of_birth: Date | null
  avatar_url: string | null
}) {
  try {
    setLoading(true)
    if (!session?.user) throw new Error("Brak zalogowanego użytkownika")

    const updates: Record<string, any> = {
      id: session.user.id, // bardzo ważne!
      username: newUsername,
    }

    if (date_of_birth) {
      updates.date_of_birth = date_of_birth.toISOString().split("T")[0]
    }

    if (avatar_url !== null) {
      updates.avatar_url = avatar_url
    }

    const { error } = await supabase
      .from("profilestest")
      .upsert(updates, { onConflict: "id" })

    if (error) throw error

    Alert.alert("Sukces", "Profil został zaktualizowany")
    setUsername(newUsername)
    setDateOfBirth(date_of_birth)
    if (avatar_url !== avatarUrl) {
      setAvatarUrl(avatar_url ? `${avatar_url}?t=${Date.now()}` : null)
      setAvatarKey(k => k + 1)
    }
  } catch (err) {
    console.error(err)
    Alert.alert("Błąd", (err as Error).message)
  } finally {
    setLoading(false)
  }
}


	return {
		loading,
		username,
		setUsername,
		dateOfBirth,
		setDateOfBirth,
		avatarUrl,
		avatarKey,
		imageError,
		setImageError,
		getProfile,
		updateProfile,
	}
}
