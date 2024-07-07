import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { format } from "date-fns"; // date-fns kütüphanesini ekleyin

const AddPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [deposit, setDeposit] = useState();
  const [deliveryDate, setDeliveryDate] = useState();

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

  return (
    <View className=" flex-1 pt-16 px-5 space-y-10">
      <Text className="text-2xl text-center  border-b pb-6">Yeni Sipariş Oluştur</Text>
      <TextInput
        className="border p-2 rounded-md border-gray-400"
        placeholder="Adı Soyadı"
        onChangeText={(newName) => setName(newName)}
        defaultValue={name}
      />
      <TextInput
        className="border p-2 rounded-md border-gray-400"
        placeholder="Fiyat"
        onChangeText={(newPrice) => setPrice(newPrice)}
        defaultValue={price}
      />
      <TextInput
        className="border p-2 rounded-md border-gray-400"
        placeholder="Kapora"
        onChangeText={(newDeposit) => setDeposit(newDeposit)}
        defaultValue={deposit}
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
        <Text
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
          className=" w-full text-center text-lg text-white py-3 bg-emerald-600 rounded-lg"
        >
          Ekle
        </Text>
      </View>
    </View>
  );
};

export default AddPage;
