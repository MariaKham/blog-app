/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import { signIn } from '../../services/userApi'
import { setLogged, setUser, setErrorState } from '../../store/actions/loginAction'
import classes from '../App/app.module.scss'

function SignIn() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [validationErr, setValidationErr] = useState(false)

  const { register, handleSubmit } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    signIn(data.email, data.password).then((body) => {
      if (body.user) {
        localStorage.setItem('token', body.user.token)
        dispatch(setLogged(true))
        dispatch(setUser(body.user))
        dispatch(setErrorState(''))
        history.push('/')
      }
      if (body.errors) {
        setValidationErr(true)
      }
    })
  }

  return (
    <div className={classes.block__form}>
      <h2>Sign In</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email address</label>
        <input
          className={classes.input}
          type="email"
          id="email"
          placeholder="Email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: 'Incorrect email',
            },
          })}
        />

        <label htmlFor="password">Password</label>
        <input
          className={classes.input}
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {validationErr ? <div className={classes.error}>Login or password is invalid</div> : null}

        <input type="submit" name="submit" id="submit" value="Login" />
      </form>
      <p>
        Don`t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  )
}

export default SignIn
