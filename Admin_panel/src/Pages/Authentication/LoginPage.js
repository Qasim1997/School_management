/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, InputAdornment, TextField, Box, Alert } from '@mui/material';
// hooks
// components
// sections
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from '../../ui-component/iconify';
import Logo from '../../ui-component/Logo';
import { useLoginUser } from '../../Service/Login';
import useResponsive from '../../hooks/useResponsive';
// components
// ----------------------------------------------------------------------

function LoginPage() {
    const StyledRoot = styled('div')(({ theme }) => ({
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    }));

    const StyledSection = styled('div')(({ theme }) => ({
        width: '100%',
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default
    }));

    const StyledContent = styled('div')(({ theme }) => ({
        maxWidth: 480,
        margin: 'auto',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(12, 0)
    }));

    // ----------------------------------------------------------------------

    const mdUp = useResponsive('up', 'md');

    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        email: Yup.string().email()
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        // errors,
        reset,
        trigger
    } = useForm(formOptions);

    const [errorshow, setError] = useState({
        status: false,
        msg: '',
        type: ''
    });
    const { mutateAsync: login, isError, error } = useLoginUser();
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);
    // login kar k console.log check karo
    const onSubmit = async (data) => {
        login(data)
            .then((response) => {
                console.log(response.data.data, 'response');
                sessionStorage.setItem('Token', response.data.access_token);
                sessionStorage.setItem('user_type', response.data.data.user_type);
                sessionStorage.setItem('teacher_id', response.data.data.teacher_id);
                sessionStorage.setItem('user_name', response.data.data.name);
                setError({ status: true, msg: response.data.exce, type: 'success' });
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error, ' error.response.data.result');
                setError({ status: true, msg: error.response.data.result, type: 'error' });
            });
    };
    const [googleurl, setgoogleurl] = useState('');
    const googlelogin = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/auth/google',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (res) {
            console.log(res, 'ssssssssss');
            // navigate(res.data.url);
            window.location = res.data.url;
        });
    };
    useEffect(() => {
        fetch(`${window.location}`, { headers: new Headers({ accept: 'application/json' }) })
            .then((response) => {
                console.log(response, 'response');
            })
            .then((data) => {
                console.log(data, 'data');
            });
    }, []);
    return (
        <>
            <Helmet>
                <title> Login | Maniwebify </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 }
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Minimal
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={googlelogin}>
                                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                            </Button>

                            <Button fullWidth size="large" color="inherit" variant="outlined">
                                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
                            </Button>

                            <Button fullWidth size="large" color="inherit" variant="outlined">
                                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
                            </Button>
                        </Stack>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                OR
                            </Typography>
                        </Divider>

                        <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="Email Address"
                                type="email"
                                fullWidth
                                margin="dense"
                                sx={{ mb: 2 }}
                                {...register('email')}
                                className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <Box sx={{ mb: 2 }}>{errors.email && <small className="text-success">{errors.email.message}</small>}</Box>

                            {/* {errors.password && (
                  <small className="text-danger">{errors.password.message}</small>
                )} */}

                            <TextField
                                label="Password"
                                fullWidth
                                spacing={3}
                                type="password"
                                {...register('password')}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <br />

                            <div className="d-grid">
                                <Button type="submit" variant="contained" style={{ color: 'black' }}>
                                    Signin
                                </Button>
                            </div>
                            {errorshow.status ? (
                                <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                                    {errorshow.msg}
                                </Alert>
                            ) : (
                                ''
                            )}
                            <div className="d-flex justify-content-between">
                                <p className="forgot-password text-right">
                                    Forgot <a href="/forget_password">password?</a>
                                </p>
                                <p className="forgot-password text-right">
                                    Don't have an acount? <a href="/register">Register</a>
                                </p>
                            </div>
                        </form>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
export default LoginPage;
