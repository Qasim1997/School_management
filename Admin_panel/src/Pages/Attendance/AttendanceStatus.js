/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getId, getToken } from 'services/LocalStorage';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { DatePicker, Space } from 'antd';

function AttendanceStatus() {
    let getid = getId();
    let token = getToken();
    // get class name
    const [getclassdata, setGetclassdata] = useState(['']);
    const [studentdata, setstudentdata] = useState('');
    const [selectedclassOption, setSelectedclassOption] = useState('');

    useEffect(() => {
        const getclassData = async () => {
            const arr = [];
            await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/admin/getclass/${getid}`,
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
    // columns
    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        { name: 'Name', selector: (row) => row.student.display_name, sortable: true },
        { name: 'Status', selector: (row) => row.status, sortable: true }
    ];
    // time
    const [time, settime] = useState('');
    const onChange = (date, dateString) => {
        // console.log(dateString, 'dateString');
        // console.log(date, 'date');
        settime(dateString);
    };
    // console.log(selectedclassOption, 'selectedclassOption', time, );
    // get student status
    const getStudentdata = async () => {
        await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/admin/getstudentstatus/${selectedclassOption.label}/${time}`,
            headers: {
                // 'Content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
            // data: ActualData
        }).then((res) => {
            console.log(res, 'result');
            setstudentdata(res.data.result);
        });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col mt-4">
                    <DatePicker style={{ width: '400px' }} onChange={onChange} />
                </div>
                <div className="col">
                    <label htmlFor="classnamed">Class</label>
                    <Select options={getclassdata} name="classnamed" onChange={setSelectedclassOption} />
                </div>
                <div className="col mt-4">
                    <button className="btn btn-primary" onClick={() => getStudentdata()}>
                        Get Class
                    </button>
                </div>
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
                pagination
                fixedHeader
                // fixedHeaderScrollHeight="450px"
                // selectableRows
                // selectableRowsHighlight
                highlightOnHover
            />
        </div>
    );
}
export default AttendanceStatus;
