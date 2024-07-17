import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { format } from "date-fns";
import Toast from "react-native-toast-message";
import { addOrder } from "../db/databaseService";
import { toastConfig } from "../../toastConfig";
import { Formik } from "formik";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddPage = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, setFieldValue) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFieldValue("deliveryDate", formattedDate);
    hideDatePicker();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Adı Soyadı gereklidir"),
    price: Yup.number().required("Fiyat gereklidir"),
    deposit: Yup.number().required("Kapora gereklidir"),
    deliveryDate: Yup.string().required("Teslim tarihi gereklidir"),
  });

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <Formik
        initialValues={{
          name: "",
          price: "",
          deposit: "",
          orderDate: format(new Date(), "yyyy-MM-dd"),
          deliveryDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const remainder = parseFloat(values.price) - parseFloat(values.deposit);

          const orderData = {
            name: values.name,
            price: parseFloat(values.price),
            deposit: parseFloat(values.deposit),
            remainder,
            orderDate: values.orderDate,
            deliveryDate: values.deliveryDate,
          };

          try {
            await addOrder(orderData);
            resetForm();
            Toast.show({
              type: "success",
              text1: "Başarılı",
              text2: "Sipariş başarıyla eklendi!",
            });
          } catch (error) {
            console.error("Sipariş eklenirken bir hata oluştu:", error);
            Toast.show({
              type: "error",
              text1: "Hata",
              text2: "Sipariş eklenirken bir hata oluştu.",
            });
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View className="flex-1 pt-16 px-5 space-y-10">
            <Text className="text-2xl text-center border-b pb-6">
              Yeni Sipariş Oluştur
            </Text>
            <TextInput
              className="border p-2 rounded-md border-gray-400"
              placeholder="Adı Soyadı"
             
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {errors.name && touched.name && showSnackbar(errors.name)}
            <TextInput
              className="border p-2 rounded-md border-gray-400"
              placeholder="Fiyat"
             
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              keyboardType="numeric"
            />
            {errors.price && touched.price && showSnackbar(errors.price)}
            <TextInput
              className="border p-2 rounded-md border-gray-400"
              placeholder="Kapora"
              
              onChangeText={handleChange("deposit")}
              onBlur={handleBlur("deposit")}
              keyboardType="numeric"
            />
            {errors.deposit && touched.deposit && showSnackbar(errors.deposit)}
            <View>
              <TouchableOpacity
                onPress={showDatePicker}
                className="flex flex-row h-10 items-center mb-4 rounded-lg border-gray-400 border justify-center px-2"
              >
                <Icon name="calendar" size={24} color="black" />
                <Text className="" style={{ marginLeft: 10 }}>
                  {values.deliveryDate ? values.deliveryDate : "Teslim Tarihi Seç"}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => handleConfirm(date, setFieldValue)}
                onCancel={hideDatePicker}
              />
            </View>
            {errors.deliveryDate && touched.deliveryDate && showSnackbar(errors.deliveryDate)}
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
                className="w-full text-center text-lg text-white py-3 bg-emerald-500 rounded-lg"
                onPress={handleSubmit}
              >
                <Text className="text-center text-xl">Ekle</Text>
              </TouchableOpacity>
            </View>
            <Toast config={toastConfig} />
            <Snackbar
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              duration={3000}
              style={{ backgroundColor: 'red' }}
            >
              {snackbarMessage}
            </Snackbar>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default AddPage;
