import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'

import { updateUser } from '../../services/userApi'
import classes from '../App/app.module.scss'

function UserProfile() {
  const dispatch = useDispatch()
  const history = useHistory()
  const errorState = useSelector((state) => state.errorState)
  const user = useSelector((state) => state.user)

  const [fields, setFields] = useState({
    username: user.username,
    email: user.email,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const handleChange = (e) => {
    const { name } = e.target.name
    const { value } = e.target.value
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = (data) => {
    const filteredKeys = Object.keys(data).filter((key) => data[key] !== '')
    const newData = filteredKeys.reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
    dispatch(updateUser(newData))

    if (errorState === '') {
      message.success('Profile update')
      history.push('/')
    }
  }

  return (
    <div className={classes.block__form}>
      <h2>Edit Profile</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          className={classes.input}
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={fields.username}
          onChange={handleChange}
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username needs to be at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username needs to be shorten than 20 characters',
            },
          })}
        />
        {errors?.username && <div className={classes.error}>{errors?.username.message || 'Error'}</div>}

        <label htmlFor="email">Email address</label>
        <input
          className={classes.input}
          type="email"
          id="email"
          placeholder="Email address"
          defaultValue={fields.email}
          onChange={handleChange}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^([A-Za-z0-9_.-])+@([A-Za-z0-9_.-])+.([A-Za-z])$/,
              message: 'Incorrect email',
            },
          })}
        />
        {errors?.email && <div className={classes.error}>{errors?.email?.message || 'Error'}</div>}

        <label htmlFor="password">New password</label>
        <input
          className={classes.input}
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password needs to be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Password needs to be shorten than 40 characters',
            },
          })}
        />
        {errors?.password && <div className={classes.error}>{errors?.password?.message || 'Error'}</div>}

        <label htmlFor="image">Avatar image (url)</label>
        <input className={classes.input} type="url" id="image" placeholder="Avatar image" {...register('image', {})} />
        {errors?.image && <div className={classes.error}>{errors?.image?.message || 'Error'}</div>}

        <input type="submit" name="submit" id="submit" value="Save" />
      </form>
      {errorState && <div className={classes.error}>{errorState}</div>}
    </div>
  )
}

export default UserProfile
