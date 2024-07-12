import * as SQLite from "expo-sqlite";

//TABLO OLUŞTURMA
export const createTable = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("SiparisTakip");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER,
        deposit INTEGER,
        remainder INTEGER,
        orderDate DATE,
        deliveryDate DATE,
        isCompleted INTEGER DEFAULT 0
      )
    `); // Use template literals for cleaner string construction
    console.log("Tablo başarıyla oluşturuldu");
  } catch (error) {
    console.error("Tablo oluşturulurken bir hatayla karşılaşıldı:", error.message || error);
   
  }
};

//ÖRNEK EKLEME
export const addExample = async () => {
  const db = await SQLite.openDatabaseAsync("SiparisTakip");

  try {
    await db.execAsync(
      `INSERT INTO Orders (name, price, deposit, remainder, orderDate, deliveryDate)VALUES ('Ramle Yatçı', 2500, 1000, 1500, '2024-07-10', '2024-07-15');`
    );
    console.log("örnek veri başarıyla eklendi.");
  } catch (error) {
    console.error("Hata örnek veri eklenirken:", error);
  }
};

//VERİ ÇEKME
export const getData = async () => {
  const db = await SQLite.openDatabaseAsync("SiparisTakip");

  try {
    const allRows = await db.getAllAsync(
      "SELECT * FROM Orders WHERE isCompleted = 0 ORDER BY deliveryDate ASC"
    );

    console.log("Veri alma işlemi başarılı.");
    return allRows;
  } catch (error) {
    console.error("Hata veri alınırken:", error);
  }
};

//VERİ EKLEME
export const addOrder = async (data) => {
  const { name, price, deposit, remainder, orderDate, deliveryDate } = data;

  const db = await SQLite.openDatabaseAsync("SiparisTakip");
  try {
    const insertQuery = `
    INSERT INTO Orders (name, price, deposit, remainder, orderDate, deliveryDate, isCompleted)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    const insertParams = [
      name,
      price,
      deposit,
      remainder,
      orderDate,
      deliveryDate,
      0
    ];

    await db.runAsync(insertQuery, insertParams);
    console.log("Sipariş Başarıyla kaydedildi.");
  } catch (error) {}
};

//VERİ SİLME
export const deleteOrder = async (id) => {
  const db = await SQLite.openDatabaseAsync("SiparisTakip");
  try {
    await db.runAsync("DELETE FROM Orders WHERE id = ?", [id]); // Use a placeholder for id
    console.log("SİLİNDİ!"); // Success message
  } catch (error) {
    console.error(error); // Log the error for debugging
  }
};
//TABLOYU YENİLEME
export const resetTable = async () => {
  const db = await SQLite.openDatabaseAsync("SiparisTakip");

  try {
    await db.execAsync("DROP TABLE Orders");
    console.log("Tablo başarıyla silindi.");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER,
        deposit INTEGER,
        remainder INTEGER,
        orderDate DATE,
        deliveryDate DATE,
        isCompleted INTEGER DEFAULT 0
        `);

    console.log("Tablo başarıyla oluşturuldu.");
  } catch (error) {
    console.error("Hata tablo oluşturulurken:", error);
  }
};


// Sipariş Tamamlama
export const completed = async (id) => { 
  const db = await SQLite.openDatabaseAsync("SiparisTakip");

  try {
    await db.execAsync(`
      UPDATE Orders
      SET isCompleted = 1
      WHERE id = ${id}
    `);

  } catch (error) {
    console.error( error);
  }
};








