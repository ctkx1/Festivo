import { View, Text, Image } from 'react-native'
import React from 'react'
import { NewsData } from '@/constants/posts';

const MainNews = ( {id, title, description, image}: NewsData ) => {
  return (
    <View className="w-full px-4 pb-2 max-h-30 border border-violet-950 rounded-lg mb-5">
      <View className="relative rounded-lg overflow-hidden aspect-square">
        <Image 
          source={image} 
          className="w-full h-full"
          resizeMode="center"
        />
        <View className="absolute bottom-0 w-full p-4 items-center">
          <Text className="text-accent text-3xl font-bold">{title}</Text>
        </View>
      </View>
    </View>
  )
}

export default MainNews