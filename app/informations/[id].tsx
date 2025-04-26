import { Informations } from "@/constants/info"
import { useLocalSearchParams, useRouter } from "expo-router"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const InformationsDetails = () => {
	const { id } = useLocalSearchParams()
	const info = Informations.find(a => String(a.id) === id)
	const router = useRouter()

	if (!info) {
		return (
			<SafeAreaProvider>
				<SafeAreaView>
					<View className='bg-slate-900 flex-1 justify-center items-center'>
						<Text>Nie znaleziono żadnych informacji</Text>
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		)
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView className='bg-slate-900 flex-1 px-5'>
				<View className='flex items-start  pt-2'>
					<TouchableOpacity
						onPress={() => router.back()}
						className='bg-black/50 px-3 py-1 rounded-full'>
						<Text className='text-white text-lg'>← Wróć</Text>
					</TouchableOpacity>
				</View>
				<View className='flex items-center pt-5'>
					<Text className='text-accent text-4xl uppercase font-bold'>
						{info.name}
					</Text>
				</View>
				<View className='pt-10'>
					<Text className='text-white font-bold text-lg'>
						{info.description}
					</Text>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default InformationsDetails
