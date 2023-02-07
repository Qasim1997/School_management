/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Button, Box, Alert } from '@mui/material';
// hooks
// components
// sections
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../ui-component/Logo';
import useResponsive from '../../hooks/useResponsive';
import { useSignupUser } from 'Service/Signup';
// components
// ----------------------------------------------------------------------

function Signup() {
    // alert(useAddSigninData());
    // const {useAddSigninData} = useAddSigninData();

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
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
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
    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
    const [showPassword, setShowPassword] = useState(false);
    // const [error, setErrors] = useState('')
    const [errorshow, setErrorshow] = useState({
        status: false,
        msg: '',
        type: ''
    });
    const { mutateAsync: signup, isError, error } = useSignupUser();
    const handleClick = () => {
        navigate('/app', { replace: true });
    };

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
    const onSubmit = async (data) => {
        await axios
            .post(`${process.env.REACT_APP_API_PATH}/admin/send-reset-password-email`, {
                email: data.email
            })
            .then((response) => {
                console.log(response, 'response');
                setErrorshow({
                    status: true,
                    msg: response.data.message,
                    type: 'success'
                });
                // navigate('/login')

                // history.push("/product/4");
            })
            .catch((error) => {
                console.log(error, 'error');
                setErrorshow({
                    status: true,
                    msg: error.response.data.message,
                    type: 'error'
                });
            });
    };
    console.log(errors, 'errors');
    return (
        <>
            <Helmet>
                <title> Signup | Maniwebify </title>
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
                            Forget Password
                        </Typography>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                OR
                            </Typography>
                        </Divider>

                        <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Label>Email address</Form.Label>

                            <input
                                label="Email Address"
                                type="email"
                                {...register('email')}
                                className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <Box sx={{ mb: 2 }}>{errors.email && <small className="text-danger">{errors.email.message}</small>}</Box>

                            {/* <Button variant='outlined' color='primary' type="submit">Send Email</Button> */}
                            <Button type="submit" variant="contained" style={{ color: 'black' }}>
                                Send Email
                            </Button>
                            {errorshow.status ? (
                                <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                                    {errorshow.msg}
                                </Alert>
                            ) : (
                                ''
                            )}
                        </form>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
export default Signup;
