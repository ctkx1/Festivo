import { dummyposty } from "@/constants/posts"
import { router } from "expo-router"
import { FlatList, Image, Pressable, Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const HomeNews = () => {
	return (
		<SafeAreaProvider>
			<SafeAreaView className='pt-9 pb-9'>
				<View className='flex flex-row  justify-between px-9 pb-3'>
					<Text className='text-white uppercase font-bold text-lg'>news</Text>
					<Pressable onPress={() => router.push("/(tabs)/news")}>
						<Text className='text-accent uppercase font-bold text-lg'>
							więcej →
						</Text>
					</Pressable>
				</View>
				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					keyExtractor={item => item.id.toString()}
					className='pl-9'
					data={dummyposty}
					renderItem={({ item }) => (
						<Pressable
							className='pr-4'
							onPress={() => router.push(`/news/${item.id}`)}>
							<View className='w-[100px]'>
								<Image
									source={item.image}
									style={{ width: 100, height: 100 }}
								/>
								<Text className='pt-2 text-accent font-bold'>{item.title}</Text>
							</View>
						</Pressable>
					)}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default HomeNews
