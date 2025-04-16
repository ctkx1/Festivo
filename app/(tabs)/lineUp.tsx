import { Button, FlatList, Image, Pressable, Text, View } from "react-native"
import { ARTISTS } from "@/constants/artists"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { days } from "@/constants/data"
import { useRouter } from "expo-router"

const LineUp = () => {
	const [selectedDay, setSelectedDay] = useState("Wszyscy")
	const filteredArtists =
		selectedDay === "Wszyscy"
			? ARTISTS
			: ARTISTS.filter(artist => artist.day === selectedDay)

	const router = useRouter()
	return (
		<SafeAreaProvider>
			<SafeAreaView className='bg-black flex-1'>
				<View>
					<Text className='text-center py-4 font-bold color-accent text-4xl'>
						Line UP
					</Text>
					<View className='flex flex-row gap-1 pb-5 justify-center'>
						{days.map(day => (
							<Button
								key={day}
								onPress={() => setSelectedDay(day)}
								color={selectedDay === day ? "#f8b24b" : "#fff"}
								title={day}
							/>
						))}
					</View>
					<View className='items-center '>
						<FlatList
							showsVerticalScrollIndicator={false}
							numColumns={3}
							data={filteredArtists}
							renderItem={({ item }) => (
								<Pressable onPress={() => router.push(`/artist/${item.id}`)}>
									<View className='pb-8'>
										<Image
											className='w-[100px] h-[100px] rounded-full border-2 border-accent'
											key={item.id}
											source={item.img}
											alt={item.name}
										/>
										<View className='flex flex-row justify-between mt-3'>
											<Text className='color-accent font-bold text-xs'>
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
							scrollEnabled={true}
							horizontal={false}
							showsHorizontalScrollIndicator={false}
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
					</View>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default LineUp
