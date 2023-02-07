import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Helmet } from 'react-helmet-async';
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from 'services/LocalStorage';
import { useDeleteclassDataMutation, useDeleteteacherDataMutation, useGetClassAllQuery, useGetTeacherAllQuery } from 'services/userAuthApi';
function Teacher() {
    const [teachers, setteacher] = useState([]);
    const [search, setsearch] = useState([]);
    const [filterteacher, setfilterteacher] = useState([]);
    const token = getToken();
    const { data, isSuccess, isFetching, isLoading } = useGetTeacherAllQuery({ token });
    console.log(useGetTeacherAllQuery(), 'useGetTeacherAllQuery');
    const navigate = useNavigate();
    const [deleteteacherData] = useDeleteteacherDataMutation();

    const deletedata = async (id) => {
        const res = await deleteteacherData({ token, id });
        console.log(res, 'res');
    };
    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        { name: 'Name', selector: (row) => row.label, sortable: true },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <Link to={`/dashboard/teacher/${row.id}`}>
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
        <>
            <Helmet>
                <title>Teacher</title>
            </Helmet>
            <DataTable
                columns={columns}
                data={data.result}
                pagination
                fixedHeader
                // fixedHeaderScrollHeight="450px"
                // selectableRows
                actions={
                    <button className="btn btn-info">
                        <Link to="/dashboard/teacher/create" className="add_button">
                            Add Teacher
                        </Link>
                    </button>
                }
                // subHeader
                // subHeaderComponent={
                //     <input type="text" className="w-25form-control" placeholder="Search Box" value={search} onChange={(e) => setsearch(e.target.value)}/>
                // }
            />
        </>
    );
}

export default Teacher;
