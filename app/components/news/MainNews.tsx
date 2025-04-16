import { View, Text, Image } from 'react-native'
import React from 'react'
import { NewsData } from '@/constants/posts';
import { Link } from 'expo-router'

const MainNews = ( {id, title, description, image}: NewsData ) => {
  return (
    // <Link href={`/posts/${id}`} asChild>
    <View className="w-full px-4 pb-2 max-h-30">
      <View className="relative rounded-lg overflow-hidden aspect-square">
        <Image 
          source={image} 
          className="w-full h-full"
          resizeMode="center"
        />
        <View className="absolute bottom-0 w-full p-4">
          <Text className="text-white text-3xl font-bold">{title}</Text>
        </View>
      </View>
    </View>
    // </Link>
  )
}

export default MainNews