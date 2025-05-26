import { useArtists } from "@/services/useArtists"
import { router } from "expo-router"
import {
	ActivityIndicator,
	FlatList,
	Image,
	Pressable,
	Text,
	View,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const Artists = () => {
	const { artists, loading } = useArtists()

	const artistsToShow = artists.sort(() => Math.random() - 0.5).slice(0, 10)

	return (
		<SafeAreaProvider>
			<SafeAreaView className='pb-5'>
				<View className='flex flex-row  justify-between px-9 pb-3'>
					<Text className='text-white uppercase font-bold text-lg'>
						Artyści
					</Text>
					<Pressable onPress={() => router.push("/(tabs)/lineUp")}>
						<Text className='text-accent uppercase font-bold text-lg'>
							więcej →
						</Text>
					</Pressable>
				</View>
				{loading ? (
					<ActivityIndicator size='large' color='#f8b24b' />
				) : (
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
										source={{
											uri: item.img || "https://via.placeholder.com/100",
										}}
										alt={item.name}
									/>
									<View className='flex flex-row justify-center mt-3'>
										<Text className='color-accent font-bold capitalize'>
											{item.name}
										</Text>
									</View>
								</View>
							</Pressable>
						)}
					/>
				)}
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default Artists
