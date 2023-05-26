import styles from './MealCardInCart.module.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {TextField} from "@mui/material";
import {addOrUpdateDish, removeDish} from "../../helpers/localStorageFns";
import {loadOrderFromLocalStorage} from "../../store/systemSlice";
import {useDispatch} from "react-redux";
export const MealCardInCart = ({data, amount = 1}) => {
  const dispatch = useDispatch()

  const deleteDishFromCart = () => {
    removeDish(data.id)
    dispatch(loadOrderFromLocalStorage())
  }

  return (
    <div className={styles.wrapper}>
      <div onClick={deleteDishFromCart} className={styles.button}>
        <ClearOutlinedIcon />
      </div>
      <div className={styles.imgWrapper}>
        <img
          className={styles.img}
          src={require(`./../../../server/assets/img/${data.img}.png`)}
          alt=""
        />
      </div>
      <div className={styles.rightPartWrapper}>
        <div className={styles.title}>{data.name}</div>
        <div className={styles.price}>Price: {data.price} UAN</div>
        <div className={styles.counter}>
          <TextField
            id="outlined-number"
            size="small"
            label="Amount"
            type="number"
            value={amount}
            inputProps={{ min: 1 }}
            onChange={(e) => {
              addOrUpdateDish(data.id, data.restaurantId, e.target.value)
              dispatch(loadOrderFromLocalStorage())
            }
            }
            min={'1'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
