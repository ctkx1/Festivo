import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Artist } from "@/interfaces/Artist"

export const useArtists = () => {
	const [artists, setArtists] = useState<Artist[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchArtists = async () => {
			setLoading(true)
			const { data, error } = await supabase.from("artists").select("*")

			if (error) {
				console.error("Supabase error:", error)
			} else {
				setArtists(data as Artist[])
			}
			setLoading(false)
		}

		fetchArtists()
	}, [])

	return { artists, loading }
}
