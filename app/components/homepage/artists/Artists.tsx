import { ARTISTS } from "@/constants/artists"
import { router } from "expo-router"
import { FlatList, Image, Pressable, Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const Artists = () => {
	const shuffleArtists = () => {
		const shuffled = [...ARTISTS]

		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
		}

		return shuffled
	}

	const artistsToShow = shuffleArtists().slice(0, 10)

	return (
		<SafeAreaProvider>
			<SafeAreaView className='pb-8'>
				<View className='flex flex-row  justify-between px-9 pb-3'>
					<Text className='text-white uppercase font-bold text-lg'>
						Artyści
					</Text>
					<Pressable onPress={() => router.push("/(tabs)/lineUp")}>
						<Text className='text-accent uppercase font-bold text-xl'>
							więcej →
						</Text>
					</Pressable>
				</View>
				<FlatList
					showsHorizontalScrollIndicator={false}
					data={artistsToShow}
					horizontal={true}
					keyExtractor={item => item.id.toString()}
					className='pl-8'
					renderItem={({ item }) => (
						<Pressable
							className='pr-4'
							onPress={() => router.push(`/artist/${item.id}`)}>
							<View className='pb-8'>
								<Image
									className='w-[100px] h-[100px] rounded-full border-[1px] border-accent'
									key={item.id}
									source={item.img}
									alt={item.name}
								/>
								<View className='flex flex-row justify-center mt-3'>
									<Text className='color-accent font-bold'>{item.name}</Text>
								</View>
							</View>
						</Pressable>
					)}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default Artists
