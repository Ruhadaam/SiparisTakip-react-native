import * as SQLite from "expo-sqlite";

export const getMonthly = async () => {
  const db = await SQLite.openDatabaseAsync("SiparisTakip");

  try {
    const allRows = await db.getAllAsync(
      `SELECT 
CASE 
  WHEN strftime('%m', orderDate) = '01' THEN 'Ocak'
  WHEN strftime('%m', orderDate) = '02' THEN 'Şubat'
  WHEN strftime('%m', orderDate) = '03' THEN 'Mart'
  WHEN strftime('%m', orderDate) = '04' THEN 'Nisan'
  WHEN strftime('%m', orderDate) = '05' THEN 'Mayıs'
  WHEN strftime('%m', orderDate) = '06' THEN 'Haziran'
  WHEN strftime('%m', orderDate) = '07' THEN 'Temmuz'
  WHEN strftime('%m', orderDate) = '08' THEN 'Ağustos'
  WHEN strftime('%m', orderDate) = '09' THEN 'Eylül'
  WHEN strftime('%m', orderDate) = '10' THEN 'Ekim'
  WHEN strftime('%m', orderDate) = '11' THEN 'Kasım'
  WHEN strftime('%m', orderDate) = '12' THEN 'Aralık'
END AS ay,
COUNT(*) AS adet
FROM 
Orders
GROUP BY 
ay
ORDER BY 
ay;`
    );
    console.log(allRows);
    return allRows;
  } catch (error) {
    console.error("Hata veri alınırken:", error);
  }
};

export const getAll = async () => {
    const db = await SQLite.openDatabaseAsync("SiparisTakip");
  
    try {
      const total = [];
  
     
      const total_price = await db.getAllAsync(
        "SELECT SUM(price) AS total_price FROM Orders"
      );
      total.push(total_price[0]);
      const total_order = await db.getAllAsync(
        "SELECT count(id) AS total_order FROM Orders"
      );
      total.push(total_order[0]); 
  
      return total;
    } catch (error) {
      console.error(error);
    }
  };
  
