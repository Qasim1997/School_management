/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteclassDataMutation, useGetClassAllQuery } from 'services/userAuthApi';
import { RotatingSquare } from 'react-loader-spinner';
import { getToken } from 'services/LocalStorage';

function IndexClass() {
    const [classes, setclass] = useState([]);
    const [search, setsearch] = useState([]);
    const [filterclass, setfilterclass] = useState([]);
    const token = getToken();
    const { data, isSuccess, isFetching, isLoading } = useGetClassAllQuery({ token });
    const navigate = useNavigate();

    const getclass = async () => {
        try {
            console.log(data, 'ssssssssssss');
            setclass(data.result);
            setfilterclass(data.result);
            console.log(countries, 'countriee');
        } catch (error) {
            console.log(error);
        }
    };
    // useEffect(() => {
    //     const result = classes.filter((classes) => {

    //         // return console.log(classes,'classes')
    //         return classes.name.toLowerCase().match(search.toLowerCase());
    //     });
    //     setfilterclass(result);
    // }, [search]);
    const [deleteclassData] = useDeleteclassDataMutation();

    const deletedata = async (id) => {
        const res = await deleteclassData({ id, token });
        console.log(res, 'res');
    };
    const columns = [
        { name: 'Name', selector: (row) => row.name, sortable: true },
        // { name: "Native Name", selector: (row) => row.nativename },
        { name: 'Numeric', selector: (row) => row.numeric },
        { name: 'Teacher', selector: (row) => row.teacher.label },

        // { name: 'Image', selector: (row) => <img width={50} src={row.flag} alt={row.name} /> },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <Link to={`/dashboard/class/${row.id}`}>
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
            actions={
                <button className="btn btn-info">
                    <Link to="/dashboard/class/create" className="add_button">
                        Add Class
                    </Link>
                </button>
            }
            // subHeader
            // subHeaderComponent={
            //     <input
            //         type="text"
            //         className="w-25form-control"
            //         placeholder="Search Box"
            //         value={search}
            //         onChange={(e) => setsearch(e.target.value)}
            //     />
            // }
        />
    );
}

export default IndexClass;
