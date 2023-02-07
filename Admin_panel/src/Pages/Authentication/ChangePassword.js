/* eslint-disable no-unused-vars */
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Helmet } from 'react-helmet-async';
import { getToken } from 'services/LocalStorage';
// @mui
import { styled } from '@mui/material/styles';
import {
    Link,
    Container,
    Typography,
    Divider,
    Stack,
    Button,
    IconButton,
    InputAdornment,
    input,
    Checkbox,
    Box,
    Alert
} from '@mui/material';
// hooks
// components
// sections
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useQuery, useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from '../../ui-component/iconify';
import Logo from '../../ui-component/Logo';
import useResponsive from '../../hooks/useResponsive';
import { useSignupUser } from 'Service/Signup';
import { useChangePasswordMutation } from 'services/userAuthApi';
function ChangePassword() {
    // form hook
    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        password: Yup.string().required('Password is required').min(3, 'Password must be at 3 char long'),
        password_confirmation: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref('password')], 'Passwords does not match')
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
    const token = getToken();

    const [showPassword, setShowPassword] = useState(false);
    // const [error, seterror] = useState('')
    const [errorshow, setErrorShow] = useState({
        status: false,
        msg: '',
        type: ''
    });
    const handleClick = () => {
        navigate('/app', { replace: true });
    };
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);
    const [ChangePassword] = useChangePasswordMutation();
    // submit form
    const onSubmit = async (data) => {
        console.log(data, 'data');
        const res = await ChangePassword({ token, data });
        console.log(res, 'response');
        setErrorShow({ status: true, msg: res.data.message, type: 'success' });
    };
    return (
        <div>
            <Helmet>
                <title>Chnage Password</title>
            </Helmet>
            <MainCard title="Change Password" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                                <Form.Label>Password</Form.Label>

                                <input
                                    label="Password"
                                    spacing={3}
                                    type="password"
                                    {...register('password')}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                <br />

                                <Box sx={{ mb: 2 }}>
                                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                                </Box>
                                <Form.Label>Confirmed Password</Form.Label>
                                <input
                                    label="password_confirmation"
                                    spacing={3}
                                    type="password"
                                    {...register('password_confirmation')}
                                    className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                />
                                <br />
                                {errors.password_confirmation && (
                                    <small className="text-danger">{errors.password_confirmation.message}</small>
                                )}
                                <br />
                                {/* <Button variant='outlined' color='primary' type="submit">Send Email</Button> */}
                                <Button type="submit" variant="primary" className="btn btn-info" style={{ color: 'black' }}>
                                    Save
                                </Button>
                            </form>
                            {errorshow.status ? (
                                <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                                    {errorshow.msg}
                                </Alert>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default ChangePassword;
