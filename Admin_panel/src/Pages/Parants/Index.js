/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDeleteStudentDataMutation, useGetParantAllQuery } from 'services/userAuthApi';
import { getToken } from 'services/LocalStorage';

function Index() {
    let token = getToken();
    const { data, isSuccess, isFetching, isLoading } = useGetParantAllQuery({ token });
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);
    const [deleteStudentData] = useDeleteStudentDataMutation();

    const deletedata = async (id) => {
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

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        { name: 'Name', selector: (row) => row.name, sortable: true },
        { name: 'Student Name', selector: (row) => row.student.display_name, sortable: true },
        // { name: 'Age', selector: (row) => row.age, sortable: true },
        // { name: 'Class', selector: (row) => row.classnamed.name, sortable: true },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Contact Number', selector: (row) => row.contact_number, sortable: true },
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
        }
    ];
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
                <button className="btn btn-info">
                    <Link to="/dashboard/parant/create" className="add_button">
                        Add Parant
                    </Link>
                </button>
            }
        />
    );
}

export default Index;
