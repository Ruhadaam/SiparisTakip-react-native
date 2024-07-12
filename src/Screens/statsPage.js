import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { VictoryPie, VictoryLabel } from "victory-native";
import ColorBox from "../components/ColorBox";
import { getAll, getMonthly } from "../db/readingOperations";

const Colors = [
  "#2196F3",
  "#3F51B5",
  "#4CAF50",
  "#C628AA",
  "#795D3A",
  "#F08080",
  "#9C27B0",
  "#E91E63",
  "#673AB7",
];

const StatsPage = () => {
  const [totalData, setTotalData] = useState({
    totalPrice: null,
    totalOrder: null,
  });
  const [sampleData, setSampleData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getStats = async () => {
    await getMonthly()
      .then((data) => {
        const formattedData = data.map((item, index) => ({
          x: item.ay,
          y: item.adet,
          color: getColorByMonth(index),
        }));
        setSampleData(formattedData);
      })
      .catch((error) => console.error("Veri alınamadı:", error));
  };

  const getColorByMonth = (index) => {
    return Colors[index % Colors.length];
  };
  const fetchData = async () => {
    try {
      const [totalPriceResult, totalOrderResult] = await getAll();
      const totalPrice = totalPriceResult.total_price;
      const totalOrder = totalOrderResult.total_order;
      setTotalData({ totalPrice, totalOrder });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getStats();

    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getStats().then(() => setRefreshing(false));
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-white flex-col">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="items-center">
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
            colorScale={Colors}
            data={sampleData}
          />
        </View>

        <View className="flex-row mb-4">
          <View className="grid space-y-10 items-center w-full">
            {sampleData.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center rounded border-gray-300 w-3/4 px-10 justify-between"
              >
                <View className="flex-row items-center w-1/2">
                  <ColorBox width={25} height={25} color={item.color} />
                  <Text className="text-xl">{item.x}</Text>
                </View>

                <Text className="text-xl">{item.y} adet</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="flex-row">
          <View className="grid space-y-10 items-center w-full mt-10">
            <View className="flex-row items-center rounded border-gray-300 w-3/4 px-10 justify-between">
              <View className="flex-row items-center">
                <Text className="text-lg">Tüm Siparişler</Text>
              </View>

              <Text className="text-2xl">
                {totalData.totalOrder !== null
                  ? totalData.totalOrder
                  : "Loading..."}{" "}
                Adet
              </Text>
              <FontAwesome5 name="shopping-basket" size={25} color="green" />

            </View>
            <View className="flex-row items-center rounded border-gray-300 w-3/4 px-10 justify-between">
              <View className="flex-row items-center">
                <Text className="text-lg">Toplam Kazanç</Text>
              </View>
              <Text className="text-2xl">
                {totalData.totalPrice !== null
                  ? totalData.totalPrice
                  : "Loading..."}
                ₺
              </Text>
              <FontAwesome5 name="coins" size={20} color="gold" />

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsPage;
