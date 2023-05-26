import {TextField} from "@mui/material";
import {MapsIndex} from "./Maps/MapsIndex";
import {useDispatch, useSelector} from "react-redux";
import {
  changeEmailInLocalStorage,
  changeNameInLocalStorage,
  changePhoneNumberInLocalStorage
} from "../../helpers/localStorageFns";
import {loadOrderFromLocalStorage} from "../../store/systemSlice";
export const OrderForm = () => {
  const dispatch = useDispatch()
  const order = useSelector((state) => state.system.order)

  return (
    <>
      <MapsIndex />

      <TextField
        size={'small'}
        label="Email"
        value={order.email}
        onChange={(event) => {
          changeEmailInLocalStorage(event.target.value)
          dispatch(loadOrderFromLocalStorage())
        }}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        size={'small'}
        label="Номер телефону"
        value={order.phoneNumber}
        onChange={(event) => {
          changePhoneNumberInLocalStorage(event.target.value)
          dispatch(loadOrderFromLocalStorage())
        }}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        size={'small'}
        label="Ім'я"
        value={order.name}
        onChange={(event) => {
          changeNameInLocalStorage(event.target.value)
          dispatch(loadOrderFromLocalStorage())
        }}
        required
        fullWidth
        margin="normal"
      />
    </>
  );
}
