import styles from './RestaurantItem.module.css'
export const RestaurantItem = ({name, onClickItem, isActive}) => {
  return (
    <div onClick={onClickItem} className={`${styles.wrapper} ${isActive && styles.active}`}>
      {name}
    </div>
  )
}
