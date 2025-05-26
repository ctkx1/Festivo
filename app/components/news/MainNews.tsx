import { View, Text, Image } from "react-native"
import React from "react"
import { NewsItem } from "@/interfaces/NewsItem"

const MainNews = ({ id, title, description, image }: NewsItem) => {
	return (
		<View className='w-full px-4 bg-black/70 rounded-lg mb-5'>
			<View className='relative rounded-lg overflow-hidden aspect-square'>
				<Image
					source={{ uri: image }}
					className='w-full h-[250px] rounded-lg'
					resizeMode='cover'
				/>
				<View className='w-full items-center mt-4'>
					<Text className='text-accent text-3xl font-bold text-center'>
						{title}
					</Text>
				</View>
			</View>
		</View>
	)
}

export default MainNews
