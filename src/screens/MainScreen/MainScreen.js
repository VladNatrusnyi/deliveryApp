import {CircularProgress, useMediaQuery} from "@mui/material";
import {Backdrop} from "../../components/UI/Backdrop/Backdrop";
import {Sidebar} from "../../components/Sidebar/Sidebar";

import styles from './MainScreen.module.css'
import {useEffect} from "react";
import {useGetDishesForCurrentRestaurantQuery} from "../../store/queries/dbApi";
import {useDispatch, useSelector} from "react-redux";
import {MealCard} from "../../components/MealCard/MealCard";
import {addDishesIdInCard, loadOrderFromLocalStorage, loadSavedCoordinates} from "../../store/systemSlice";
import {addOrUpdateDish} from "../../helpers/localStorageFns";
import axios from "axios";

export const MainScreen = () => {
  const dispatch = useDispatch()

  const currentRestaurantId = useSelector((state) => state.system.currentRestaurantId)


  const { data, isLoading, isError  } = useGetDishesForCurrentRestaurantQuery(currentRestaurantId,{
    skip: !currentRestaurantId,
  })


  useEffect(() => {
    dispatch(loadOrderFromLocalStorage())
  }, [])



  const isMobile = useMediaQuery('(max-width: 768px)');


  return (
    <>
      { isMobile && <Backdrop /> }


      <div className={styles.container}>
        {/*<Header />*/}
        <Sidebar />
        <main className={styles.content}>

          {
            isLoading && <div className={styles.loader}> <CircularProgress /> </div>
          }


          {
            data?.length ?
            <div className={styles.grid_container}>
              {
                data.map(item => {
                  return (
                    <MealCard
                      key={item.id}
                      data={item}
                      onBtnClick={() => {
                        addOrUpdateDish(item.id, currentRestaurantId)
                        dispatch(loadOrderFromLocalStorage())
                      }}
                    />
                  )
                })
              }
            </div>
              : <div className={styles.missingTextCard}>Choose a restaurant to order meals</div>
          }
        </main>
      </div>
    </>
  );
}
