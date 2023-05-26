const express = require('express');
const app = express();
const PORT = 5000; // Ви можете змінити цей порт на бажаний

app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Реалізуйте тут ваші маршрути та функції для роботи з даними

// ===================РЕСТОРАНИ ================================
const fs = require('fs');
const path = require('path');

const restaurantsFilePath = path.join(__dirname, 'data', 'restaurants.json');

// Функція для отримання списку ресторанів
function getRestaurants() {
  const data = fs.readFileSync(restaurantsFilePath);
  return JSON.parse(data);
}

// Маршрут для отримання списку ресторанів
app.get('/restaurants', (req, res) => {
  const restaurants = getRestaurants();
  res.json(restaurants);
});

// Маршрут для отримання ресторану по id
app.get('/restaurants/:id', (req, res) => {
  const restaurants = getRestaurants();
  const restaurant = restaurants.find((r) => r.id === req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ error: 'Restaurant not found' });
  }
});

// ================================= СТРАВИ ===============================

const dishesFilePath = path.join(__dirname, 'data', 'dishes.json');

// Функція для отримання списку страв по id ресторану
function getDishesByRestaurantId(restaurantId) {
  const data = fs.readFileSync(dishesFilePath);
  const dishes = JSON.parse(data);
  return dishes.dishes.filter((d) => d.restaurantId === restaurantId);
}


// Функція для отримання страви по id
function getDishById(dishId) {
  const data = fs.readFileSync(dishesFilePath);
  const dishes = JSON.parse(data);
  return dishes.dishes.find((d) => d.id === dishId);
}

// Функція для отримання страв по декільком id передіні в зпит через кому
function getDishesByIds(dishIds) {
  const data = fs.readFileSync(dishesFilePath);
  const dishes = JSON.parse(data);
  return dishes.dishes.filter((d) => dishIds.includes(d.id));
}


// Маршрут для отримання списку страв по списку id страв
app.get('/dishesIDS/:ids', (req, res) => {
  const dishIds = req.params.ids.split(',');
  const dishes = getDishesByIds(dishIds);
  if (dishes.length > 0) {
    res.json(dishes);
  } else {
    res.status(404).json({ error: 'Dishes not found' });
  }
});

// Маршрут для отримання списку страв по id ресторану
app.get('/restaurants/:id/dishes', (req, res) => {
  const dishes = getDishesByRestaurantId(req.params.id);
  res.json(dishes);
});

// Маршрут для отримання страви по id
app.get('/dishes/:id', (req, res) => {
  const dish = getDishById(req.params.id);
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ error: 'Dish not found' });
  }
});

// ================================= ЗАМОВЛЕННЯ ============================

const purchasesFilePath = path.join(__dirname, 'data', 'orders.json');

// Функція для отримання збережених покупок по email або номеру телефону замовника
function getPurchasesByCustomerInfo(customerInfo) {
  const data = fs.readFileSync(purchasesFilePath);
  const purchases = JSON.parse(data);
  return purchases.filter(
    (p) =>
      p.email === customerInfo || p.phoneNumber === customerInfo
  );
}

// Функція для збереження покупок
function savePurchases(purchases) {
  const purchasesData = JSON.stringify(purchases, null, 2);
  fs.writeFileSync(purchasesFilePath, purchasesData);
}

// Функція для отримання збережених покупок
function getPurchases() {
  const data = fs.readFileSync(purchasesFilePath);
  const purchases = JSON.parse(data);
  return purchases;
}

// Маршрут для збереження нової покупки
app.post('/purchases', (req, res) => {
  const purchases = getPurchases();

  purchases.orders.push(req.body);
  savePurchases(purchases);
  res.json(req.body);
});

// Маршрут для отримання збережених покупок по email або номеру телефону замовника
app.get('/purchases', (req, res) => {
  const customerInfo = req.query.customerInfo;
  const purchases = getPurchasesByCustomerInfo(customerInfo);
  res.json(purchases);
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
