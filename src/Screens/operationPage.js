import { Text, TouchableOpacity, View,StyleSheet,ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsPage = () => {
  return (
    <LinearGradient
      className="flex-1 "
      colors={["#EAD6EC", "#AAF2E8"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView>
   <View className="flex-1 px-4 py-5">


   

        <View className="space-y-4 pt-5 pb-5">
          <TouchableOpacity  style={style.box} className="flex-row justify-between items-center bg-white p-4 rounded">
            <Text className="text-zinc-600  font-bold text-lg">EKLE</Text>
            <Icon name="plus" size={30} color="green" />
          </TouchableOpacity>
          <TouchableOpacity  style={style.box} className="flex-row justify-between items-center bg-white p-4 rounded">
            <Text className="text-zinc-600 font-bold text-lg">SİL</Text>
            <Icon name="trash" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity  style={style.box} className="flex-row justify-between items-center bg-white p-4 rounded">
            <Text className="text-zinc-600  font-bold text-lg">GÜNCELLE</Text>
            <Icon name="pencil" size={30} color="rgb(255, 192, 0)" />
          </TouchableOpacity>
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


export default SettingsPage;
