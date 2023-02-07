import PropTypes from 'prop-types'
// import 'react-tabs/style/react-tabs.css';
// material-ui
import { Box, Card } from '@mui/material'
// project imports

import MainCard from 'ui-component/cards/MainCard'
import SecondaryAction from 'ui-component/cards/CardSecondaryAction'
// @mui
import { Button, TextField, Alert } from '@mui/material'
// hooks
// components
// sections
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// @mui
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useAddClassMutation,
  useEditClassDataMutation,
  useGetTeacherAllQuery
} from 'services/userAuthApi'
import Select from 'react-select'
import axios from 'axios'
import label from 'ui-component/label'
import { IconChevronLeft } from '@tabler/icons'
import { getToken } from 'services/LocalStorage'
import AsyncSelect from 'react-select/async'
// constant
const icons = {
  IconChevronLeft
}
function AddClass () {
  // ===============================|| SHADOW BOX ||=============================== //

  // ----------------------------------------------------------------------
  const token = getToken()
  const navigate = useNavigate()
  // react hook form
  // validation
  const formSchema = Yup.object().shape({
    name: Yup.string().required(),
    numeric: Yup.string().required()
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    // errors,
    reset,
    trigger,
    control
  } = useForm(formOptions)
  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  const [errorshow, setErrorShow] = useState({
    status: false,
    msg: '',
    type: ''
  })

  const [editclass] = useEditClassDataMutation()
  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])
  // login kar k console.log check karo

  const ShadowBox = ({ shadow }) => (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor: 'primary.light',
          color: 'grey.800'
        }}
      >
        <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
      </Box>
    </Card>
  )
  ShadowBox.propTypes = {
    shadow: PropTypes.string.isRequired
  }
  const { id } = useParams()
  const [student, setStudent] = useState({
    name: '',
    numeric: ''
  })
  // const options = [
  //     { value: 'chocolate', label: 'Chocolate' },
  //     { value: 'strawberry', label: 'Strawberry' },
  //     { value: 'vanilla', label: 'Vanilla' },
  //   ];

  const [teacher, setteacher] = useState('')
  const [options, setOptions] = useState([''])
  // console.log(options,'options')
  function onTextFieldChange (e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }
  const [selectedOption, setSelectedOption] = useState('')
  const [addClass] = useAddClassMutation()

  const onSubmit = async data => {
    console.log(selectedValue, 'selectedValue')
    const ActualData = {
      name: data.name,
      numeric: data.numeric,
      teacher_id: selectedValue.id
  };
    if (ActualData.name && ActualData.numeric && ActualData.teacher_id) {
      const res = await addClass({ ActualData, token })
      if (res.data.status === 'success') {
        console.log('first')
        setErrorShow({ status: true, msg: res.data.message, type: 'success' })
        document.getElementById('formid').reset()
        navigate('/dashboard/class')
      } else {
        console.log('sds')
        setErrorShow({ status: true, msg: res.data.message, type: 'error' })
      }
    } else {
      setErrorShow({
        status: true,
        msg: 'Please fill all the fields',
        type: 'error'
      })
      console.log('setErrorShow')

      // document.getElementById("formid").reset();
      // navigate('/login');
    }
  }

  // get teacher
  const [selectedValue, setSelectedValue] = useState('')

  // handle selection
  const handleChange = value => {
    setSelectedValue(value)
  }
  console.log(selectedValue, 'selectedValue')
  // load options using API call
  const loadOptions = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_PATH}/admin/teacher`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    )
    console.log(res, 'res')
    const re = res.data.result
    return re
  }

  return (
    <MainCard
      title='Add Class'
      secondary={
        <button className='btn btn-primary'>
          <i className='bi bi-skip-backward'></i>Back
        </button>
      }
    >
      <div className='container'>
        <div className='row'>
          <div className='col'></div>
          <div className='col'>
            <Box
              sx={{
                width: 500,
                height: 300,
                // boxShadow,
                alignItems: 'center'
                // backgroundColor: 'darkGray',
              }}
            >
              <form spacing={3} id='formid' onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label='Name'
                  type='text'
                  name='name'
                  fullWidth
                  margin='dense'
                  sx={{ mb: 2 }}
                  {...register('name')}
                  className={`form-control mt-4 ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                />
                <Box sx={{ mb: 2 }}>
                  {errors.name && (
                    <small className='text-danger'>{errors.name.message}</small>
                  )}
                </Box>
                <TextField
                  label='Numeric'
                  type='text'
                  name='numeric'
                  fullWidth
                  margin='dense'
                  sx={{ mb: 2 }}
                  {...register('numeric')}
                  className={`form-control mt-4 ${
                    errors.numeric ? 'is-invalid' : ''
                  }`}
                />
                <Box sx={{ mb: 2 }}>
                  {errors.numeric && (
                    <small className='text-danger'>
                      {errors.numeric.message}
                    </small>
                  )}
                </Box>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  value={selectedValue}
                  getOptionLabel={e => e.label}
                  getOptionValue={e => e.id}
                  loadOptions={loadOptions}
                  onChange={handleChange}
                />
                {/* <Controller
                        control={control}
                        name="teacher_id"
                        defaultValue=""
                        render={({ onChange, value, onBlur, name }) => (
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={setSelectedOption}
                            options={options}
                        />
                        )}
                    /> */}
                <div className='d-grid mt-5'>
                  <Button
                    type='submit'
                    variant='contained'
                    style={{ color: 'black' }}
                  >
                    Save
                  </Button>
                </div>
                {errorshow.status ? (
                  <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                    {errorshow.msg}
                  </Alert>
                ) : (
                  ''
                )}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </form>
            </Box>
          </div>
          <div className='col'></div>
        </div>
      </div>
    </MainCard>
  )
}

export default AddClass
