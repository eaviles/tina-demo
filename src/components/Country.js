import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
// import Transition from 'react-transition-group/Transition';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

export default function Country(props) {

    return (
        <Dialog
            fullScreen
            open={props.country}
            onClose={props.handleCountryClose}
            TransitionComponent={Transition}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.handleCountryClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Container>
                <Typography variant='h3'>
                    This interactive web-based vocal work was produced on Wurundjeri and Wardandi Noongar country, where we live and make. We offer our respects to Wurundjeri and Noongar Elders and their Ancestors, those past, present and emerging, and extend that respect to First Nations people across the continent - we recognise that voice, country, multispecies kinship, community and art practice have been taking place for thousands of years and continue to take place on stolen and unceded lands.
                </Typography>
            </Container>
        </Dialog>
    )

}