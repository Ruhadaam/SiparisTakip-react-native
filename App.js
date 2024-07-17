import { Text, View, SafeAreaView, Button, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./src/Screens/homePage";
import OperationPage from "./src/Screens/operationPage";
import UpdatePage from "./src/Screens/UpdatePage";
import AddPage from "./src/Screens/AddPage";
import DeletePage from "./src/Screens/DeletePage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import "react-native-gesture-handler";
import { useEffect } from "react";
import {  createTable, resetTable } from "./src/db/databaseService";
import StatsPage from "./src/Screens/statsPage";
import EditPage from "./src/Screens/EditPage";

console.log("redux is working!");

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OperationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OperationPage" component={OperationPage} />
      <Stack.Screen name="UpdatePage" component={UpdatePage} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="DeletePage" component={DeletePage} />
      <Stack.Screen name="EditPage" component={EditPage} /> 
    </Stack.Navigator>
  );
}


export default function App() {
  useEffect(() => {
    createTable();
  }, []);

  return (
   
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar animated={true} backgroundColor="black" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Siparişler") {
                  iconName = focused ? "home" : "home";
                } else if (route.name === "İşlemler") {
                  iconName = focused ? "cogs" : "cogs";
                } else if (route.name === "İstatistik") {
                  iconName = focused ? "chart-bar" : "chart-bar"; // FontAwesome5 ikonu
                }
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              },
              tabBarActiveTintColor: "blue",
              tabBarInactiveTintColor: "gray",
              headerShown: false,
            })}
          >
            <Tab.Screen name="Siparişler" component={HomePage} />
            <Tab.Screen name="İşlemler" component={OperationStack} />
            <Tab.Screen name="İstatistik" component={StatsPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
   
  );
}
