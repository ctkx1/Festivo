import { dummyposty } from "@/constants/posts"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const NewsDetails = () => {
	const { id } = useLocalSearchParams()
	const news = dummyposty.find(a => String(a.id) === id)
	const router = useRouter()

	if (!news) {
		return (
			<SafeAreaProvider>
				<SafeAreaView>
					<View className='bg-slate-900 flex-1 justify-center items-center'>
						<Text>Nie znaleziono żadnych newsów</Text>
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		)
	}
	return (
		<SafeAreaProvider>
			<SafeAreaView className='bg-slate-900 flex-1 px-5'>
				<View className='relative'>
					<Image
						className='w-full h-80 rounded-md'
						source={news.image}
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
						<Text className='text-accent text-center text-3xl font-bold mb-4 leading-tight'>
							{news.title}
						</Text>
						<Text className='text-white font-bold text-lg'>
							{news.description}
						</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default NewsDetails
