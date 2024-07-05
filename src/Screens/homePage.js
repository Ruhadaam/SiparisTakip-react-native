import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const HomePage = () => {
  return (
    <LinearGradient
      className="flex-1 "
      colors={["#EAD6EC", "#AAF2E8"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView>
      <View
        style={style.box}
        className="flex-row px-8 items-center border-b border-gray-300 pb-5 pt-3 rounded-xl bg-white m-5"
      >
        <View className="flex-1">
          <View className="pl-24 justify-between flex-row pb-2 mb-5 border-b border-black/10">
            <Text className="font-bold text-xl">Ramle Yatçı</Text>
            <Icon name="trash" size={30} color="red" />
          </View>
          <View className="flex-row justify-between px-2">
            <View className="flex-col items-center">
              <Text className=" text-3xl">500TL</Text>
              <Text className=" text-sm">Kaldı</Text>
            </View>
            <View className="flex-col items-center">
              <Text className=" text-3xl">5</Text>
              <Text className=" text-sm">Gün Kaldı</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={style.box}
        className="flex-row px-8 items-center border-b border-gray-300 pb-5 pt-3 rounded-xl bg-white m-5"
      >
        <View className="flex-1">
          <View className="pl-24 justify-between flex-row pb-2 mb-5 border-b border-black/10">
            <Text className="font-bold text-xl">Ramle Yatçı</Text>
            <Icon name="trash" size={30} color="red" />
          </View>
          <View className="flex-row justify-between px-2">
            <View className="flex-col items-center">
              <Text className=" text-3xl">500TL</Text>
              <Text className=" text-sm">Kaldı</Text>
            </View>
            <View className="flex-col items-center">
              <Text className=" text-3xl">5</Text>
              <Text className=" text-sm">Gün Kaldı</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={style.box}
        className="flex-row px-8 items-center border-b border-gray-300 pb-5 pt-3 rounded-xl bg-white m-5"
      >
        <View className="flex-1">
          <View className="pl-24 justify-between flex-row pb-2 mb-5 border-b border-black/10">
            <Text className="font-bold text-xl">Ramle Yatçı</Text>
            <Icon name="trash" size={30} color="red" />
          </View>
          <View className="flex-row justify-between px-2">
            <View className="flex-col items-center">
              <Text className=" text-3xl">500TL</Text>
              <Text className=" text-sm">Kaldı</Text>
            </View>
            <View className="flex-col items-center">
              <Text className=" text-3xl">5</Text>
              <Text className=" text-sm">Gün Kaldı</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={style.box}
        className="flex-row px-8 items-center border-b border-gray-300 pb-5 pt-3 rounded-xl bg-white m-5"
      >
        <View className="flex-1">
          <View className="pl-24 justify-between flex-row pb-2 mb-5 border-b border-black/10">
            <Text className="font-bold text-xl">Ramle Yatçı</Text>
            <Icon name="trash" size={30} color="red" />
          </View>
          <View className="flex-row justify-between px-2">
            <View className="flex-col items-center">
              <Text className=" text-3xl">500TL</Text>
              <Text className=" text-sm">Kaldı</Text>
            </View>
            <View className="flex-col items-center">
              <Text className=" text-3xl">5</Text>
              <Text className=" text-sm">Gün Kaldı</Text>
            </View>
          </View>
        </View>
      </View>

      

      


      </ScrollView>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  box: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});

export default HomePage;
