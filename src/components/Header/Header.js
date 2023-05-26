import {Badge, useMediaQuery} from "@mui/material";
import styles from './Header.module.css'
import {setShowSidebar} from "../../store/systemSlice";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../../helpers/colors";
import {MenuLink} from "../UI/MenuLink/MenuLink";
import BasicMenu from "../UI/BasicMenu/BasicMenu";
import RestaurantIcon from '@mui/icons-material/Restaurant';

const nawLinks = [
  { to: '/', title: 'Shop'},
  { to: '/cart', title: 'Shopping cart', badge: true},
  // { to: '/history', title: 'History'},
  // { to: '/coupons', title: 'Coupons'},
]

export const Header = () => {
  const dispatch = useDispatch()

  const order = useSelector((state) => state.system.order)

  const badge = !order ? 0 : order.dishes.length

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className={styles.header} style={{background: COLORS.primary}}>
      {isSmallScreen && (
        <RestaurantIcon
          htmlColor={'white'}
          fontSize={'large'}
          onClick={() => dispatch(setShowSidebar(true))}
        />
      )}


      {isSmallScreen ?
        <BasicMenu nawLinks={nawLinks} />
          :
        <div className={styles.header_controls_btn_wrapper}>
          {
            nawLinks.map((link,idx) => {
              if (link.badge) {
                return (
                  <Badge key={idx} badgeContent={badge} color="primary">
                    <MenuLink to={link.to} text={link.title} />
                  </Badge>
                )
              } else {
                return <MenuLink key={idx} to={link.to} text={link.title} />
              }
            })
          }
        </div>
      }
    </div>
  )
}
