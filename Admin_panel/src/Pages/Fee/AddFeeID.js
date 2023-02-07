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
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
// @mui
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddStudentMutation, useAddSubjectMutation, useEditClassDataMutation, useGetTeacherAllQuery } from 'services/userAuthApi';
import axios from 'axios';
import { getToken } from 'services/LocalStorage';
import { Value } from 'sass';
import { DatePicker, Space } from 'antd';

function AddFeeId() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------
    let { id } = useParams();
    const navigate = useNavigate();
    const [time, settime] = useState('');
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
    const [student, setstudent] = useState('');
    const [options, setOptions] = useState(['']);
    const [getclassdata, setGetclassdata] = useState(['']);

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
    useEffect(() => {
        const getclassData = async () => {
            const arr = [];
            console.log(id, 'id');
            await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/admin/student/${id}`,
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setstudent(res.data.result);
                console.log(student, 'student');
            });
        };
        getclassData();
    }, []);

    const [selectedclassOption, setSelectedclassOption] = useState('');
    // issue_date
    const onChange = (date, dateString) => {
        console.log(dateString, 'dateString');
        console.log(date, 'date');
        settime(dateString);
    };
    const [addStudent] = useAddStudentMutation();
    const token = getToken();
    const onSubmit = async (data) => {
        console.log(
            {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                age: data.age,
                address: data.address,
                contact_number: data.contact_number,
                classnamed_id: selectedclassOption.id,
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
            classnamed_id: selectedclassOption.id,
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
                                <label htmlFor="issue_date" className="form-label">
                                    Date
                                </label>
                                <DatePicker style={{ width: '400px' }} onChange={onChange} />

                                <Box sx={{ mb: 2 }}>
                                    {errors.issue_date && <small className="text-danger">{errors.issue_date.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="first_name" className="form-label">
                                    Month
                                </label>
                                <DatePicker style={{ width: '400px' }} picker="month" onChange={onChange} />

                                <Box sx={{ mb: 2 }}>
                                    {errors.first_name && <small className="text-danger">{errors.first_name.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="first_name" className="form-label">
                                    Student
                                </label>
                                <TextField
                                    type="text"
                                    name="student_name"
                                    value={student.display_name}
                                    disabled
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
                                <label htmlFor="studnet_class" className="form-label">
                                    Class
                                </label>
                                <TextField
                                    type="text"
                                    name="studnet_class"
                                    // value={student.classnamed.numeric}
                                    fullWidth
                                    disabled
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('studnet_class')}
                                    className={`form-control mt-4 ${errors.studnet_class ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.studnet_class && <small className="text-danger">{errors.studnet_class.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="miscellaneous_fee" className="form-label">
                                    Miscellaneous Fee
                                </label>
                                <TextField
                                    type="text"
                                    name="miscellaneous_fee"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('miscellaneous_fee')}
                                    className={`form-control mt-4 ${errors.miscellaneous_fee ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.miscellaneous_fee && <small className="text-danger">{errors.miscellaneous_fee.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="admission_fee" className="form-label">
                                    Admission Fee
                                </label>
                                <TextField
                                    type="text"
                                    name="admission_fee"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('admission_fee')}
                                    className={`form-control mt-4 ${errors.admission_fee ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.admission_fee && <small className="text-danger">{errors.admission_fee.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="montyly_fee" className="form-label">
                                    Monthly Fee
                                </label>
                                <TextField
                                    type="text"
                                    name="montyly_fee"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('montyly_fee')}
                                    className={`form-control mt-4 ${errors.montyly_fee ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>
                                    {errors.montyly_fee && <small className="text-danger">{errors.montyly_fee.message}</small>}
                                </Box>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="total" className="form-label">
                                    total
                                </label>
                                <TextField
                                    label="total"
                                    type="text"
                                    name="total"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('total')}
                                    className={`form-control mt-4 ${errors.total ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>{errors.total && <small className="text-danger">{errors.total.message}</small>}</Box>
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

export default AddFeeId;
