import MainNews from "../components/news/MainNews"
import MiniNews from "../components/news/MiniNews"
import {
	FlatList,
	Text,
	View,
	Modal,
	TouchableOpacity,
	Image,
	ScrollView,
	Dimensions,
} from "react-native"
import { dummyposty, NewsData } from "../../constants/posts"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const News = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [selectedPost, setSelectedPost] = useState<NewsData | null>(null)
	const windowHeight = Dimensions.get("window").height

	const openPostDetail = (postId: number) => {
		const post = dummyposty.find(item => item.id === postId)

		if (post) {
			setSelectedPost(post)
			setModalVisible(true)
		} else {
			console.warn(`Post o ID ${postId} nie został znaleziony.`)
		}
	}

	const renderPostDetail = () => {
		if (!selectedPost) return null

		return (
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}>
				<SafeAreaProvider>
					<SafeAreaView className='flex-1 bg-black bg-opacity-95 justify-center items-center'>
						<View>
							<View className='flex-1'>
								<TouchableOpacity
									className='absolute top-12 right-4 z-10 bg-gray-800 p-2 rounded-full border border-white'
									onPress={() => setModalVisible(false)}>
									<Ionicons name='close' size={24} color='white' />
								</TouchableOpacity>

								<ScrollView
									className='flex-1 bg-black pt-10'
									showsVerticalScrollIndicator={false}
									showsHorizontalScrollIndicator={false}>
									<Image
										source={selectedPost.image}
										style={{
											width: "90%",
											height: windowHeight * 0.3,
											marginLeft: "5%",
										}}
										className='rounded-md border border-accent'
										resizeMode='cover'
									/>
									<View className='p-4'>
										<Text className='text-accent text-2xl font-bold mb-4'>
											{selectedPost.title}
										</Text>
										<Text className='text-gray-300'>
											{selectedPost.description}
										</Text>
									</View>
								</ScrollView>
							</View>
						</View>
					</SafeAreaView>
				</SafeAreaProvider>
			</Modal>
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
						data={dummyposty.slice(1)}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => openPostDetail(item.id)}>
								<MiniNews {...item} />
							</TouchableOpacity>
						)}
						keyExtractor={item => item.id.toString()}
						ListHeaderComponent={
							<TouchableOpacity
								onPress={() => openPostDetail(dummyposty[0].id)}>
								<MainNews {...dummyposty[0]} />
							</TouchableOpacity>
						}
						contentContainerStyle={{ paddingBottom: 100 }}
						showsHorizontalScrollIndicator={false}
					/>
					{renderPostDetail()}
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default News
