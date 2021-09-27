import * as React from 'react';
import { Fab } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

import Form from './Form';
import About from './About';

const infoStyle = {
    position: 'fixed',
    marginLeft: '15px',
    marginTop: '15px',
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Info() {
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormOpen = () => {
        setForm(true);
    };

    const handleFormClose = () => {
        setForm(false);
    };

    return (
        <div>
            <Fab
                aria-label='info'
                color="primary"
                onClick={handleClickOpen}
                style={infoStyle}
            >
                <InfoOutlinedIcon />
            </Fab>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Container>
                    <Grid
                        container
                        item
                        justifyContent='center'
                        rowSpacing={3}
                    >
                        <Grid container item xs={12}>
                            <About />
                        </Grid>
                        <Grid container item xs={4} md={2}>
                            <Button
                                variant="outlined"
                                onClick={handleFormOpen}
                            >
                                Upload Your Hum
                            </Button>
                        </Grid>
                        <Dialog open={form} onClose={handleFormClose}>
                            <DialogTitle>Upload Hum</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Upload your hum using the form below
                                </DialogContentText>
                                <Form />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleFormClose}>Cancel</Button>
                                <Button onClick={handleFormClose}>Upload</Button>
                            </DialogActions>
                        </Dialog>
                        {/* <Form /> */}
                    </Grid>
                </Container>
            </Dialog>
        </div>
    )

}