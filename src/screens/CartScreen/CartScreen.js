import styles from './CartScreen.module.css'
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector,} from "react-redux";
import {loadOrderFromLocalStorage} from "../../store/systemSlice";
import {Alert, Button, CircularProgress, Snackbar} from "@mui/material";
import {MealCardInCart} from "../../components/MealCardInCart/MealCardInCart";
import {
  useCreateOrderMutation,
  useGetSeveralDishesQuery
} from "../../store/queries/dbApi";
import {NotDishesInCart} from "../../components/UI/NotDishesInCart/NotDishesInCart";
import {OrderForm} from "../../components/OrderForm/OrderForm";
import {clearLocalStorage} from "../../helpers/localStorageFns";
export const CartScreen = () => {
  const dispatch = useDispatch()

  const order = useSelector((state) => state.system.order)

  const [isSuccess, setIsSuccess] = useState(false)

  const dishesIfInOrder = order && order.dishes.length ? order.dishes.map(item => item.dishId).join(',').trim() : 'not'

  const { data, isLoading, isError  } = useGetSeveralDishesQuery(dishesIfInOrder,{
    skip: dishesIfInOrder === 'not',
  })

  const [createOrder, {isError: pushError}] = useCreateOrderMutation()



  useEffect(() => {
    dispatch(loadOrderFromLocalStorage())
  }, [])


  const validateOrder = (order) => {
    const errors = [];

    if (!order.name) {
      errors.push('name');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(order.email)) {
      errors.push('email');
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(order.phoneNumber)) {
      errors.push('phoneNumber');
    }

    if (!order.address) {
      errors.push('address');
    }

    return errors;
  };

  const sendData = async () => {
    if (order) {
      const emptyValueKeys = validateOrder(order)
      if (emptyValueKeys.length) {
        alert('Incorrect or not all data entered')
      } else {
        try {
          const response = await createOrder(order);
          if (response.data) {
            setIsSuccess(true)
            clearLocalStorage()
            dispatch(loadOrderFromLocalStorage())
          }
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }


  const totalPrice = data ? data.map(item => {
    const count = order && order.dishes.find(el => el.dishId === item.id)?.count
    return count && item.price ?  count * item.price : 0
  }).reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0




  return (
    <>
      <Snackbar open={isSuccess} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Your order has been successfully accepted!
        </Alert>
      </Snackbar>

      <Snackbar open={pushError} autoHideDuration={3000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          There were problems sending!
        </Alert>
      </Snackbar>

      <div className={`${styles.wrapper} ${!order && styles.empty}`}>
        {
          order && <div className={styles.column}>

            <OrderForm  />

          </div>
        }
        <div className={styles.dishesListWrapper}>
          <div style={{height: '400px'}} className={styles.column}>
            {
              order ?
                <div className={styles.list}>
                  {
                    data && data.length && order.dishes.length
                      ?
                      data.map(item => {
                        return (
                          <MealCardInCart key={item.id} data={item} amount={order.dishes.find(el => el.dishId === item.id)?.count} />
                        )
                      })
                      :
                      <NotDishesInCart />
                  }
                  {
                    isLoading &&  <CircularProgress />
                  }
                </div>
                : <NotDishesInCart />
            }
          </div>
          <div className={styles.controlPanel}>
            <div>
              {/*<Button variant="outlined" size="small">*/}
              {/*  coupons*/}
              {/*</Button>*/}
            </div>
            <div className={styles.btnBlock}>
              <div className={styles.price} >TOTAL price: {totalPrice} UAN</div>
              <Button onClick={sendData} disabled={!order} variant="contained" size="large">
                Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
