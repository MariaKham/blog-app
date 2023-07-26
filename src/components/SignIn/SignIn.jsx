/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import { signIn } from '../../services/userApi'
import classes from '../App/app.module.scss'

function SignIn() {
  const history = useHistory()
  const dispatch = useDispatch()
  const errorState = useSelector((state) => state.errorState)
  const logged = useSelector((state) => state.logged)
  const { register, handleSubmit } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    dispatch(signIn(data.email, data.password))
  }

  useEffect(() => {
    logged ? history.push('/') : null
  }, [logged])

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
        <input type="submit" name="submit" id="submit" value="Login" />
      </form>
      <p>
        Don`t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
      {errorState && <div className={classes.error}>{errorState}</div>}
    </div>
  )
}

export default SignIn
