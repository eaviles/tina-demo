import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';


export default function Form() {
    // const [formValues, setFormValues] = useState(defaultValues);
    const [postcode, setPostcode] = useState(null);
    const [hum, setHum] = useState(null);
    const [country, setCountry] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(hum, "humfile")
        console.log(postcode, "code")

        // const myHeaders = new Headers();
        // const formdata = new FormData();
        // formdata.append("upload", hum);

        // const requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: formdata,
        //     redirect: 'follow'
        // };

        // fetch("https://longesthum.xyz/api/uploadhum", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }

    const isSubmitButtonDisabled = !(
        hum &&
        postcode
    )

    return (
        <Grid container item spacing={1}>
            <form onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Hum
                        <input
                            type="file"
                            accept=".mp3"
                            onChange={(e) => setHum(e.target.files[0])}
                            hidden
                        />
                    </Button>
                    <FormHelperText id="component-helper-text">
                        {hum && hum.name}
                    </FormHelperText>
                </Grid>
                <Grid item xs={12}>

                    <TextField
                        required
                        id="postcode-input"
                        name="postcode"
                        label="Postcode"
                        type="text"
                        onChange={(e) => setPostcode(e.target.value)}
                    >

                    </TextField>
                </Grid>

                {/* <Grid item xs={12}>
                    <CountryDropdown
                        onChange={(e) => setCountry(e)}
                    />
                </Grid>
 */}
                <Grid item xs={12}>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitButtonDisabled}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Grid>
    )

}