import { createSlice } from '@reduxjs/toolkit'
import {loadDataFromLocalStorage} from "../helpers/localStorageFns";

const initialState = {
  showSidebar: false,

  currentRestaurantId: null,
  restaurantCoordinates: null,

  order: null
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload
    },
    setCurrentRestaurantId: (state, action) => {
      state.currentRestaurantId = action.payload.id
      state.restaurantCoordinates = action.payload.coordinates
    },
   loadOrderFromLocalStorage: (state, action) => {
      const data = loadDataFromLocalStorage()
     if (data) {
       state.currentRestaurantId = data.restaurantId
     }

      state.order = data
    },
  },
})


// Action creators are generated for each case reducer function
export const { setCurrentRestaurantId, setShowSidebar, loadOrderFromLocalStorage } = systemSlice.actions

export default systemSlice.reducer
