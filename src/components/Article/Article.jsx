import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import { Popconfirm, message } from 'antd'
import { useSelector } from 'react-redux'

import { deleteArticle, setFavorite, deleteFavorite } from '../../services/articleApi'
import nolike from '../../assets/img/no-like.svg'
import like from '../../assets/img/like.svg'

import classes from './article.module.scss'

function Article({ data, showmore, checkSlug }) {
  const user = useSelector((state) => state.user)
  const logged = useSelector((state) => state.logged)

  const [error, setError] = useState(false)
  const [active, setActive] = useState(data.favorited)
  const [count, setCount] = useState(data.favoritesCount)

  const history = useHistory()

  useEffect(() => {
    if (logged) {
      setActive(data.favorited)
    }
  }, [data])

  const cancel = () => {
    history.push(`/articles/${data.slug}`)
  }

  const confirm = () => {
    deleteArticle(data.slug)
      .then((body) => {
        console.log(body)
        setError(false)
      })
      .catch(() => setError(true))
    if (!error) {
      message.success('Article deleted')
      history.push('/')
    }
  }

  const onLikeArticle = () => {
    if (logged) {
      setActive((active) => !active)
      setCount(() => (active ? count - 1 : count + 1))
      !active ? setFavorite(data.slug) : deleteFavorite(data.slug)
    }
  }

  return (
    <div className={showmore ? classes.card__more : classes.card}>
      <div className={classes.info}>
        <div className={classes.header}>
          <Link to={`/articles/${checkSlug || data.slug}`} className={classes.title}>
            {data.title}
          </Link>
          <img
            className={classes.heart}
            alt="heart"
            src={active ? like : nolike}
            onClick={logged ? onLikeArticle : null}
          />
          <span>{count}</span>
        </div>
        <div className={classes.tagList}>
          {data.tagList.map((item, id) => (
            <div key={id} className={classes.tag}>
              {item}
            </div>
          ))}
        </div>
        <div className={classes.description}>{data.description}</div>
      </div>
      <div className={classes.author}>
        <div>
          <div className={classes.name}>{data.author.username}</div>
          <div className={classes.created}>
            {data.createdAt ? format(new Date(data.createdAt), 'MMMM d, yyyy') : 'none'}
          </div>
          {data.author.username === user.username && logged && showmore ? (
            <>
              <Popconfirm
                placement="right"
                title="Are you sure to delete this article?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={classes.btn_delete}>
                  Delete
                </button>
              </Popconfirm>
              <button
                type="button"
                className={classes.btn_edit}
                onClick={() => history.push(`/articles/${data.slug}/edit`)}
              >
                Edit
              </button>
            </>
          ) : null}
        </div>
        <img
          src={data.author.image ? data.author.image : 'https://api.realworld.io/images/smiley-cyrus.jpg'}
          className={classes.image}
          alt="avatar"
        />
      </div>
    </div>
  )
}

export default Article
