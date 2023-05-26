import {CircularProgress, useMediaQuery} from "@mui/material";
import styles from './Sidebar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {loadOrderFromLocalStorage, setCurrentRestaurantId, setShowSidebar} from "../../store/systemSlice";
import {useGetAllRestaurantsQuery} from "../../store/queries/dbApi";
import {RestaurantItem} from "../RestaurantItem/RestauranItem";
import {AlertDialog} from "../UI/AlertDialog/AlertDialog";
import {useState} from "react";
import {clearLocalStorage} from "../../helpers/localStorageFns";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const Sidebar = () => {
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 768px)');
  const showSidebar = useSelector((state) => state.system.showSidebar)
  const currentRestaurantId = useSelector((state) => state.system.currentRestaurantId)
  const order = useSelector((state) => state.system.order)

  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [clickedRest, setClickedRest] = useState(null)


  const { allRestaurants, isLoading, isError  } = useGetAllRestaurantsQuery('s',{
    // skip: !allMemeLoad,
    selectFromResult: ({data}) => {
      return {
        allRestaurants: data?.allRestaurants
      }
    },
  })

  if (isLoading) return <div className={styles.loader}> <CircularProgress /> </div>

  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.show : ''}`}>
      {isMobile && (
        <div className={styles.burgerBtn}>
          <ArrowBackIosIcon
            htmlColor={'white'}
            fontSize={'large'}
            onClick={() => dispatch(setShowSidebar(false))}
          />
        </div>
      )}

      <AlertDialog
        fnOK={() => {
          clearLocalStorage()
          dispatch(loadOrderFromLocalStorage())
          dispatch(setCurrentRestaurantId({id: clickedRest, coordinates: allRestaurants.find(el => el.id === clickedRest).coordinates  }))
          setIsOpenAlert(false)
          setClickedRest(null)
        }}
        fnCansel={() => {
          setIsOpenAlert(false)
          setClickedRest(null)
        }}
        isOpen={isOpenAlert}
      />


      {
        isError && <div className={styles.loader}> Помилка завантаження </div>
      }


      {
        allRestaurants?.length &&
        <div>
          {
            allRestaurants.map(item => {
              return (
                <RestaurantItem
                  key={item.id}
                  name={item.name}
                  onClickItem={() => {
                    if (!currentRestaurantId || !order) {
                      dispatch(setCurrentRestaurantId({id: item.id, coordinates: item.coordinates}))
                    } else {
                      setClickedRest(item.id)
                      setIsOpenAlert(true)
                    }
                  }}
                  isActive={currentRestaurantId === item.id}
                />
              )
            })
          }
        </div>
      }
    </div>
  )
}
