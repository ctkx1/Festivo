import { WeatherData } from "@/interfaces/interfaces"
import { getWeather } from "@/services/weatherService"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Image, Text, View } from "react-native"

const Weather = () => {
	const [weather, setWeather] = useState<WeatherData | null>(null)

	useEffect(() => {
		getWeather("Kalisz")
			.then(data => setWeather(data))
			.catch(err => console.log(err))
	}, [])
	return (
		<View className='pl-9 py-12'>
			{weather ? (
				<>
					<View className='flex items-start'>
						<View className='flex flex-row items-center'>
							<Text className='text-white text-8xl'>
								{Math.round(weather.main.temp)}
								<Text className='text-accent'>°</Text>
							</Text>
							<Image
								source={{
									uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
								}}
								style={{ width: 100, height: 100 }}
							/>
						</View>
						<Text className='text-white text-3xl'>{weather.name}</Text>
					</View>
				</>
			) : (
				<ActivityIndicator size='large' color='#fff' />
			)}
		</View>
	)
}

export default Weather
