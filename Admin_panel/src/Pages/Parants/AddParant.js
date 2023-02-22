import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import 'react-tabs/style/react-tabs.css';
// material-ui
import { Box, Card } from '@mui/material';
// project imports

import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// @mui
import { Button, TextField, Alert } from '@mui/material';
// hooks
// components
// sections
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// @mui
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    useAddParantMutation,
    useAddStudentMutation,
    useAddSubjectMutation,
    useEditClassDataMutation,
    useGetTeacherAllQuery
} from 'services/userAuthApi';
import axios, { Axios } from 'axios';
import { getToken } from 'services/LocalStorage';
import { Value } from 'sass';
import AsyncSelect from 'react-select/async';

function AddParant() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------

    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        contact_number: Yup.string().required('Contact Number is required')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        // errors,
        reset
    } = useForm(formOptions);
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);

    const [errorshow, setErrorShow] = useState({
        status: false,
        msg: '',
        type: ''
    });

    const [editclass] = useEditClassDataMutation();
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);
    const [images, setimage] = useState('');
    console.log(images, 'sssssssssssssssssss');
    const ShadowBox = ({ shadow }) => (
        <Card sx={{ mb: 3, boxShadow: shadow }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor: 'primary.light',
                    color: 'grey.800'
                }}
            >
                <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
            </Box>
        </Card>
    );
    ShadowBox.propTypes = {
        shadow: PropTypes.string.isRequired
    };
    const { data } = useGetTeacherAllQuery();
    const [teacher, setteacher] = useState('');
    const [options, setOptions] = useState(['']);
    const [getclassdata, setGetclassdata] = useState(['']);

    // console.log(options,'options')
    useEffect(() => {
        const getData = async () => {
            const arr = [];
            await axios.get(`${process.env.REACT_APP_API_PATH}/admin/teacher`).then((res) => {
                let result = res.data.result;
                result.map((user) => {
                    return arr.push({ id: user.id, label: user.label });
                });
                setOptions(arr);
            });
        };
        getData();
    }, []);
    const token = getToken();
    // get Student
    const [selectedStudentValue, setselectedStudentValue] = useState(null);

    // handle selection
    const handleClassChange = (value) => {
        setselectedStudentValue(value);
    };
    // load options using API call
    const loadClassOptions = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_PATH}/admin/student`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(res, 'res');
        const re = res.data.result;
        return re;
    };

    const [selectedclassOption, setSelectedclassOption] = useState('');

    const [addParant] = useAddParantMutation();
    console.log(errors, 'error.................................');
    const onSubmit = async (data) => {
        console.log(
            {
                name: data.name,
                email: data.email,
                contact_number: data.contact_number,
                student_id: selectedStudentValue.id
            },
            'ddddddddddddd'
        );
        const Actual_data = {
            name: data.name,
            email: data.email,
            contact_number: data.contact_number,
            student_id: selectedStudentValue.id
        };
        if (Actual_data.name && Actual_data.email && Actual_data.contact_number && Actual_data.student_id) {
            const res = await addParant({ token, Actual_data });
            console.log(res, 'res');
            if (res.data.status === 'success') {
                setErrorShow({ status: true, msg: res.data.message, type: 'success' });
                document.getElementById('formid').reset();
                navigate('/dashboard/parant');
            } else {
                // setError({ status: true, msg: "Please fill all the fields", type: "error" });
                setErrorShow({ status: true, msg: 'Please fill all the fields', type: 'error' });
                console.log('errorshow', errorshow);
                // console.log('test', test);
                // document.getElementById("formid").reset();
                // navigate('/login');
            }
        }
    };

    return (
        <MainCard title="Add Student" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
            <div className="container">
                <div className="row">
                    <Box
                        sx={{
                            width: 500,
                            height: 300,
                            // boxShadow,
                            alignItems: 'center'
                            // backgroundColor: 'darkGray',
                        }}
                    >
                        <form className="row g-3" spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <TextField
                                    type="text"
                                    name="name"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('name')}
                                    className={`form-control mt-4 ${errors.name ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>{errors.name && <small className="text-danger">{errors.name.message}</small>}</Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('email')}
                                    className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>{errors.email && <small className="text-danger">{errors.email.message}</small>}</Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="contact_number" className="form-label">
                                    Contact number
                                </label>
                                <TextField
                                    label="contact_number"
                                    type="text"
                                    name="contact_number"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('contact_number')}
                                    className={`form-control mt-4 ${errors.contact_number ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.contact_number && <small className="text-danger">{errors.contact_number.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="contact_number" className="form-label">
                                    Student
                                </label>
                                <br />
                                <br />
                                <br />
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    value={selectedStudentValue}
                                    getOptionLabel={(e) => e.display_name}
                                    getOptionValue={(e) => e.id}
                                    loadOptions={loadClassOptions}
                                    onChange={handleClassChange}
                                />{' '}
                            </div>
                            <div className="col-12">
                                <Button type="submit" variant="contained" style={{ color: 'black' }}>
                                    Save
                                </Button>
                            </div>
                            {errorshow.status ? (
                                <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                                    {errorshow.msg}
                                </Alert>
                            ) : (
                                ''
                            )}
                        </form>
                    </Box>
                </div>
            </div>
        </MainCard>
    );
}

export default AddParant;
