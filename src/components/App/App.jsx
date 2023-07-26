import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import ArticlePost from '../ArticlePost/ArticlePost'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import UserProfile from '../UserProfile/UserProfile'
import CreateArticle from '../CreateArticle/CreateArticle'
import { checkAuth } from '../../services/userApi'

import classes from './app.module.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  return (
    <div className={classes.wrapper}>
      <Router>
        <Header />
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/articles" component={ArticleList} />
        <Route exact path="/articles/:slug" component={ArticlePost} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/new-article" component={CreateArticle} />
        <Route exact path="/articles/:slug/edit" component={CreateArticle} />
      </Router>
    </div>
  )
}

export default App
