// src/Screens/homePage.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { SQLiteProvider } from "expo-sqlite";
import { deleteOrder, getData } from "../db/databaseService";
import { format, differenceInDays } from "date-fns"; // date-fns kütüphanesini ekleyin
import { toastConfig } from "../../toastConfig";
import Toast from "react-native-toast-message";

const DeletePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getData();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Veri alınırken hata oluştu: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let id;

  const deleteData = (id) => {

    try {
 
      deleteOrder(id);
     fetchData();
     Toast.show({
      type: "success",
      text1: "Başarılı",
      text2: "Sipariş başarıyla silindi!",
    });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Sipariş silinirken bir hata oluştu.',
      });
    }
   
   
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <LinearGradient
      className="flex-1"
      colors={["#EAD6EC", "#AAF2E8"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <SQLiteProvider databaseName="SiparisTakip.db">
        <View className="pt-10 px-7">
          <Text className="text-2xl text-center border-b border-gray-700 pb-6">
            Siparişler
          </Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orders.map((item) => (
            <View
              style={style.box}
              className="flex-row px-8 items-center border-b border-gray-300 pb-5 pt-3 rounded-xl bg-white m-5"
              key={item.id}
            >
              <View className="flex-1">
                <View className="pl-24 justify-between flex-row pb-2 mb-5 border-b border-black/10">
                  <Text className="font-bold text-xl text-center">
                    {item.name}
                  </Text>

                  <TouchableOpacity
                    classname=""
                    onPress={() => deleteData(item.id)}
                  >
                    <Icon name="trash" size={25} color="red" />
                  </TouchableOpacity>
                </View>
                <View className="flex-row justify-between px-2">
                  <View className="flex-col items-center">
                    <Text className="text-2xl">{item.remainder}TL</Text>
                    <Text className="text-sm">Kaldı</Text>
                  </View>
                  <View className="flex-col items-center">
                    <Text
                      className={`font-bold text-2xl  ${
                        differenceInDays(
                          new Date(item.deliveryDate),
                          new Date()
                        ) <= 3
                          ? "text-red-500"
                          : differenceInDays(
                              new Date(item.deliveryDate),
                              new Date()
                            ) <= 5
                          ? "text-orange-400"
                          : "text-blue-500"
                      }`}
                    >
                      {differenceInDays(
                        new Date(item.deliveryDate),
                        new Date()
                      ) + 1}
                    </Text>

                    <Text
                      className={`font-bold text-sm ${
                        differenceInDays(
                          new Date(item.deliveryDate),
                          new Date()
                        ) <= 3
                          ? "text-red-500"
                          : differenceInDays(
                              new Date(item.deliveryDate),
                              new Date()
                            ) <= 5
                          ? "text-orange-400"
                          : "text-blue-500"
                      }`}
                    >
                      Gün Kaldı
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <Toast config={toastConfig} />
      </SQLiteProvider>
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

export default DeletePage;
