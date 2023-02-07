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
import { useAddStudentMutation, useAddSubjectMutation, useEditClassDataMutation, useGetTeacherAllQuery } from 'services/userAuthApi';
import axios from 'axios';
import { getToken } from 'services/LocalStorage';
import { Value } from 'sass';
import AsyncSelect from 'react-select/async'
function AddStudent() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------

    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        age: Yup.string().required('Age is required'),
        address: Yup.string().required('Address is required'),
        contact_number: Yup.string().required('Contact Number is required'),
        rollnumber: Yup.string().required('rollnumber is required')
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
    // get Class
    const [selectedClassValue, setSelectedClassValue] = useState(null)

    // handle selection
    const handleClassChange = value => {
        setSelectedClassValue(value)
    }
    // load options using API call
    const loadClassOptions = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_API_PATH}/admin/class`,
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        )
        console.log(res, 'res')
        const re = res.data.result
        return re
    }

    const [selectedclassOption, setSelectedclassOption] = useState('');

    const [addStudent] = useAddStudentMutation();
    const token = getToken();
    console.log(errors, 'error.................................');
    const onSubmit = async (data) => {
        console.log(
            {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                age: data.age,
                address: data.address,
                contact_number: data.contact_number,
                classnamed_id: selectedClassValue.id,
                image: images,
                rollnumber: data.rollnumber
            },
            'ddddddddddddd'
        );
        const Actual_data = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            age: data.age,
            address: data.address,
            contact_number: data.contact_number,
            classnamed_id: selectedClassValue.id,
            image: images,
            rollnumber: data.rollnumber
        };
        const formdata = new FormData();
        formdata.append('first_name', data.first_name),
            formdata.append('last_name', data.last_name),
            formdata.append('email', data.email),
            formdata.append('age', data.age),
            formdata.append('address', data.address),
            formdata.append('contact_number', data.contact_number),
            formdata.append('classnamed_id', selectedclassOption.id),
            formdata.append('image', images),
            formdata.append('rollnumber', data.rollnumber);
        if (
            Actual_data.first_name &&
            Actual_data.last_name &&
            Actual_data.email &&
            Actual_data.age &&
            Actual_data.address &&
            Actual_data.contact_number &&
            Actual_data.classnamed_id &&
            Actual_data.image &&
            Actual_data.rollnumber
        ) {
            const res = await addStudent({ token, formdata });
            console.log(res, 'res');
            if (res.data.status === 'success') {
                setErrorShow({ status: true, msg: res.data.message, type: 'success' });
                document.getElementById('formid').reset();
                navigate('/dashboard/student');
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
                                <label htmlFor="first_name" className="form-label">
                                    First Name
                                </label>
                                <TextField
                                    type="text"
                                    name="first_name"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('first_name')}
                                    className={`form-control mt-4 ${errors.first_name ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.first_name && <small className="text-danger">{errors.first_name.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="last_name" className="form-label">
                                    Last Name
                                </label>
                                <TextField
                                    label="last_name"
                                    type="text"
                                    name="last_name"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('last_name')}
                                    className={`form-control mt-4 ${errors.last_name ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.last_name && <small className="text-danger">{errors.last_name.message}</small>}
                                </Box>
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
                                    Class
                                </label>
                                <br />
                                <br />
                                <br />
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    value={selectedClassValue}
                                    getOptionLabel={e => e.name}
                                    getOptionValue={e => e.id}
                                    loadOptions={loadClassOptions}
                                    onChange={handleClassChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
                                <TextField
                                    label="Age"
                                    type="text"
                                    name="age"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('age')}
                                    className={`form-control mt-4 ${errors.age ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>{errors.age && <small className="text-danger">{errors.age.message}</small>}</Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Image" className="form-label">
                                    Image
                                </label>
                                <input type="file" {...register('image')} name="image" onChange={(e) => setimage(e.target.files[0])} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="age" className="form-label">
                                    Roll Number
                                </label>
                                <TextField
                                    label="Roll Number"
                                    type="text"
                                    name="rollnumber"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('rollnumber')}
                                    className={`form-control mt-4 ${errors.rollnumber ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.rollnumber && <small className="text-danger">{errors.rollnumber.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <TextField
                                    label="Address"
                                    type="text"
                                    name="address"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('address')}
                                    className={`form-control mt-4 ${errors.address ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.address && <small className="text-danger">{errors.address.message}</small>}
                                </Box>
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

export default AddStudent;
