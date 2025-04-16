import MainNews from "../components/news/MainNews";
import MiniNews from "../components/news/MiniNews";
import { FlatList, Text, View, Modal, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { dummyposty, NewsData } from "../../constants/posts";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

const News = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<NewsData | null>(null);
  const windowHeight = Dimensions.get('window').height;

  const openPostDetail = (postId: number) => {
    const post = dummyposty.find(item => item.id === postId);
    setSelectedPost(post);
    setModalVisible(true);
  };

  const renderPostDetail = () => {
    if (!selectedPost) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black bg-opacity-95">
          <View className="flex-1">
            <TouchableOpacity 
              className="absolute top-12 right-4 z-10 bg-gray-800 p-2 rounded-full" 
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <ScrollView className="flex-1 bg-black pt-10">
              <Image 
                source={selectedPost.image} 
                style={{width: '90%', height: windowHeight * 0.3, marginLeft: '5%'}} 
                className="rounded-md" 
                resizeMode="cover"
              />
              <View className="p-4">
                <Text className="text-white text-2xl font-bold mb-4">{selectedPost.title}</Text>
                <Text className="text-gray-300">{selectedPost.description}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex-1 bg-black">
      <View className="pb-4 px-4">
        <Text className="text-white text-2xl font-bold text-center">News</Text>
      </View>
      <FlatList 
        data={dummyposty.slice(1)}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => openPostDetail(item.id)}>
            <MiniNews {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <TouchableOpacity onPress={() => openPostDetail(dummyposty[0].id)}>
            <MainNews {...dummyposty[0]} />
          </TouchableOpacity>
        }
        contentContainerStyle={{paddingBottom: 100}}
        showsHorizontalScrollIndicator={false}
      />
      {renderPostDetail()}
    </View>
  );
}

export default News;