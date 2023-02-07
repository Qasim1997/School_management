/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    useDeleteStudentDataMutation,
    useDeleteSubjectDataMutation,
    useGetStudentAllQuery,
    useGetSubjectAllQuery,
    useGetTeacherAllQuery
} from 'services/userAuthApi';
import { Avatar, Typography } from '@mui/material';
import { getToken } from 'services/LocalStorage';
import AnimateButton from 'ui-component/extended/AnimateButton';

function Student() {
    const [teachers, setteacher] = useState([]);
    const [search, setsearch] = useState([]);
    const [filterteacher, setfilterteacher] = useState([]);
    let token = getToken();
    const { data, isLoading } = useGetStudentAllQuery({ token });
    useEffect(() => {
        getclass();
    }, [data]);

    const getclass = async () => {
        setteacher(data.result);
        setfilterteacher(data.result);
    };
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const result = teachers.filter((teachers) => {
            // return console.log(teachers,'teachers')
            return teachers.name.toLowerCase().match(search.toLowerCase());
        });
        setfilterteacher(result);
    }, [search]);
    const [deleteStudentData] = useDeleteStudentDataMutation();

    const deletedata = async () => {
        MySwal.fire({
            title: '<strong>HTML <u>example</u></strong>',
            icon: 'info',
            html: 'You can use <b>bold text</b>, ' + '<a href="//sweetalert2.github.io">links</a> ' + 'and other HTML tags',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i className="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i className="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down'
        });
        console.log(res, 'res');
    };

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        {
            name: 'Image',
            selector: (row) => (
                <Avatar
                    src={`http://127.0.0.1:8000/admin_assets/uploads/blogs/${row.image}`}
                    alt={row.first_name}
                    sx={{ width: 56, height: 56 }}
                />
            )
        },
        { name: 'Name', selector: (row) => row.display_name, sortable: true },
        { name: 'Class', selector: (row) => row.classnamed.numeric, sortable: true },
        // { name: 'Age', selector: (row) => row.age, sortable: true },
        // { name: 'Class', selector: (row) => row.classnamed.name, sortable: true },
        // { name: 'Email', selector: (row) => row.email, sortable: true },
        // { name: 'Contact Number', selector: (row) => row.contact_number, sortable: true }
        // { name: 'Father Name', selector: (row) => row., sortable: true },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <Link to={`/dashboard/student/${row.id}`}>
                        <button className="btn btn-primary ml-2 mr-2" style={{ marginRight: '10px' }}>
                            Edit
                        </button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => deletedata(row.id)}>
                        Delete
                    </button>
                </>
            )
        },
        {
            name: 'Preview',
            cell: (row) => (
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Preview
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title mt-5" id="exampleModalLabel">
                                        {row.first_name} detail
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <Typography>First Name</Typography>
                                                <Typography>Last Name</Typography>
                                                <Typography>Class</Typography>
                                                <Typography>Email</Typography>
                                                <Typography>Age</Typography>
                                                <Typography>Contact Number</Typography>
                                                <Typography>Address</Typography>
                                            </div>
                                            <div className="col"></div>
                                            <div className="col">
                                                <Typography>{row.first_name}</Typography>
                                                <Typography>{row.last_name}</Typography>
                                                <Typography>{row.classnamed.numeric}</Typography>
                                                <Typography>{row.email}</Typography>
                                                <Typography>{row.age}</Typography>
                                                <Typography>{row.contact_number} Number</Typography>
                                                <Typography>{row.address}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    ];
    console.log(filterteacher, 'filterteacher');
    if (isLoading) {
        return (
            <RotatingSquare
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
            />
        );
    }
    return (
        <DataTable
            columns={columns}
            data={data.result}
            pagination
            fixedHeader
            // fixedHeaderScrollHeight="450px"
            // selectableRows
            // selectableRowsHighlight
            highlightOnHover
            actions={
                <AnimateButton>
                    <button className="btn btn-info">
                        <Link to="/dashboard/student/create" className="add_button">
                            Add Student
                        </Link>
                    </button>
                </AnimateButton>
            }
        />
    );
}

export default Student;
