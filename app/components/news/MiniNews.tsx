import { View, Text, Image } from 'react-native'
import React from 'react'
import { NewsData } from '@/constants/posts';
import { Link } from 'expo-router'

const MiniNews = ({id, title, description, image}: NewsData) => {
  return (
    // <Link href={`/posts/${id}`} asChild>
      <View className="flex-row w-full px-4 py-2 mb-2">
        <Image 
          source={image} 
          style={{width: 80, height: 80}} 
          className="rounded-md"
          resizeMode="cover"
        />
        <View className="flex-1 pl-3 pr-4 justify-center">
          <Text className="text-white font-bold text-base">{title}</Text>
          <Text className="text-gray-400 text-sm mt-1" numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    // </Link>
  )
}

export default MiniNews