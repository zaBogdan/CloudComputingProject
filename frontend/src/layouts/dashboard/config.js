import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { SvgIcon } from '@mui/material';
import PhotoIcon from '@heroicons/react/24/solid/PhotoIcon';

export const items = [
  {
    title: 'Memes',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <PhotoIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
];
