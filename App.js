import { Text, View, SafeAreaView, Button, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./src/Screens/homePage";
import OperationPage from "./src/Screens/operationPage";
import UpdatePage from "./src/Screens/UpdatePage";
import AddPage from "./src/Screens/AddPage";
import DeletePage from "./src/Screens/DeletePage";
import { FontAwesome } from 'react-native-vector-icons';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import 'react-native-gesture-handler';

console.log('redux is working!'); 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OperationStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
  
      <Stack.Screen name="OperationPage" component={OperationPage} />
      <Stack.Screen name="UpdatePage" component={UpdatePage} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="DeletePage" component={DeletePage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="black"

      />
        <NavigationContainer>
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Siparişler') {
                  iconName = focused ? 'home' : 'home';
                } else if (route.name === 'İşlemler') {
                  iconName = focused ? 'cogs' : 'cogs';
                }
                return <FontAwesome name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
              headerShown: false


            })}
          >
            <Tab.Screen name="Siparişler" component={HomePage} />
            <Tab.Screen name="İşlemler" component={OperationStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
