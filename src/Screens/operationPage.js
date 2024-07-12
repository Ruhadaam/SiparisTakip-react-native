import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import Icon from "react-native-vector-icons/FontAwesome";

const OperationPage = ({ navigation }) => {
  return (
    <LinearGradient
      className="flex-1 "
      colors={["#EAD6EC", "#AAF2E8"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="flex-1 items-center justify-center space-y-10">
        <View className="flex-row space-x-10">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddPage")}
            
            className="flex-row justify-between items-center space-x-3 bg-white/50 p-10 rounded"
          >
            <Text className="text-zinc-600  font-bold text-lg">EKLE</Text>
            <Icon name="plus" size={30} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("DeletePage")}
            
            className="flex-row justify-between items-center space-x-3 bg-white/50 p-10 rounded"
          >
            <Text className="text-zinc-600 font-bold text-lg">SİL</Text>
            <Icon name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>

        <View className="flex-row ">
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdatePage")}
            
            className="flex-row justify-between items-center space-x-3 bg-white/50 p-10 rounded"
          >
            <Text className="text-zinc-600  font-bold text-lg">GÜNCELLE</Text>
            <Icon name="pencil" size={30} color="rgb(255, 192, 0)" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};


export default OperationPage;
