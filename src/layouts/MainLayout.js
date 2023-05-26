import {Header} from "../components/Header/Header";
import {Outlet} from "react-router";
import styles from './MainLayout.module.css'

export const MainLayout = () => {
  return (
    <div className={styles.mainWrapper}>
      <Header />
      <Outlet />
    </div>
  )
}
