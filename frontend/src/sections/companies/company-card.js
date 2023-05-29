import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowDownTrayIcon from '@heroicons/react/24/solid/ArrowDownTrayIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, Modal, CardContent, CardMedia, Chip, Divider, Stack, SvgIcon, Typography, Button, IconButton } from '@mui/material';
import { saveAs } from "file-saver";
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const CompanyCard = (props) => {
  const { meme } = props;
  const saveFile = () => {
    console.log(meme)
    saveAs(
      meme.originalMemeUrl,
      meme.uid + '.jpg'
    );
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          image={meme.uploadedFileUrl}
          alt={meme.uid}
          height={300}
          sx={{
            objectFit: 'contain'
          }}
        />
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {/* {meme.title} */}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          <b>Status:</b> 
          {
            (meme.status === 'pending') && <Chip sx={{ ml: 2 }} label="Pending" color="warning"/> ||
            (meme.status === 'done') && <Chip sx={{ ml: 2 }} label="Done" color="success"/> ||
            (meme.status === 'await_description') && <Chip sx={{ ml: 2 }} label="Waiting description" color="info"/> ||
            (true === true) && <Chip sx={{ ml: 2 }} label={meme.status} color="primary"/>
          }
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          <b>Tags:</b> {meme.tags.join(', ')}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}/>
      <Divider/>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          
          <Button
            variant='outlined'
            onAbort={handleOpen}
            startIcon={
              <SvgIcon>
                <ClockIcon/>
              </SvgIcon>
            }
          >
              View original
          </Button>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          
          <IconButton
          color="success"
          onClick={saveFile}
          >
            <SvgIcon>
              <ArrowDownTrayIcon/>
            </SvgIcon>
          </IconButton>
        </Stack>
      </Stack>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal>
    </Card>
  );
};

CompanyCard.propTypes = {
  // company: PropTypes.object.isRequired
  meme: PropTypes.object.isRequired
};
