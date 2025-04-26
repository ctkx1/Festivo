import { View, Text, Image } from "react-native"
import React from "react"
import { NewsData } from "@/constants/posts"

const MainNews = ({ id, title, description, image }: NewsData) => {
	return (
		<View className='w-full px-4 bg-black/70 rounded-lg mb-5'>
			<View className='relative rounded-lg overflow-hidden aspect-square'>
				<Image
					source={image}
					className='w-full h-[250px] rounded-lg'
					resizeMode='center'
				/>
				<View className='w-full items-center'>
					<Text className='text-accent text-3xl font-bold'>{title}</Text>
				</View>
			</View>
		</View>
	)
}

export default MainNews
