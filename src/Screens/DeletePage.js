import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DeletePage = () => {
  return (
    <View style={styles.container}>
      <Text>Delete Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeletePage;
