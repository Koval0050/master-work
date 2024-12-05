export async function fetchCovidData() {
  try {
    const response = await fetch("http://localhost:5000/api/covid-data", {
      method: "GET", // Тип запиту
      headers: {
        "Content-Type": "application/json", // Вказуємо тип контенту
      },
    });

    if (!response.ok) {
      // Перевіряємо, чи не сталася помилка (якщо статус не 2xx)
      throw new Error("Помилка при отриманні даних");
    }

    const data = await response.json(); // Перетворюємо відповідь у JSON
    console.log(data); // Виводимо отримані дані
    return data; // Повертаємо дані, якщо потрібно
  } catch (error) {
    console.error("Щось пішло не так:", error);
  }
}
