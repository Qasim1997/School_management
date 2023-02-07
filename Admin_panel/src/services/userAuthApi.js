import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    tagTypes: ['class', 'teacher', 'book', 'subject', 'student', 'parant', 'users'],
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_PATH}/admin` }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (ActualData) => {
                console.log('ActualData', ActualData);
                return {
                    url: 'register',
                    method: 'POST',
                    body: ActualData,
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['users']
        }),
        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            }
        }),
        logoutUser: builder.mutation({
            query: ({ token }) => {
                console.log(token, 'logged out');
                return {
                    url: 'logout',
                    method: 'POST',
                    body: {},
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            }
        }),
        loggedUser: builder.query({
            query: ({ token }) => {
                return {
                    url: 'me',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['users']
        }),
        getAllUser: builder.query({
            query: ({ token }) => {
                return {
                    url: 'getalluser',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['users']
        }),
        deleteUserData: builder.mutation({
            query: (id) => {
                console.log('parant', id);
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['users']
        }),
        changePassword: builder.mutation({
            query: ({ token, data }) => {
                console.log(data, 'change password');
                console.log(token, 'change password');
                return {
                    url: 'changepassword',
                    method: 'POST',
                    body: data,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            }
        }),
        addClass: builder.mutation({
            query: ({ ActualData, token }) => {
                return {
                    url: 'class',
                    method: 'POST',
                    body: ActualData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['class']
        }),
        getClassAll: builder.query({
            query: ({ token }) => {
                console.log('token', token);
                return {
                    url: 'class',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['class']
        }),
        editClassData: builder.mutation({
            query: ({ id, student }) => {
                return {
                    url: `class/${id}`,
                    method: 'PUT',
                    body: student,
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['class']
        }),
        deleteclassData: builder.mutation({
            query: ({ id, token }) => {
                return {
                    url: `class/${id}`,
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['class']
        }),
        getTeacherAll: builder.query({
            query: ({ token }) => {
                return {
                    url: 'teacher',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['teacher']
        }),
        addTeacher: builder.mutation({
            query: ({ token, ActualData }) => {
                return {
                    url: `teacher`,
                    method: 'POST',
                    body: ActualData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['teacher']
        }),
        editTeacherData: builder.mutation({
            query: ({ id, ActualData, token }) => {
                console.log('student', ActualData);
                return {
                    url: `teacher/${id}`,
                    method: 'PUT',
                    body: ActualData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['teacher']
        }),
        deleteteacherData: builder.mutation({
            query: ({ token, id }) => {
                return {
                    url: `teacher/${id}`,
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['teacher']
        }),
        getSubjectAll: builder.query({
            query: ({ token }) => {
                return {
                    url: 'subject',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['subject']
        }),
        addSubject: builder.mutation({
            query: ({ token, ActualData }) => {
                return {
                    url: `subject`,
                    method: 'POST',
                    body: ActualData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['subject']
        }),
        editSubjectData: builder.mutation({
            query: ({ id, ActualData }) => {
                console.log('subject', ActualData);
                return {
                    url: `subject/${id}`,
                    method: 'PUT',
                    body: ActualData,
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['subject']
        }),
        deleteSubjectData: builder.mutation({
            query: ({ token, id }) => {
                console.log('subject', id);
                return {
                    url: `subject/${id}`,
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['subject']
        }),
        getStudentAll: builder.query({
            query: ({ token }) => {
                return {
                    url: 'student',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['student']
        }),
        addStudent: builder.mutation({
            query: ({ token, formdata }) => {
                console.log('student', formdata);
                return {
                    url: 'student',
                    method: 'POST',
                    body: formdata,
                    headers: {
                        // 'Content-type': 'application/json',
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['student']
        }),
        editStudentData: builder.mutation({
            query: ({ id, ActualData }) => {
                console.log('student', ActualData);
                return {
                    url: `student/${id}`,
                    method: 'PUT',
                    body: ActualData,
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['student']
        }),
        deleteStudentData: builder.mutation({
            query: (id) => {
                console.log('student', id);
                return {
                    url: `student/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['student']
        }),
        getParantAll: builder.query({
            query: ({ token }) => {
                return {
                    url: 'parant',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['parant']
        }),
        addParant: builder.mutation({
            query: ({ token, Actual_data }) => {
                console.log('parant', Actual_data);
                return {
                    url: 'parant',
                    method: 'POST',
                    body: Actual_data,
                    headers: {
                        // 'Content-type': 'application/json',
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['parant']
        }),
        editParantData: builder.mutation({
            query: ({ id, ActualData }) => {
                console.log('parant', ActualData);
                return {
                    url: `parant/${id}`,
                    method: 'PUT',
                    body: ActualData,
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['parant']
        }),
        deleteParantData: builder.mutation({
            query: (id) => {
                console.log('parant', id);
                return {
                    url: `parant/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['parant']
        }),
        getLibraryAll: builder.query({
            query: ({ token }) => {
                console.log('token', token);
                return {
                    url: 'library',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            },
            providesTags: ['library']
        }),
        addLibrary: builder.mutation({
            query: ({ ActualData, token }) => {
                console.log('library', ActualData);
                console.log('token', token);
                return {
                    url: 'library',
                    method: 'POST',
                    body: ActualData,
                    headers: {
                        // 'Content-type': 'application/json',
                        authorization: `Bearer ${token}`
                    }
                };
            },
            invalidatesTags: ['library']
        }),
        editLibraryData: builder.mutation({
            query: ({ id, ActualData }) => {
                console.log('library', ActualData);
                return {
                    url: `library/${id}`,
                    method: 'PUT',
                    body: ActualData,
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['library']
        }),
        deleteLibraryData: builder.mutation({
            query: (id) => {
                console.log('library', id);
                return {
                    url: `library/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                };
            },
            invalidatesTags: ['library']
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoggedUserQuery,
    useChangePasswordMutation,
    useResetPasswordMutation,
    useGetAllUserQuery,
    useDeleteUserDataMutation,
    useAddClassMutation,
    useGetClassAllQuery,
    useEditClassDataMutation,
    useDeleteclassDataMutation,
    useGetTeacherAllQuery,
    useAddTeacherMutation,
    useEditTeacherDataMutation,
    useDeleteteacherDataMutation,
    useGetSubjectAllQuery,
    useAddSubjectMutation,
    useEditSubjectDataMutation,
    useDeleteSubjectDataMutation,
    useGetStudentAllQuery,
    useEditStudentDataMutation,
    useDeleteStudentDataMutation,
    useAddStudentMutation,
    useGetParantAllQuery,
    useAddParantMutation,
    useEditParantDataMutation,
    useDeleteParantDataMutation,
    useGetLibraryAllQuery,
    useAddLibraryMutation,
    useEditLibraryDataMutation
} = userAuthApi;
