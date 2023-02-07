/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import 'react-tabs/style/react-tabs.css';
// material-ui
import { Box } from '@mui/material';
// project imports

import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// @mui
import { Button, Alert } from '@mui/material';
// hooks
// components
// sections
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// @mui
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEditClassDataMutation } from 'services/userAuthApi';
import axios from 'axios';
import { DatePicker } from 'antd';
import { getToken } from 'services/LocalStorage';
import DataTable from 'react-data-table-component';

function Fee() {
    // ===============================|| SHADOW BOX ||=============================== //

    // ----------------------------------------------------------------------
    const token = getToken();
    // usestate
    const [getclassdata, setGetclassdata] = useState(['']);
    const [selectedclassOption, setSelectedclassOption] = useState('');
    const [time, settime] = useState('');
    const [studentdata, setstudentdata] = useState('');

    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('last Name is required')
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
    // Date function onchange
    const onChange = (date, dateString) => {
        console.log(dateString, 'dateString');
        console.log(date, 'date');
        settime(dateString);
        // setwriteable(false);
    };
    // get class
    useEffect(() => {
        const getclassData = async () => {
            const arr = [];
            await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/admin/class`,
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res, 'class response');
                let result = res.data.result;
                result.map((user) => {
                    return arr.push({ id: user.id, label: user.numeric });
                });
                setGetclassdata(arr);
            });
        };
        getclassData();
    }, []);
    // get student from class
    const getStudentdata = async () => {
        const arr = [];
        const dataid = selectedclassOption.id;
        await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/admin/getfeefromdate/${dataid}/${time}`,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res, 'class response');
            setstudentdata(res.data.result);
            // setwriteable(true);
            // let result = res.data.result;
            // result.map((user) => {
            //     return arr.push({ id: user.id, label: user.numeric });
            // });
            // setGetclassdata(arr);
        });
    };
    // columns
    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        { name: 'Name', selector: (row) => row.student.display_name, sortable: true, innerWidth: '80px' },
        { name: 'Class', selector: (row) => row.classnamed.numeric, sortable: true },
        { name: 'Challan Id', selector: (row) => row.challan_id, sortable: true },
        { name: 'Admission Fee', selector: (row) => row.admission_fee, sortable: true },
        { name: 'Miscellaneous Fee', selector: (row) => row.miscellaneous_fee, sortable: true },
        { name: 'monthly_fee', selector: (row) => row.monthly_fee, sortable: true },
        { name: 'Total', selector: (row) => row.total, sortable: true },
        { name: 'Status', selector: (row) => row.status, sortable: true }
        // {
        //     name: 'Action',
        //     cell: (row) => (
        //         <>
        //             <Select options={options} onChange={(e) => getattendancestatus(e, row.id)} />
        //         </>
        //     )
        // }
    ];
    // submit form
    const onSubmit = () => {};
    return (
        <MainCard title="Fee" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
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
                            <div className="row">
                                <div className="col mt-4">
                                    <label htmlFor="first_name" className="form-label">
                                        Month
                                    </label>
                                    <DatePicker picker="month" bordered={false} style={{ width: '400px' }} onChange={onChange} />
                                </div>
                                <div className="col">
                                    <label htmlFor="last_name" className="form-label">
                                        Class
                                    </label>
                                    <Select options={getclassdata || ''} name="classnamed" onChange={setSelectedclassOption || ''} />
                                </div>
                                <div className="col mt-4">
                                    <button className="btn btn-primary" onClick={() => getStudentdata()}>
                                        Get Class
                                    </button>
                                </div>
                                {errorshow.status ? (
                                    <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                                        {errorshow.msg}
                                    </Alert>
                                ) : (
                                    ''
                                )}
                            </div>
                        </form>
                    </Box>
                </div>
                <DataTable columns={columns} data={studentdata} />
            </div>
        </MainCard>
    );
}

export default Fee;
