import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, CardMedia, Chip, Divider, Stack, SvgIcon, Typography } from '@mui/material';

export const CompanyCard = (props) => {
  const { company } = props;
  const { meme } = props;
  
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
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon/>
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon/>
          </SvgIcon>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  // company: PropTypes.object.isRequired
  meme: PropTypes.object.isRequired
};
