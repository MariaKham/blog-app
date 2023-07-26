/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { message } from 'antd'

import { signUp } from '../../services/userApi'
import classes from '../App/app.module.scss'

function SignUp() {
  const [checkbox, setCheckbox] = useState(true)
  const errorState = useSelector((state) => state.errorState)
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    dispatch(signUp(data))
    if (errorState === '') {
      message.success('Account created')
      history.push('/sign-in')
    }
  }

  return (
    <div className={classes.block__form}>
      <h2>Create new account</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          className={classes.input}
          type="text"
          id="username"
          placeholder="Username"
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
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^([A-Za-z0-9_.-])+@([A-Za-z0-9_.-])+.([A-Za-z])$/,
              message: 'Incorrect email',
            },
          })}
        />
        {errors?.email && <div className={classes.error}>{errors?.email?.message || 'Error'}</div>}

        <label htmlFor="password">Password</label>
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

        <label htmlFor="repassword">Repeat password</label>
        <input
          className={classes.input}
          type="password"
          id="repassword"
          placeholder="Password"
          {...register('repassword', {
            required: 'Password is required',
            validate: (val) => {
              if (watch('password') !== val) {
                return 'Passwords must match'
              }
            },
          })}
        />
        {errors?.repassword && <div className={classes.error}>{errors?.repassword?.message || 'Error'}</div>}

        <label htmlFor="agree">
          <input
            className={classes.checkbox}
            type="checkbox"
            id="agree"
            {...register('agree', {
              required: 'It must be selected',
              value: checkbox,
            })}
            onChange={(e) => {
              setCheckbox(e.target.checked)
            }}
          />
          I agree to the processing of my personal information
        </label>
        {errors?.check && <div className={classes.error}>{errors?.check?.message || 'Error'}</div>}
        <input type="submit" name="submit" id="submit" value="Create" />
      </form>
      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
      {errorState && <div className={classes.error}>{errorState}</div>}
    </div>
  )
}

export default SignUp
