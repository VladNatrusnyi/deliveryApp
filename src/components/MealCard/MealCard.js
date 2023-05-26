import styles from './MealCard.module.css'
import {Button} from "@mui/material";

export const MealCard = ({data, onBtnClick}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={require(`./../../../server/assets/img/${data.img}.png`)} alt=""/>
      </div>
      <div className={styles.title}>{data.name}</div>
      <div className={styles.infoWrapper}>
        <div>
          <div className={styles.prise}>{data.price} UAN</div>
        </div>

        <Button onClick={onBtnClick} variant="contained">add to Card</Button>

      </div>
    </div>
  )
}
