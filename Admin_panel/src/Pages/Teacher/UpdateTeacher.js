import PropTypes from 'prop-types';
// import 'react-tabs/style/react-tabs.css';
// material-ui
import { Box, Card } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// @mui
import { Button, TextField, Alert } from '@mui/material';
import axios from 'axios';
// hooks
// components
// sections
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginUser } from '../../Service/Login';
import { Radio } from 'react-loader-spinner';
import { useEditClassDataMutation, useEditTeacherDataMutation } from 'services/userAuthApi';
import { getToken } from 'services/LocalStorage';

function UpdateTeacher() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------
    const token = getToken();
    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        // email: Yup.string().email()
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

    const [editTeacherData] = useEditTeacherDataMutation();
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
    const { id } = useParams();
    const [student, setStudent] = useState({
        name: '',
        numeric: ''
    });
    // get data  from id
    useEffect(() => {
        async function getStudent() {
            try {
                // const student = await axios.get(`http://127.0.0.1:8000/api/admin/teacher/${id}`);
                // console.log(student.data, 'teacher data');
                // setStudent(student.data.result);
                await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_PATH}/admin/teacher/${id}`,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    let result = res.data.result;
                    console.log(result, 'teacher data');
                    setStudent(result);
                });
            } catch (error) {
                console.log('Something is Wrong');
            }
        }
        getStudent();
    }, [id]);
    const [selectedOption, setSelectedOption] = useState('');
    console.log(selectedOption, 'selectedOption');

    function onTextFieldChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }
    const onSubmit = async () => {
        console.log(student, 'student');
        const ActualData = {
            label: student.label
        };
        if (ActualData.label) {
            const res = await editTeacherData({ id, ActualData, token });
            console.log(res, 'res');
            // if (res.data.status ==='success') {
            setError({ status: true, msg: res.data.message, type: 'success' });
            document.getElementById('formid').reset();
            navigate('/dashboard/teacher');
            // }
            // if(res.data.status ==='failed'){
            //   setError({ status: true, msg: res.data.message, type: "error" });
            //   document.getElementById("formid").reset();
            // }
        } else {
            // setError({ status: true, msg: "Please fill all the fields", type: "error" });
            setError({ status: true, msg: 'Please fill all the fields', type: 'error' });
            console.log('errorshow', errorshow);
            // document.getElementById("formid").reset();
            // navigate('/login');
        }
    };
    return (
        <MainCard title="Update Teacher" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
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
                                    label="Label"
                                    type="text"
                                    name="label"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    className="form-control"
                                    value={student.label}
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                                <div className="d-grid">
                                    <Button type="submit" variant="contained" style={{ color: 'black' }}>
                                        Update
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

export default UpdateTeacher;
