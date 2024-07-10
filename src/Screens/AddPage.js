import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { format } from "date-fns"; // date-fns kütüphanesini ekleyin

import { useDispatch } from "react-redux";
import { addOrder } from "../db/databaseService";

const AddPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [orderDate, setOrderDate] = useState(format (new Date().toISOString(),"yyyy-MM-dd"));
  const [deliveryDate, setDeliveryDate] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setDeliveryDate(formattedDate);
    hideDatePicker();
  };

  const handleAddOrder = async () => {



    const remainder = parseFloat(price) - parseFloat(deposit); // remainder hesaplama

    const orderData = {
      name,
      price: parseFloat(price),
      deposit: parseFloat(deposit),
      remainder,
      orderDate,
      deliveryDate,
    };

    try {
      await addOrder(orderData);
      // Başarılı bir şekilde ekledikten sonra state'i sıfırla veya diğer işlemleri yap
      setName("");
      setPrice("");
      setDeposit("");
      setOrderDate(new Date().toISOString()); // Yeni bir tarih ataması
      setDeliveryDate("");
    } catch (error) {
      console.error("Sipariş eklenirken bir hata oluştu:", error);
      // Hata durumunda kullanıcıya bilgi verilebilir veya gerekli işlemler yapılabilir
    }
  };
  return (
    <View className=" flex-1 pt-16 px-5 space-y-10">
      <Text className="text-2xl text-center  border-b pb-6">
        Yeni Sipariş Oluştur
      </Text>
      <TextInput
        className="border p-2 rounded-md border-gray-400"
        placeholder="Adı Soyadı"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border p-2 rounded-md border-gray-400"
        placeholder="Fiyat"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        className="border p-2 rounded-md border-gray-400"
        placeholder="Kapora"
        value={deposit}
        onChangeText={setDeposit}
        keyboardType="numeric"
      />
      <View>
        <TouchableOpacity
          onPress={showDatePicker}
          className="flex flex-row h-10  items-center  mb-4 rounded-lg border-gray-400 border justify-center px-2 "
        >
          <Icon name="calendar" size={24} color="black" />
          <Text className="" style={{ marginLeft: 10 }}>
            {deliveryDate ? deliveryDate : " Teslim Tarihi Seç"}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View className="items-center">
        <TouchableOpacity
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 16,
          }}
          className=" w-full text-center text-lg text-white py-3 bg-emerald-500 rounded-lg"
          onPress={handleAddOrder}
        >
          <Text className="text-center text-xl">Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPage;
