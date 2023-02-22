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
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddClassMutation, useAddSubjectMutation, useEditClassDataMutation, useGetTeacherAllQuery } from 'services/userAuthApi';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import axios from 'axios';
import label from 'ui-component/label';
import { getToken } from 'services/LocalStorage';

function AddBook() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------

    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        name: Yup.string().required()
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
    console.log(errors, 'errors');
    const [errorshow, setErrorShow] = useState({
        status: false,
        msg: '',
        type: ''
    });
    let token = getToken();
    const [editclass] = useEditClassDataMutation();
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);

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
    const [teacher, setteacher] = useState('');
    const [options, setOptions] = useState(['']);
    const [getclassdata, setGetclassdata] = useState(['']);

    // console.log(options,'options')
    useEffect(() => {
        const getData = async () => {
            const arr = [];
            await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_PATH}/admin/teacher`,
                headers: {
                    // 'Content-type': 'application/json',
                    authorization: `Bearer ${token}`
                }
                // data: ActualData
            }).then((res) => {
                let result = res.data.result;
                result.map((user) => {
                    return arr.push({ id: user.id, label: user.label });
                });
                setOptions(arr);
            });
        };
        getData();
    }, []);
    // useEffect(() => {
    //   const getclassData = async () => {
    //     const arr = []
    //     await axios({
    //       method: 'get',
    //       url: `${process.env.REACT_APP_API_PATH}/admin/class`,
    //       headers: {
    //         authorization: `Bearer ${token}`
    //       }
    //     }).then(res => {
    //       let result = res.data.result
    //       result.map(user => {
    //         return arr.push({ id: user.id, label: user.name })
    //       })
    //       setGetclassdata(arr)
    //     })
    //   }
    //   getclassData()
    // }, [])

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedclassOption, setSelectedclassOption] = useState('');

    const [addsubject] = useAddSubjectMutation();

    // get teacher
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

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
    // get Class
    const [selectedClassValue, setSelectedClassValue] = useState(null);

    // handle selection
    const handleClassChange = (value) => {
        setSelectedClassValue(value);
    };
    console.log(selectedValue, 'selectedValue');
    // load options using API call
    const loadClassOptions = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_PATH}/admin/class`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(res, 'res');
        const re = res.data.result;
        return re;
    };
    const onSubmit = async (data) => {
        console.log(
            {
                name: data.name,
                teacher_id: selectedValue.id,
                classnamed_id: selectedClassValue.id
            },
            'ddddddddddddd'
        );
        const ActualData = {
            name: data.name,
            teacher_id: selectedValue.id,
            classnamed_id: selectedClassValue.id
        };
        console.log(ActualData, 'ActualData');
        if (ActualData.name && ActualData.classnamed_id && ActualData.teacher_id) {
            const res = await addsubject({ token, ActualData });
            console.log(res, 'res');
            document.getElementById('formid').reset();
            navigate('/dashboard/book');
        } else {
            // setError({ status: true, msg: "Please fill all the fields", type: "error" });
            setErrorShow({
                status: true,
                msg: 'Please fill all the fields',
                type: 'error'
            });
            console.log('errorshow', errorshow);
        }
    };
    return (
        <MainCard title="Add Book" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <Box
                            sx={{
                                width: 500,
                                height: 300,
                                // boxShadow,
                                alignItems: 'center'
                                // backgroundColor: 'darkGray',
                            }}
                        >
                            <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    label="Name"
                                    type="text"
                                    name="name"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('name')}
                                    className={`form-control mt-4 ${errors.name ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>{errors.name && <small className="text-danger">{errors.name.message}</small>}</Box>
                                <br />
                                <label htmlFor="teacher_id">Teacher</label>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    value={selectedValue}
                                    getOptionLabel={(e) => e.label}
                                    getOptionValue={(e) => e.id}
                                    loadOptions={loadOptions}
                                    onChange={handleChange}
                                />
                                <br />
                                <br />
                                <label htmlFor="classnamed">Class</label>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    value={selectedClassValue}
                                    getOptionLabel={(e) => e.name}
                                    getOptionValue={(e) => e.id}
                                    loadOptions={loadClassOptions}
                                    onChange={handleClassChange}
                                />
                                <div className="d-grid mt-5">
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
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </form>
                        </Box>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </MainCard>
    );
}

export default AddBook;
