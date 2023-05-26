import {setShowSidebar} from "../../../store/systemSlice";
import {useDispatch, useSelector} from "react-redux";
import styles from './Backdrop.module.css'

export const Backdrop = () => {
  const dispatch = useDispatch()

  const showSidebar = useSelector((state) => state.system.showSidebar)

  return (
    <div
      className={`${styles.backdrop} ${showSidebar ? styles.show : ""}`}
      onClick={() => dispatch(setShowSidebar(false))}
    />
  )
}
