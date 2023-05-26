import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


const baseURL = `http://localhost:5000/`


export const dbApi = createApi({
  reducerPath: 'dataBaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      'Content-Type': 'application/json',
    }
  }),

  tagTypes: ['dbData'],

  endpoints: builder => ({

    getAllRestaurants: builder.query({
      query: (arg) => ({
        url: `restaurants`
      }),
      transformResponse: response => ({
        allRestaurants: response.restaurants
      }),
    }),

    getDishesForCurrentRestaurant: builder.query({
      query: (restaurantId) => ({
        url: `/restaurants/${restaurantId}/dishes`
      }),
    }),

    getSeveralDishes: builder.query({
      query: (strOfIds) => ({
        url: `/dishesIDS/${strOfIds}`
      }),
    }),

    createOrder: builder.mutation({
      query: body => ({
        url: '/purchases',
        method: 'POST',
        body
      }),
    }),
  })
})


export const {
  useGetAllRestaurantsQuery,
  useGetDishesForCurrentRestaurantQuery,
  useGetSeveralDishesQuery,

  useCreateOrderMutation


} = dbApi
