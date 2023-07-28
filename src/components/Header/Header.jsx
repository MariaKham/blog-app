import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logOut } from '../../services/userApi'

import classes from './header.module.scss'

function Header() {
  const logged = useSelector((state) => state.logged)
  const user = useSelector((state) => state.user)

  const history = useHistory()
  const dispatch = useDispatch()

  const handleUpdateUser = () => {
    history.push('/profile')
  }

  const handleLogOut = () => {
    dispatch(logOut())
    history.push('/sign-in')
  }

  return (
    <div className={classes.header}>
      <Link to="/">Realworld Blog</Link>
      <div className={classes.header__btn}>
        {logged ? (
          <>
            <Link to="/new-article" className={classes.create_article}>
              Create article
            </Link>
            <span className={classes.name} onClick={handleUpdateUser}>
              {user ? user.username : 'none'}
            </span>
            <img
              className={classes.image}
              src={user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              alt="avatar"
              onClick={handleUpdateUser}
            />
            <button type="button" className={classes.log_out} onClick={handleLogOut}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className={classes.sign_in}>
              Sign in
            </Link>
            <Link to="/sign-up" className={classes.sign_up}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
