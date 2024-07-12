import { Text, View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { VictoryPie, VictoryLabel } from "victory-native";
import ColorBox from "../components/ColorBox";

sampleData = [
  { x: "Ocak", y: 100, color: "#c43a31" },
  { x: "Şubat", y: 50, color: "#f7b733" },
  { x: "Mart", y: 20, color: "#f7cac9" },
  { x: "Nisan", y: 30, color: "#4285f4" },
  { x: "Mayıs", y: 15, color: "#6a3d9a" },
];

const StatsPage = () => {
  return (
    <View className="flex-1 bg-white  flex-col ">
      <ScrollView>
      <View className=" items-center">
        <VictoryPie
          padAngle={2}
          labelRadius={({ innerRadius }) =>
            innerRadius + (90 - innerRadius) / 2
          }
          animate={{
            enter: {
              duration: 500,
              easing: "easeInOut",
            },
          }}
          labels={({ datum }) =>
            `${(
              (datum.y / sampleData.reduce((acc, d) => acc + d.y, 0)) *
              100
            ).toFixed(2)}%`
          }
          width={350}
          height={350}
          innerRadius={40}
          style={{
            data: {},
            labels: {
              fill: "white",
            },
          }}
          colorScale={["#c43a31", "#f7b733", "#f7cac9", "#4285f4", "#6a3d9a"]}
          data={sampleData}
        />
      </View>

      <View className="flex-row ">
        <View className="grid space-y-10 mt-5 pl-20   w-full">
          {sampleData.map((item, index) => (
            <View className="flex-row items-center rounded border-b border-gray-300  w-3/4 px-10 justify-between">
              <View className="flex-row items-center ">
                <ColorBox width={25} height={25} color={item.color} />
                <Text className="text-xl">{item.x}</Text>
              </View>

              <Text className="text-xl">{item.y} adet</Text>
            </View>
          ))}


       
        </View>
      </View>
      
      </ScrollView>
    </View>
  );
};

export default StatsPage;
