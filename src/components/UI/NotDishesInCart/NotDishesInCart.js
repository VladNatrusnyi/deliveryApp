import styles from './NotDishesInCart.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router";
export const NotDishesInCart = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.notDishesText}>
      You have not selected a meal. Return to the catalog and choose what you like.
      <Button onClick={() => navigate('/')} variant="outlined" size="small">
        Go to shop page
      </Button>
    </div>
  )
}
