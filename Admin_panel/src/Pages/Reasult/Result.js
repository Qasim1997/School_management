import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Select from 'react-select';
import { getId, getToken } from 'services/LocalStorage';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
// import Stack from '@mui/material/Stack';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePicker, Space } from 'antd';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';

function Result() {
    let getid = getId();
    let token = getToken();
    // const [value, setValue] = useState(dayjs('2023-01-05'));
    const [time, settime] = useState('');
    const [getclassdata, setGetclassdata] = useState(['']);
    const [studentdata, setstudentdata] = useState('');
    const [selectedclassOption, setSelectedclassOption] = useState('');
    const [writeable, setwriteable] = useState(false);
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
    console.log(selectedclassOption, 'selectedclassOption');
    const getStudentdata = async () => {
        const arr = [];
        const dataid = selectedclassOption.id;
        await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/admin/getstudent/${dataid}`,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res, 'class response');
            setstudentdata(res.data.result);
        });
    };
    const options = [
        { value: 1, label: 'present' },
        { value: 2, label: 'absent' }
    ];
    const [attendancestatus, setattendancestatus] = useState('');
    const [finalattendance, setfinalattendance] = useState('');
    const getattendancestatus = async (e, id) => {
        const ActualData = {
            status: e.label,
            student_id: id,
            teacher_id: getid,
            class: selectedclassOption.label
        };
        if (ActualData.status && ActualData.student_id && ActualData.teacher_id && ActualData.date) {
            await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/api/admin/addattendance/${getid}/${id}/${time}`,
                headers: {
                    // 'Content-type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                data: ActualData
            }).then((response) => {
                setErrorShow({ status: true, msg: 'Attendance Add Successfully', type: 'success' });
            });
        } else {
            setErrorShow({ status: true, msg: 'Please fill all the fields', type: 'error' });
        }
    };
    const [errorshow, setErrorShow] = useState({
        status: false,
        msg: '',
        type: ''
    });
    console.log(finalattendance, 'attendancestatus');
    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        { name: 'Name', selector: (row) => row.display_name, sortable: true },
        // { name: 'Class', selector: (row) => row, sortable: true },
        // { name: 'Age', selector: (row) => row.age, sortable: true },
        // { name: 'Class', selector: (row) => row.classnamed.name, sortable: true },
        // { name: 'Email', selector: (row) => row.email, sortable: true },
        // { name: 'Contact Number', selector: (row) => row.contact_number, sortable: true }
        // { name: 'Father Name', selector: (row) => row., sortable: true },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <button className="btn btn-info">
                        <Link to={`/dashboard/result/detail/${row.id}`} className="add_button">
                            Result Preview
                        </Link>
                    </button>
                </>
            )
        }
    ];
    return (
        <div className="container">
            <div className="row">
                <div className="col mt-4">
                    <label htmlFor="classnamed">Class</label>
                    <Select options={getclassdata || ''} isDisabled={writeable} name="classnamed" onChange={setSelectedclassOption || ''} />
                </div>
                <div className="col"></div>
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <DataTable
                columns={columns}
                data={studentdata}
                // fixedHeader
                // fixedHeaderScrollHeight="450px"
                // selectableRows
                // selectableRowsHighlight
                // highlightOnHover
            />
        </div>
    );
}

export default Result;
