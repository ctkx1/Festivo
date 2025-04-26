import { View, Text, Image } from "react-native"
import React from "react"
import { NewsData } from "@/constants/posts"

const MiniNews = ({ id, title, description, image }: NewsData) => {
	return (
		<View className='flex-row w-full px-4 py-2 mb-2 border bg-black/70 rounded-lg'>
			<Image
				source={image}
				style={{ width: 80, height: 80 }}
				className='rounded-md'
				resizeMode='cover'
			/>
			<View className='flex-1 pl-3 pr-4 justify-center'>
				<Text className='text-accent font-bold text-base'>{title}</Text>
				<Text className='text-gray-400 text-sm mt-1' numberOfLines={2}>
					{description}
				</Text>
			</View>
		</View>
	)
}

export default MiniNews
