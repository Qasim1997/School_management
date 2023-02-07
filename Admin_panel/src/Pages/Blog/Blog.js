import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useGetClassAllQuery } from '../../services/userAuthApi';

function DataTableComponent() {
    const [countries, setcountries] = useState([]);
    const [search, setsearch] = useState([]);
    const [filteredCountries, setfilteredCountries] = useState([]);
    const getcountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v2/all');
            setcountries(response.data);
            setfilteredCountries(response.data);
            console.log(countries, 'countriee');
        } catch (error) {
            console.log(error);
        }
    };
    console.log(useGetClassAllQuery(), 'useGetClassAllQuery();');

    useEffect(() => {
        getcountries();
    }, []);
    useEffect(() => {
        const result = countries.filter((countries) => {
            return countries.name.toLowerCase().match(search.toLowerCase());
        });
        setfilteredCountries(result);
    }, [search]);

    const columns = [
        { name: 'Country Name', selector: (row) => row.name, sortable: true },
        // { name: "Native Name", selector: (row) => row.nativename },
        { name: 'Capital', selector: (row) => row.capital },
        { name: 'Image', selector: (row) => <img width={50} src={row.flag} alt={row.name} /> },
        {
            name: 'Action',
            cell: (row) => (
                <button className="btn btn-primary" onClick={() => alert(row.name)}>
                    Edit
                </button>
            )
        }
    ];
    return (
        <DataTable
            columns={columns}
            data={filteredCountries}
            pagination
            // fixedHeader
            // fixedHeaderScrollHeight="450px"
            //   selectableRows
            actions={
                <button className="btn btn-info">
                    <Link to="/dashboard/blog/create" className="add_button">
                        Add Blogs
                    </Link>
                </button>
            }
            subHeader
            subHeaderComponent={
                <input
                    type="text"
                    className="w-25form-control"
                    placeholder="Search Box"
                    value={search}
                    onChange={() => setsearch(e.target.value)}
                />
            }
        />
    );
}

export default DataTableComponent;
