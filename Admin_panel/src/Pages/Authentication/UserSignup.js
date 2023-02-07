import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Divider, Button, Box, Alert } from '@mui/material';
// hooks
// components
// sections
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// @mui
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../ui-component/Logo';
import useResponsive from '../../hooks/useResponsive';
import { useSignupUser } from 'Service/Signup';
import Select from 'react-select';
import { getToken } from 'services/LocalStorage';
import { useRegisterUserMutation } from 'services/userAuthApi';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
// components
// ----------------------------------------------------------------------

function UserSignup() {
    // alert(useAddSigninData());
    // const {useAddSigninData} = useAddSigninData();

    const token = getToken();
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
        name: Yup.string().required(),
        user_type: Yup.string().required(),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().required('Password is required').min(3, 'Password must be at 3 char long'),
        password_confirmation: Yup.string()
            .required('Confirmed Password is required')
            .oneOf([Yup.ref('password')], 'Confirmed Password does not match')
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
    }, [isSubmitSuccessful]);
    const [showPassword, setShowPassword] = useState(false);
    // const [error, seterror] = useState('')
    const [errorshow, setError] = useState({
        status: false,
        msg: '',
        type: ''
    });
    const { mutateAsync: signup, isError, error } = useSignupUser();
    const handleClick = () => {
        navigate('/app', { replace: true });
    };

    // get teacher
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    // handle selection
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    console.log(selectedValue, 'selectedValue');
    // load options using API call
    const loadOptions = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_PATH}/admin/teacher`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(res, 'res');
        const re = res.data.result;
        return re;
    };
    // get student data
    const [selectedstudentValue, setSelectedstudentValue] = useState('');

    // handle selection
    const handlestudentChange = (value) => {
        setSelectedstudentValue(value);
    };
    console.log(selectedstudentValue, 'selectedValue');
    // load options using API call
    const loadstudentOptions = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_PATH}/admin/student`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(res, 'res');
        const re = res.data.result;
        return re;
    };
    // submit data
    const [registerUser] = useRegisterUserMutation();
    const onSubmit = async (data) => {
        console.log(data, 'data');
        console.log(selectedValue, 'selectedOption');
        console.log(selectedstudentValue, 'selectedOption');
        const ActualData = {
            name: data.name,
            user_type: data.user_type,
            teacher_id: selectedValue.id,
            student_id: selectedstudentValue.id,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        };
        console.log(ActualData, 'ActualData');
        if (ActualData.teacher_id && ActualData.student_id) {
            setError({
                status: true,
                msg: 'Choose Only One Field From Student and Teacher',
                type: 'error'
            });
        } else {
            const res = await registerUser(ActualData);
            console.log(res, 'res');
            if (res.data.status === 'success') {
                console.log('first');
                setError({ status: true, msg: res.data.message, type: 'success' });
                document.getElementById('formid').reset();
                navigate('/dashboard/user');
            } else {
                setSelectedOption('');
                setOptions('');
                setError({ status: true, msg: res.data.message, type: 'error' });
            }
            // await axios;
            // signup(ActualData)
            //     .then((response) => {
            //         console.log(response, 'response');
            //         setError({ status: true, msg: response.data.status, type: 'success' });
            //         document.getElementById('formid').reset();
            //         // window.close();
            //         navigate('/dashboard/user');
            //         // history.push("/product/4");
            //     })
            //     .catch((error) => {
            //         console.log(error, 'fetch error');
            //         // seterror(error.response.data.error)
            //         setError({ status: true, msg: error.response.data.message, type: 'error' });
            //     });
        }
    };

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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h4" gutterBottom>
                                Sign up to Minimal
                            </Typography>

                            <Button className="btn btn-info add_button">
                                {' '}
                                <Link to="/dashboard" className="add_button">
                                    Back
                                </Link>
                            </Button>
                        </div>

                        <Divider sx={{ my: 3 }}></Divider>

                        <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Label>Name</Form.Label>
                            <input
                                label="Name"
                                type="text"
                                {...register('name')}
                                className={`form-control mt-4 ${errors.name ? 'is-invalid' : ''}`}
                            />
                            <Box sx={{ mb: 2 }}>{errors.name && <small className="text-danger">{errors.name.message}</small>}</Box>
                            <Form.Label>Email address</Form.Label>
                            <input
                                label="Email Address"
                                type="email"
                                {...register('email')}
                                className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <Box sx={{ mb: 2 }}>{errors.email && <small className="text-danger">{errors.email.message}</small>}</Box>
                            <Form.Label>User Type</Form.Label>
                            <Form.Select {...register('user_type')}>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </Form.Select>
                            <br />
                            <Form.Label>Teacher</Form.Label>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                value={selectedValue}
                                getOptionLabel={(e) => e.label}
                                getOptionValue={(e) => e.id}
                                loadOptions={loadOptions}
                                onChange={handleChange}
                            />{' '}
                            <br />
                            selectedstudentValue
                            <Form.Label>Student</Form.Label>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                value={selectedstudentValue}
                                getOptionLabel={(e) => e.display_name}
                                getOptionValue={(e) => e.id}
                                loadOptions={loadstudentOptions}
                                onChange={handlestudentChange}
                            />
                            <Form.Label>Password</Form.Label>
                            <input
                                label="Password"
                                spacing={3}
                                type="password"
                                {...register('password')}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <br />
                            <Box sx={{ mb: 2 }}>{errors.password && <small className="text-danger">{errors.password.message}</small>}</Box>
                            <Form.Label>Confirmed Password</Form.Label>
                            <input
                                label="password_confirmation"
                                spacing={3}
                                type="password"
                                {...register('password_confirmation')}
                                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            />
                            <br />
                            {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation.message}</small>}
                            <div className="d-grid">
                                <Button className="btn btn-info add_button" type="submit" variant="contained" style={{ color: 'black' }}>
                                    Signup
                                </Button>
                            </div>
                            {errorshow.status ? (
                                <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                                    {errorshow.msg}
                                </Alert>
                            ) : (
                                ''
                            )}
                            <p className="forgot-password text-right">
                                <a href="/login">Login</a>
                            </p>
                        </form>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
export default UserSignup;
