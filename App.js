import { Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./src/Screens/homePage";
import OperationPage from "./src/Screens/operationPage";
import { FontAwesome } from 'react-native-vector-icons';
import { Provider } from 'react-redux';
import store from './src/redux/store';



console.log('redux is working!'); 


const Tab = createBottomTabNavigator();




export default function App() {
  return (
    <Provider store={store}>
      
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <Tab.Navigator  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Siparişler') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Operation') {
                iconName = focused ? 'cogs' : 'cogs';
              }
              else if (route.name === 'İşlemler') {
                iconName = focused ? 'plus' : 'plus';
              }
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            
          })}
        >
          <Tab.Screen name="Siparişler" component={HomePage} />
          <Tab.Screen name="İşlemler" component={OperationPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </Provider>
  );
}
