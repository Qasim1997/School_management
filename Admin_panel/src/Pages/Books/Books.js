/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from 'services/LocalStorage';
import { useDeleteSubjectDataMutation, useGetSubjectAllQuery, useGetTeacherAllQuery } from 'services/userAuthApi';

function Books() {
    const [teachers, setteacher] = useState([]);
    const [search, setsearch] = useState([]);
    const [filterteacher, setfilterteacher] = useState([]);
    const token = getToken();
    const { data, isSuccess, isFetching, isLoading } = useGetSubjectAllQuery({ token });
    useEffect(() => {
        getclass();
    }, [data]);
    console.log(useGetTeacherAllQuery(), 'useGetSubjectAllQuery');
    const navigate = useNavigate();

    const getclass = async () => {
        setteacher(data.result);
        setfilterteacher(data.result);
    };

    useEffect(() => {
        const result = teachers.filter((teachers) => {
            // return console.log(teachers,'teachers')
            return teachers.name.toLowerCase().match(search.toLowerCase());
        });
        setfilterteacher(result);
    }, [search]);
    const [deletesubjectData] = useDeleteSubjectDataMutation();

    const deletedata = async (id) => {
        const res = await deletesubjectData({ token, id });
        console.log(res, 'res');
    };
    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        { name: 'Name', selector: (row) => row.name, sortable: true },
        { name: 'Teacher Name', selector: (row) => row.teacher.label, sortable: true },
        { name: 'Class', selector: (row) => row.classnamed.name, sortable: true },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <Link to={`/dashboard/book/${row.id}`}>
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
        <DataTable
            columns={columns}
            data={data.result}
            pagination
            fixedHeader
            // fixedHeaderScrollHeight="450px"
            // selectableRows
            actions={
                <button className="btn btn-info">
                    <Link to="/dashboard/book/create" className="add_button">
                        Add Subject
                    </Link>
                </button>
            }
            // subHeader
            // subHeaderComponent={
            //     <input type="text" className="w-25form-control" placeholder="Search Box" value={search} onChange={(e) => setsearch(e.target.value)}/>
            // }
        />
    );
}

export default Books;
