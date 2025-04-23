// src/types/WeatherTypes.ts

export interface WeatherData {
	main: {
		temp: number
		humidity: number
	}
	weather: {
		description: string
		icon: string
	}[]
	name: string
}
