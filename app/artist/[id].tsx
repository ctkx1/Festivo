import { useArtists } from "@/services/useArtists"
import { Artist } from "@/interfaces/Artist"

import { useLocalSearchParams, useRouter } from "expo-router"
import React from "react"
import {
	Image,
	Linking,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const ArtistsDetails = () => {
	const { artists, loading } = useArtists()
	const { id } = useLocalSearchParams()

	const artistId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id || "-1")
	const artist = artists.find((a: Artist) => a.id === artistId)

	if (!id || isNaN(artistId)) {
		return <Text className='text-white'>Nieprawidłowy identyfikator</Text>
	}

	const router = useRouter()

	if (loading) {
		return (
			<SafeAreaProvider>
				<SafeAreaView className='bg-slate-900 flex-1 justify-center items-center'>
					<Text className='text-white text-xl'>Ładowanie...</Text>
				</SafeAreaView>
			</SafeAreaProvider>
		)
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView className='bg-slate-900 flex-1'>
				<View className='relative'>
					<Image
						className='w-full h-80'
						source={{ uri: artist?.img }}
						resizeMode='cover'
					/>
					<TouchableOpacity
						onPress={() => router.back()}
						className='absolute top-5 left-5 z-20 bg-black/50 px-3 py-1 rounded-full'>
						<Text className='text-white text-lg'>← Wróć</Text>
					</TouchableOpacity>
				</View>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 40 }}>
					<View className='px-6 pt-6'>
						<Text className='text-accent text-center text-4xl font-bold mb-4'>
							{artist?.name}
						</Text>

						<Text className='text-white text-base mb-4'>
							Dzień występu:{" "}
							<Text className='font-semibold'>{artist?.day}</Text>
						</Text>

						{artist?.description && (
							<Text className='text-white text-base leading-relaxed mb-6'>
								{artist?.description}
							</Text>
						)}

						{artist?.listeners && (
							<Text className='text-white text-base mb-6 text-center'>
								Miesięczni słuchacze na Spotify:{" "}
								<Text className='font-semibold'>{artist.listeners}</Text>
							</Text>
						)}

						<View className='flex-row justify-center space-x-6 mt-2'>
							{artist?.Spotify && (
								<TouchableOpacity
									onPress={() => {
										if (artist.Spotify) Linking.openURL(artist.Spotify)
									}}
									className='p-1'>
									<Text className='text-green-400 underline text-m'>
										Spotify
									</Text>
								</TouchableOpacity>
							)}

							{artist?.Youtube && (
								<TouchableOpacity
									onPress={() => {
										if (artist.Youtube) Linking.openURL(artist.Youtube)
									}}
									className='p-1'>
									<Text className='text-red-400 underline text-m'>YouTube</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default ArtistsDetails
