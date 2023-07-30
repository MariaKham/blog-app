import { setUser, setLogged, setErrorState } from '../store/actions/loginAction'

// регистрация
export const signUp = async (data) => {
  const value = {
    username: data.username,
    email: data.email,
    password: data.password,
  }
  return await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: value }),
  })
    .then((res) => res.json())
    .then((body) => body)
    .catch((error) => {
      if (error === 422) throw error
    })
}

// вход по логину
export const signIn = async (email, password) =>
  await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  })
    .then((res) => res.json())
    .then((body) => body)
    .catch((error) => {
      if (error === 422) throw error
    })

// проверка на то, залогинен ли пользователь
export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('https://blog.kata.academy/api/user/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((body) => {
          dispatch(setLogged(true))
          dispatch(setUser(body.user))
          dispatch(setErrorState(''))
        })
    } else return
  } catch (error) {
    dispatch(setErrorState(error))
  }
}

// обновление данных в профиле
export function updateUser(data) {
  const token = localStorage.getItem('token')
  return fetch('https://blog.kata.academy/api/user/', {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data }),
  })
    .then((res) => res.json())
    .then((body) => body)
    .catch((error) => {
      if (error === 422) throw error
    })
}

// удаление токена
export const logOut = () => async (dispatch) => {
  try {
    localStorage.removeItem('token')
    dispatch(setUser({}), dispatch(setLogged(false)), dispatch(setErrorState('')))
  } catch (error) {
    dispatch(setErrorState(error))
  }
}
