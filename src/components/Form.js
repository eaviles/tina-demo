import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
// import Geocode from 'react-geocode';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CountrySelect from './CountrySelect';

// Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

export default function Form(props) {
    // const [formValues, setFormValues] = useState(defaultValues);
    const [postcode, setPostcode] = useState(null);
    const [hum, setHum] = useState(null);
    const [country, setCountry] = useState("null");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(hum, "humfile")
        console.log(postcode, "code")
        console.log(country, "country")
        // Geocode.fromAddress("sdoinfweoirn").then(
        //     response => {
        //         const { lat, lng } = response.results[0].geometry.location;
        //         const coord = { "latitude": lat, "longitude": lng };
        //         // setCoordinates(coord)
        //         console.log(coord)
        //     },
        //     error => {
        //         console.error(error);
        //     }
        // );

        //     const myHeaders = new Headers();
        //     const formdata = new FormData();
        //     formdata.append("upload", hum);
        //     formdata.append("postcode", postcode);
        //     formdata.append("country", country);

        //     const requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: formdata,
        //         redirect: 'follow'
        //     };

        //     fetch("https://longesthum.xyz/api/uploadhum", requestOptions)
        //         .then(response => response.text())
        //         .then(result => console.log(result))
        //         .catch(error => console.log('error', error));

        props.handleFormClose()
    }

    const isSubmitButtonDisabled = !(
        hum &&
        postcode
    )

    return (<>
        <DialogTitle>Upload Hum</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Upload your hum using the form below
            </DialogContentText>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Button
                    variant="outlined"
                    component="label"
                    margin="normal"
                    size="large"
                >
                    Upload Hum
                    <input
                        type="file"
                        accept=".mp3"
                        onChange={(e) => setHum(e.target.files[0])}
                        hidden
                        capture="user" 
                    />
                </Button>
                <FormHelperText id="component-helper-text">
                    {hum ? hum.name: '*no file selected'}
                </FormHelperText>
                <TextField
                    required
                    id="postcode-input"
                    name="postcode"
                    label="Your postcode"
                    type="text"
                    margin="normal"
                    onChange={(e) => setPostcode(e.target.value)}
                >

                </TextField>
                <CountrySelect country={country} setCountry={setCountry}/>
                </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleFormClose}>Cancel</Button>
            <Button
                type="submit"
                disabled={isSubmitButtonDisabled}
                onClick={handleSubmit}
            >Upload</Button>
        </DialogActions>
    </>
    )

}