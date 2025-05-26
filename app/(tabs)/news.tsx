import React from "react"
import {
	FlatList,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native"
import MainNews from "../components/news/MainNews"
import MiniNews from "../components/news/MiniNews"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { useNews } from "@/services/useNews"

const News = () => {
	const { news, loading, error } = useNews()

	const openPostDetail = (postId: number) => {
		router.push(`/news/${postId}`)
	}

	if (loading) {
		return (
			<SafeAreaProvider>
				<SafeAreaView className='flex-1 justify-center items-center bg-slate-900'>
					<ActivityIndicator size='large' color='#f8b24b' />
				</SafeAreaView>
			</SafeAreaProvider>
		)
	}

	if (error || news.length === 0) {
		return (
			<SafeAreaProvider>
				<SafeAreaView className='flex-1 justify-center items-center bg-slate-900'>
					<Text className='text-white text-lg'>
						Brak newsów do wyświetlenia.
					</Text>
				</SafeAreaView>
			</SafeAreaProvider>
		)
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView className='flex-1 bg-slate-900 px-3'>
				<View>
					<View className='pb-4 px-4'>
						<Text className='text-accent text-2xl font-bold text-center pt-5'>
							News
						</Text>
					</View>

					<FlatList
						showsVerticalScrollIndicator={false}
						data={news.slice(1)}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => openPostDetail(item.id)}>
								<MiniNews {...item} />
							</TouchableOpacity>
						)}
						keyExtractor={item => item.id.toString()}
						ListHeaderComponent={
							<TouchableOpacity onPress={() => openPostDetail(news[0].id)}>
								<MainNews {...news[0]} />
							</TouchableOpacity>
						}
						contentContainerStyle={{ paddingBottom: 100 }}
						showsHorizontalScrollIndicator={false}
					/>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default News
