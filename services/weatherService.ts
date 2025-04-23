import { WeatherData } from "@/interfaces/interfaces"

const API_KEY = "7f6d3082645e733db31889da87f027d2"
const BASE_URL = "https://api.openweathermap.org/data/2.5/"

export const getWeather = async (city: string): Promise<WeatherData> => {
	const response = await fetch(
		`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
	)
	if (!response.ok) {
		throw new Error("Nie udało się pobrać danych pogodowych")
	}
	const data: WeatherData = await response.json()
	return data
}
