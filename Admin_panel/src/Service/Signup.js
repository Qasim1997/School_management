import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

export const useSignupAdmin = () =>
    useMutation(
        (data) =>
            axios.post(`${process.env.REACT_APP_API_PATH}/admin/register`, {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
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

export const useSignupUser = () =>
    useMutation(
        (ActualData) =>
            axios.post(`${process.env.REACT_APP_API_PATH}/user/register`, {
                name: ActualData.name,
                user_type: ActualData.user_type,
                email: ActualData.email,
                password: ActualData.password,
                password_confirmation: ActualData.password_confirmation,
                student_id: ActualData.student_id,
                teacher_id: ActualData.teacher_id
            }),
        {
            onSuccess: (ActualData) => {
                console.log(ActualData, 'Login Valid');
            },
            onError: () => {
                console.log('inValid User');
            }
        }
    );
