import { useNews } from "@/services/useNews"
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

const HomeNews = () => {
	const { news, loading } = useNews()
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
				{loading ? (
					<ActivityIndicator size='large' color='#f8b24b' />
				) : (
					<FlatList
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						keyExtractor={item => item.id.toString()}
						className='pl-9'
						data={news}
						renderItem={({ item }) => (
							<Pressable
								className='pr-4'
								onPress={() => router.push(`/news/${item.id}`)}>
								<View className='w-[100px]'>
									<Image
										source={{ uri: item.image }}
										style={{ width: 100, height: 100 }}
									/>
									<Text className='pt-2 text-accent font-bold'>
										{item.title}
									</Text>
								</View>
							</Pressable>
						)}
					/>
				)}
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default HomeNews
