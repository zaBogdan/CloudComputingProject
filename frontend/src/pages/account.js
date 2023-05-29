import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import httpService from 'src/utils/http-client';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { useFormik } from 'formik';

const Page = () => {
  const { user } = useAuth();
  useEffect(() => {
    const d  = async () => {
      try {
        const resp = await httpService.get('/account', {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          }
        });
        const { data } = resp.data;
        formik.setValues({
          country: data.account.country,
          nickname: data.account.nickname,
          phoneNumber: data.account.phoneNumber,
          name: data.account.name,
          picture: data.account.picture,
          email: data.account.email,
          uid: data.account.uid,
        })
      } catch (err) {
        console.log("Request has failed",err);
      }
    };
    d();
  }, []);

  const formik = useFormik({
    initialValues: {
      country: '',
      nickname: '',
      phoneNumber: '',
      name: '',
      picture: '',
      email: '',
      uid: ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log(values)
        const resp = await httpService.put('/account', values, {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(resp.data);
      } catch (err) {
        console.log("Request has failed",err);
      }
    },
  });

  return (
    <>
      <Head>
        <title>
          Account | MRSE
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountProfile
                    account={formik.values}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                <form onSubmit={formik.handleSubmit}>
                  <AccountProfileDetails
                  formik={formik} />
                </form>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
