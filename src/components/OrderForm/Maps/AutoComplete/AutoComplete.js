import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {useEffect} from "react";
import {TextField} from "@mui/material";
import styles from './AutoComplete.module.css'
import {useDispatch} from "react-redux";
export const AutoComplete = ({isLoaded, onSelect, markers}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  useEffect ( () => {
    if (markers) {
      if (ready) {
        const geocoder = new window.google.maps.Geocoder();
        const location = { lat: markers.lat, lng: markers.lng };

        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK' && results.length > 0) {
            setValue(results[0].formatted_address);
          }
        });
      }
    }
    }, [markers]
  )

  const handleInput = (e) => {
    setValue(e.target.value);
  };



  const handleSelect =
    ({ description }) =>
      () => {
        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          onSelect({ lat, lng })
        });
      };

  const renderSuggestions = () =>
    !markers && data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    if (isLoaded) {
      init()
    }
  }, [isLoaded])


  return (
    <div ref={ref}>
      <TextField
        size={'small'}
        type="search"
        label="Адреса"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        required
        fullWidth
        margin="normal"
      />

      {status === "OK" && <ul className={styles.listWrapper}>{renderSuggestions()}</ul>}
    </div>
  )
}
