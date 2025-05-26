import {
	FlatList,
	Image,
	Pressable,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { days } from "@/constants/data"
import { useRouter } from "expo-router"
import { useArtists } from "@/services/useArtists"
import { Artist } from "@/interfaces/Artist"

const LineUp = () => {
	const [selectedDay, setSelectedDay] = useState("Wszyscy")
	const { artists, loading } = useArtists()
	const router = useRouter()

	const filteredArtists =
		selectedDay === "Wszyscy"
			? artists
			: artists.filter((artist: Artist) => artist.day === selectedDay)

	return (
		<SafeAreaProvider>
			<SafeAreaView className='bg-slate-900 flex-1'>
				<View>
					<Text className='text-center py-4 font-bold color-accent text-4xl'>
						Line UP
					</Text>

					<View className='flex flex-row gap-1 pb-5 justify-center'>
						{days.map(day => (
							<TouchableOpacity
								key={day}
								onPress={() => setSelectedDay(day)}
								style={{ padding: 10, backgroundColor: "transparent" }}>
								<Text
									style={{
										color: selectedDay === day ? "#f8b24b" : "#fff",
										fontSize: 16,
										textAlign: "center",
									}}>
									{day}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					<View className='items-center'>
						{loading ? (
							<ActivityIndicator size='large' color='#f8b24b' />
						) : (
							<FlatList
								data={filteredArtists}
								numColumns={3}
								showsVerticalScrollIndicator={false}
								renderItem={({ item }) => (
									<Pressable onPress={() => router.push(`/artist/${item.id}`)}>
										<View className='pb-8'>
											<Image
												source={{ uri: item.img }}
												className='w-[100px] h-[100px] rounded-full border-2 border-accent'
											/>
											<View className='flex flex-row justify-between mt-3'>
												<Text className='color-accent font-bold text-xs capitalize'>
													{item.name}
												</Text>
												<Text className='color-accent font-bold text-xs'>
													{item.day}
												</Text>
											</View>
										</View>
									</Pressable>
								)}
								keyExtractor={item => item.id.toString()}
								columnWrapperStyle={{
									justifyContent: "flex-start",
									gap: 20,
								}}
								contentContainerStyle={{
									paddingBottom: 100,
									alignItems: "center",
								}}
								ListFooterComponent={<View style={{ height: 150 }} />}
							/>
						)}
					</View>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default LineUp
