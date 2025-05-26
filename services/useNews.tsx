import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { NewsItem } from "@/interfaces/NewsItem"

export const useNews = () => {
	const [news, setNews] = useState<NewsItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchNews = async () => {
			setLoading(true)
			const { data, error } = await supabase
				.from("news")
				.select("*")
				.order("created_at", { ascending: false })

			if (error) {
				console.error("Supabase error:", error.message)
				setError(error.message)
			} else {
				setNews(data || [])
			}
			setLoading(false)
		}

		fetchNews()
	}, [])

	return { news, loading, error }
}
