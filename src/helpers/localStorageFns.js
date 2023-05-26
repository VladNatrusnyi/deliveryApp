export const saveDataToLocalStorage = (data) =>  {
  localStorage.setItem('order', JSON.stringify(data));
}

// Зчитує дані з localStorage
export const loadDataFromLocalStorage = () => {
  const data = localStorage.getItem('order');
  return data ? JSON.parse(data) : null;
}

export const addOrUpdateDish = (dishId, restaurantId, count) =>  {
  const order = loadDataFromLocalStorage();

  if (order) {
    const existingDish = order.dishes.find(dish => dish.dishId === dishId);
    if (existingDish) {
      count ? existingDish.count = count : existingDish.count += 1
    } else {
      order.dishes.push({
        dishId, count: 1
      });
    }

    saveDataToLocalStorage(order);
  } else {
    const order = {
      id: new Date().toISOString(),
      restaurantId,
      name: '',
      address: '',
      email: '',
      phoneNumber: '',
      dishes: [
        {
          dishId, count: 1
        }
      ]
    }

    saveDataToLocalStorage(order);

  }
}


export const removeDish = (dishId) => {
  const order = loadDataFromLocalStorage();

  const updatedDishes = order.dishes.filter(dish => dish.dishId !== dishId);

  saveDataToLocalStorage({
    ...order,
    dishes: updatedDishes
  });
}


export const clearLocalStorage = () => {
  localStorage.clear();
}


// Зміна значення поля "name" у LocalStorage
export const changeNameInLocalStorage = (name) => {
  const order = loadDataFromLocalStorage();
  if (order) {
    order.name = name;
    saveDataToLocalStorage(order);
  }
}

// Зміна значення поля "address" у LocalStorage
export const changeAddressInLocalStorage = (address) => {
  const order = loadDataFromLocalStorage();
  if (order) {
    order.address = address;
    saveDataToLocalStorage(order);
  }
}

// Зміна значення поля "phoneNumber" у LocalStorage
export const changePhoneNumberInLocalStorage = (phoneNumber) => {
  const order = loadDataFromLocalStorage();
  if (order) {
    order.phoneNumber = phoneNumber;
    saveDataToLocalStorage(order);
  }
}

// Зміна значення поля "email" у LocalStorage
export const changeEmailInLocalStorage = (email) => {
  const order = loadDataFromLocalStorage();
  if (order) {
    order.email = email;
    saveDataToLocalStorage(order);
  }
}
