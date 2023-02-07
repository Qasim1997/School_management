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
import { useAddClassMutation, useAddTeacherMutation, useEditClassDataMutation, useGetTeacherAllQuery } from 'services/userAuthApi';
import Select from 'react-select';
import axios from 'axios';
import label from 'ui-component/label';
import { getToken } from 'services/LocalStorage';

function AddTeacher() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------
    const token = getToken();
    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        label: Yup.string().required()
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        // errors,
        reset,
        trigger,
        control
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
    // login kar k console.log check karo

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

    const [addTeacher] = useAddTeacherMutation();

    const onSubmit = async (data) => {
        console.log(
            {
                name: data.label
                //   numeric: data.numeric,
                //   teacher_id :selectedOption.value
            },
            'ddddddddddddd'
        );
        const ActualData = {
            label: data.label
        };
        // if (ActualData.label) {
        const res = await addTeacher({token, ActualData });
        console.log(res.data.status, 'res');
        if (res.data.status === 'success') {
            console.log('first');
            setErrorShow({ status: true, msg: res.data.message, type: 'success' });
            document.getElementById('formid').reset();
            navigate('/dashboard/teacher');
        } else {
            setErrorShow({ status: true, msg: res.data.message, type: 'error' });
        }
    };
    return (
        <MainCard title="Add Teacher" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
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
                                    name="label"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    {...register('label')}
                                    className={`form-control mt-4 ${errors.label ? 'is-invalid' : ''}`}
                                />
                                <Box sx={{ mb: 2 }}>{errors.name && <small className="text-danger">{errors.label.message}</small>}</Box>
                                <div className="d-grid">
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
                    <div className="col"></div>
                </div>
            </div>
        </MainCard>
    );
}

export default AddTeacher;
