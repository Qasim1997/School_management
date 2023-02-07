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
import { useEditClassDataMutation } from 'services/userAuthApi';

function UpdateClass() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------

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
    const { id } = useParams();
    const [student, setStudent] = useState({
        name: '',
        numeric: ''
    });
    // get data  from id
    useEffect(() => {
        async function getStudent() {
            try {
                const student = await axios.get(`http://127.0.0.1:8000/api/admin/class/${id}`);
                console.log(student.data.result.teacher, 'data');
                setStudent(student.data.result);
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
    const [options, setOptions] = useState(['']);
    // console.log(options,'options')
    useEffect(() => {
        const getData = async () => {
            const arr = [student.teacher];
            await axios.get(`${process.env.REACT_APP_API_PATH}/admin/teacher`).then((res) => {
                let result = res.data.result;
                result.map((user) => {
                    return arr.push({ id: user.id, label: user.label });
                });
                setOptions(arr);
            });
        };
        getData();
    }, [student]);
    console.log(options, 'options.............................');

    const onSubmit = async () => {
        console.log(
            {
                name: student.name,
                numeric: student.numeric,
                teacher_id: selectedOption.id
            },
            'ddddddddddddd'
        );
        const ActualData = {
            name: student.name,
            numeric: student.numeric,
            teacher_id: selectedOption.id
        };
        if (ActualData.name && ActualData.numeric && ActualData.teacher_id) {
            const res = await editclass({ id, ActualData });
            console.log(res, 'res');
            // if (res.data.status ==='success') {
            //   setError({ status: true, msg: res.data.message, type: "success" });
            //   document.getElementById("formid").reset();
            navigate('/dashboard/class');
            // }
            // if(res.data.status ==='failed'){
            //   setError({ status: true, msg: res.data.message, type: "error" });
            //   document.getElementById("formid").reset();
            // }
        } else {
            // setError({ status: true, msg: "Please fill all the fields", type: "error" });
            setErrorShow({ status: true, msg: 'Please fill all the fields', type: 'error' });
            console.log('errorshow', errorshow);
            console.log('test', test);
            // document.getElementById("formid").reset();
            // navigate('/login');
        }
    };
    return (
        <MainCard title="Update Class" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
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
                                    className="form-control"
                                    value={student.name}
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                                <TextField
                                    label="Numeric"
                                    type="text"
                                    name="numeric"
                                    fullWidth
                                    margin="dense"
                                    sx={{ mb: 2 }}
                                    className="form-control"
                                    value={student.numeric}
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                                <br />
                                <Select
                                    options={options}
                                    name="teacher_id"
                                    onChange={setSelectedOption}
                                    // {...register("teacher_id", {
                                    //     onChange: {setSelectedOption},
                                    //   })}
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

export default UpdateClass;
