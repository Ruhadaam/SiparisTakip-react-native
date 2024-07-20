import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { SQLiteProvider } from "expo-sqlite";
import { getData, updateData } from "../db/databaseService";
import { differenceInDays } from "date-fns";
import { toastConfig } from "../../toastConfig";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns"; // Importing format function from date-fns

const UpdatePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const updatedOrder = {
        ...selectedOrder,
        remainder: parseFloat(selectedOrder.price) - parseFloat(selectedOrder.deposit)
      };

      await updateData(updatedOrder);
      setModalVisible(false);
      fetchData();
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Sipariş güncellendi",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Sipariş güncellenirken bir hata oluştu.",
      });
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedOrder((prevOrder) => ({
      ...prevOrder,
      deliveryDate: formattedDate
    }));
    hideDatePicker();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#EAD6EC", "#AAF2E8"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <SQLiteProvider databaseName="SiparisTakip.db">
        <View style={{ paddingTop: 40, paddingHorizontal: 28 }}>
          <Text style={{ fontSize: 24, textAlign: "center", borderBottomWidth: 1, borderBottomColor: "#4B5563", paddingBottom: 24 }}>
            Siparişler
          </Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orders.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 40, fontSize: 24 }}>
              Hiç sipariş yok 😥
            </Text>
          ) : (
            <>
              {orders.map((item) => (
                <View
                  style={{ flexDirection: "row", paddingHorizontal: 32, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#D1D5DB", paddingBottom: 20, paddingTop: 12, borderRadius: 20, backgroundColor: "#FFFFFF80", margin: 20 }}
                  key={item.id}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ paddingLeft: 96, justifyContent: "space-between", flexDirection: "row", paddingBottom: 8, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: "#0000001A" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.name}</Text>
                      <TouchableOpacity onPress={() => handleEdit(item)}>
                        <Icon name="edit" size={28} color="green" />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8 }}>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 24 }}>{item.remainder}TL</Text>
                        <Text style={{ fontSize: 12 }}>Kaldı</Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{ fontWeight: "bold", fontSize: 24, color: differenceInDays(new Date(item.deliveryDate), new Date()) <= 1 ? "#EF4444" : differenceInDays(new Date(item.deliveryDate), new Date()) <= 5 ? "#F97316" : "#3B82F6" }}
                        >
                          {differenceInDays(new Date(item.deliveryDate), new Date()) + 1}
                        </Text>
                        <Text
                          style={{ fontWeight: "bold", fontSize: 12, color: differenceInDays(new Date(item.deliveryDate), new Date()) <= 1 ? "#EF4444" : differenceInDays(new Date(item.deliveryDate), new Date()) <= 5 ? "#F97316" : "#3B82F6" }}
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
        <Toast config={toastConfig} />
      </SQLiteProvider>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="p-10 items-center rounded-xl bg-white w-80">
            <Text className="mb-5 text-xl">Sipariş Düzenle</Text>
            <View className="space-y-5 w-full">
              <TextInput
                className="border p-2 rounded-md border-gray-400 w-full"
                placeholder="İsim"
                value={selectedOrder?.name}
                onChangeText={(text) => setSelectedOrder({ ...selectedOrder, name: text })}
              />
              <TextInput
                className="border p-2 rounded-md border-gray-400 w-full"
                placeholder="Fiyat"
                value={selectedOrder?.price?.toString()}
                onChangeText={(text) => setSelectedOrder({ ...selectedOrder, price: text })}
              />
              <TextInput
                className="border p-2 rounded-md border-gray-400 w-full"
                placeholder="Kapora"
                value={selectedOrder?.deposit?.toString()}
                onChangeText={(text) => setSelectedOrder({ ...selectedOrder, deposit: text })}
              />
            </View>
            <TouchableOpacity
              onPress={showDatePicker}
              className="flex flex-row h-10 items-center w-full my-5 rounded-lg border-gray-400 border justify-center px-2"
            >
              <Icon name="calendar" size={24} color="black" />
              <Text className="ml-3">
                {selectedOrder?.deliveryDate ? selectedOrder.deliveryDate : "Teslim Tarihi Seç"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <View className="flex-row justify-between w-full mt-3">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="p-3 bg-red-600 text-base rounded">İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text className="p-3 bg-yellow-500 text-base rounded">Güncelle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};
export default UpdatePage;
