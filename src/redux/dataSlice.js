import { createSlice } from '@reduxjs/toolkit';

const calculateRemainder = (price, deposit) => price - deposit;

const initialState = {
  name: "Ramle Yatçı",
  price: 2500,
  deposit: 750,
  remainder: 0, // Başlangıç değeri sıfır olarak ayarlıyoruz
  orderDate: new Date(),
  deliveryDate: new Date("2024-07-8")
};
initialState.remainder = calculateRemainder(initialState.price, initialState.deposit);

initialState.deliveryDate = initialState.deliveryDate-initialState.orderDate;  // tarih farklarını milisaniye cinsinden hesapla
initialState.deliveryDate = Math.floor(initialState.deliveryDate/ 86400000 +1);//milisaniyeyi güne çevir


const dataSlice = createSlice({
  name: 'data',
  initialState,

  reducers: {
    // Reducer fonksiyonları burada tanımlanabilir
  },
});

export default dataSlice.reducer;
