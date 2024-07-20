// src/Screens/homePage.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { SQLiteProvider } from "expo-sqlite";
import { completed, getData } from "../db/databaseService";
import {  differenceInDays } from "date-fns"; 
import { toastConfig } from "../../toastConfig";
import Toast from "react-native-toast-message";

const HomePage = () => {
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

  const completeOrder = async (id) => {
    try {
      completed(id);
      fetchData();
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Sipariş başarıyla tamamlandı",
      });
    } catch (error) {
      console.log("Sipariş Tamamlanırken bir hatayla karşılaşıldı.");
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Sipariş eklenirken bir hata oluştu.',
      });
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

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
          {orders.length === 0 ? (
            <Text className="text-center mt-10 text-2xl">
              Hiç sipariş yok 😥
            </Text>
          ) : (
            <>
              {orders.map((item) => (
                <View
                
                  className="flex-row px-8 items-center  pb-5 pt-3 rounded-xl bg-white/50 m-5"
                  key={item.id}
                >
                  <View className="flex-1">
                    <View className="pl-24 justify-between flex-row pb-2 mb-5 border-b border-black/10">
                      <Text className="font-bold text-xl">{item.name}</Text>
                      <TouchableOpacity
                        classname=""
                        onPress={() => completeOrder(item.id)}
                      >
                        <Icon name="check" size={28} color="green" />
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
                            ) <= 1
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
                            ) <= 1
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
            </>
          )}
        </ScrollView>
        <Toast config={toastConfig}/>
      </SQLiteProvider>
    </LinearGradient>
  );
};


export default HomePage;
