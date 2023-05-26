import {GoogleMap, Marker} from "@react-google-maps/api";
import {useCallback, useRef} from "react";

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1
}
export const Map = ({center, mode, markers, onMarkerAdd}) => {

  const containerStyle = {
    width: '100%',
    height: '250px'
  };

  const mapRef = useRef(undefined)

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined
  }, [])

  const onClick = useCallback(
    (loc) => {
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat()
        const lng = loc.latLng.lng()
        onMarkerAdd({lat, lng})
      }
    }, [mode, onMarkerAdd]
  )

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        <Marker position={center} icon={{url: require('./../../../../assets/rest.png')}} />
        {
          markers && <Marker position={markers} />
        }
      </GoogleMap>
    </div>
  )
}
