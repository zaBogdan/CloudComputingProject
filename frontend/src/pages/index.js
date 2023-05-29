import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useEffect, useState } from 'react';
import httpService from '../utils/http-client';
import { API_URL } from '../constants/api';
import { useAuth } from '../hooks/use-auth';

const Page = () => {
  const { user } = useAuth();
  let [memes, setMemes] = useState([]);
  const fileClick = useRef(null);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const { data } = await httpService.get(API_URL + '/image/all', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(data);
      setMemes(data.data.memes);
    } catch (error) {
      console.log('Error fetching memes: ', error);
    }
  };

  const handleFileChange = async (event) => {
    try {
      if (!event.target.files[0]) {
        return;
      }

      const formData = new FormData();
      formData.append('image', event.target.files[0]);

      const response = await httpService.post('/image/upload', formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        }
      });
    
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Reset the file input
      fileClick.current.value = null;
    }
  };

  const handleUploadClick = async () => {
    fileClick.current.click();
  };

  return (
    <>
      <Head>
        <title>
          Memes | MRSE
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Memes
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    A list of all your original memes uploaded
                  </Typography>
                </Stack>
              </Stack>
              <div>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileClick}
                  onChange={handleFileChange}
                />

                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleUploadClick}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <Grid
              container
              spacing={3}
            >
              {memes.map((meme) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={meme.uid}
                >
                  <CompanyCard meme={meme}/>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
