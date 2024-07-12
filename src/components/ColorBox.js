import React from "react";
import { View, StyleSheet } from "react-native";

// Bileşeni tanımlıyoruz, color props alıyor
const ColorBox = ({ color, width, height }) => {
  return (
    <View
      style={[
        styles.box,
        { backgroundColor: color, width: width, height: height },
      ]}
    />
  );
};

// Varsayılan stiller
const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default ColorBox;
