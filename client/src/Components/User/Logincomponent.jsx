import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius:'10px',
  boxShadow: 50,
  p: 4,
  
};

function Logincomponent() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div>
                        <Button onClick={handleOpen} ></Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">

                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                                <h1>hlooo</h1>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Logincomponent
