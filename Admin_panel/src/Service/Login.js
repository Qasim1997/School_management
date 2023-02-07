import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

export const useLoginAdmin = () =>
    useMutation(
        (data) =>
            axios.post(`${process.env.REACT_APP_API_PATH}/admin/login`, {
                email: data.email,
                password: data.password
            }),
        {
            onSuccess: (data) => {
                console.log('Login Valid');
            },
            onError: () => {
                console.log('inValid User');
            }
        }
    );

export const useLoginUser = () =>
    useMutation(
        (data) =>
            axios.post(`${process.env.REACT_APP_API_PATH}/admin/login`, {
                email: data.email,
                password: data.password
            }),
        {
            onSuccess: (data) => {
                console.log('Login Valid');
            },
            onError: () => {
                console.log('inValid User');
            }
        }
    );
