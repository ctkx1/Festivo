import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { dummyposty } from "../../constants/posts";
import MainNews from "../components/news/MainNews";
import MiniNews from "../components/news/MiniNews";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const News = () => {
  const openPostDetail = (postId: number) => {
    router.push(`/news/${postId}`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-900 px-3">
        <View>
          <View className="pb-4 px-4">
            <Text className="text-accent text-2xl font-bold text-center pt-5">
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
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default News;