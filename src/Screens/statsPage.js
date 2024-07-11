import { Text, View } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";

const StatsPage = () => {
  return (
    <LinearGradient
      className="flex-1"
      colors={["#EAD6EC", "#AAF2E8"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
    <View className="flex-1  flex-col items-center justify-center w-full py-32 rounded-lg shadow-lg">

      <View className="flex-row justify-between px-24">

        <View className="flex items-center justify-between w-full mb-4">
          <Text className="text-2xl font-bold border-b pb-1 mb-2">Aktif Sipariş</Text>
          <Text className="text-gray-500 text-xl">10 ADET</Text>
        </View>
        <FontAwesome5 name="shopping-cart" size={36} color="gray" />

        <View className="flex items-center justify-between w-full mb-4">
          <Text className="text-2xl font-bold border-b pb-1 mb-2">Toplam Sipariş</Text>
          <Text className="text-gray-500 text-xl">50 ADET</Text>
        </View>

      </View>

      <View className="flex items-center justify-between w-full">
        <Text className="text-3xl font-bold border-b pb-1 mb-2">Kazanç</Text>
        <Text className="text-green-500 text-2xl">1500 TL</Text>
      </View>
    </View>
    </LinearGradient>
 
  );
};

export default StatsPage;
