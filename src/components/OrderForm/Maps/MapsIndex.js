import {useCallback, useMemo, useState} from "react";
import {useJsApiLoader} from "@react-google-maps/api";
import {MODES, Map} from "./Map/Map";
import {AutoComplete} from "./AutoComplete/AutoComplete";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {changeAddressInLocalStorage} from "../../../helpers/localStorageFns";
import {loadOrderFromLocalStorage} from "../../../store/systemSlice";

const defaultCenter = {
  lat: 50.4501,
  lng: 30.5234
};


const libraries = ['places']

export const MapsIndex = () => {
  const dispatch = useDispatch()
  const restaurantCoordinates = useSelector((state) => state.system.restaurantCoordinates)
  const order = useSelector((state) => state.system.order)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDb3yxQh94uvTA0laJxjhJtbd-bMuLei3M",
    libraries
  })

  const [center, setCenter] = useState(restaurantCoordinates || defaultCenter)
  const [mode, setMode] = useState(MODES.MOVE)

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates)
  }, [])

  const toggleMode = useCallback(
    () => {
      switch (mode) {
        case MODES.MOVE:
          setMode(MODES.SET_MARKER);
          break;
        case MODES.SET_MARKER:
          setMode(MODES.MOVE);
          break;
      }
    }, [mode]
  )

  const onMarkerAdd = (coordinates) => {
    changeAddressInLocalStorage(coordinates)
    dispatch(loadOrderFromLocalStorage())
  }

  const clear = useCallback(() => {
    changeAddressInLocalStorage('')
    dispatch(loadOrderFromLocalStorage())
  }, [])

  const markers = useMemo(() => {
    return order && order.address ? order.address : null
  }, [order])


  return (
    <div>
      {
        isLoaded ?
          <Map center={center} mode={mode} markers={markers} onMarkerAdd={onMarkerAdd}/>
          : <div>Карта не загрузилася</div>
      }

      {
        mode ?
          <Button onClick={toggleMode} variant={'outlined'} size="small">Set Markers</Button>
          : <Button onClick={toggleMode} size="small">Set Markers</Button>
      }
      <Button onClick={clear} size="small">Clear</Button>
      <AutoComplete isLoaded={isLoaded} onSelect={onMarkerAdd} markers={markers}/>
    </div>
  );
}
