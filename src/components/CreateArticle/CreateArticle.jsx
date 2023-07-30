import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { message } from 'antd'

import { getArticle, createNewArticle, editArticle } from '../../services/articleApi'
import { loggedState } from '../../store/selectors'

import classes from './createArticle.module.scss'

function CreateArticle() {
  const history = useHistory()
  const { slug } = useParams()
  const [tag, setTag] = useState([])
  const [inputState, setInputState] = useState('')
  const [error, setError] = useState(false)

  const logged = useSelector(loggedState)

  if (!logged) {
    history.push('/sign-in')
    message.error('Only logged in users can create articles')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
    reset,
    setValue,
  } = useForm({ mode: 'onBlur' })

  const clearState = () => {
    setTag([])
  }

  useEffect(() => {
    clearState()
    if (slug) {
      getArticle(slug)
        .then((el) => {
          setValue('title', el.article.title)
          setValue('description', el.article.description)
          setValue('body', el.article.body)
          setTag(el.article.tagList.map((item) => ({ value: item, id: nanoid() })))
          setError(false)
        })
        .catch(() => setError(true))
    }
  }, [slug])

  const onSubmit = (data) => {
    const { body, title, description, ...tags } = data
    const allTags = Object.entries(tags).map((el) => el[1])
    const tagList = allTags.filter((element) => element.trim() !== '')
    const newData = { body, title, description, tagList }
    if (!error) {
      if (!slug) {
        createNewArticle(newData)
          .then((data) => {
            history.push(`/articles/${data.article?.slug}`)
            setError(false)
            message.success('Article created')
          })
          .catch(() => setError(true))
      } else {
        editArticle(slug, newData)
          .then((data) => {
            history.push(`/articles/${data.article?.slug}`)
            setError(false)
            message.success('Article edited')
          })
          .catch(() => setError(true))
      }
    }
  }

  const onAddTag = () => {
    unregister('tags0')
    if (inputState.trim()) {
      setTag([...tag, { value: inputState.trim(), id: nanoid() }])
      setInputState('')
    }
  }

  const onDeletTag = (id) => {
    setTag((tag) => tag.filter((el) => el.id !== id))
    unregister(`tags${id}`)
  }

  return (
    <div className={classes.article}>
      <h2>{slug ? 'Edit article' : 'Create new article'}</h2>
      <form className={classes.create_article} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="title">Title</label>
        <input
          className={classes.input}
          id="title"
          type="text"
          placeholder="Title"
          {...register('title', {
            required: 'Is required',
          })}
        />
        {errors?.title && <div className={classes.error}>{errors?.title.message || 'Error'}</div>}

        <label htmlFor="description">Short description</label>
        <input
          className={classes.input}
          id="description"
          type="text"
          placeholder="Description"
          {...register('description', {
            required: 'Is required',
          })}
        />
        {errors?.description && <div className={classes.error}>{errors?.description.message || 'Error'}</div>}

        <label htmlFor="body">Text</label>
        <textarea
          className={classes.input}
          id="body"
          type="text"
          placeholder="Text"
          {...register('body', {
            required: 'Is required',
          })}
        />
        {errors?.text && <div className={classes.error}>{errors?.text.message || 'Error'}</div>}

        <label htmlFor="tags">Tags</label>
        <div className={classes.tagList}>
          {tag.map((item) => (
            <div key={item.id}>
              <input
                id="tags"
                type="text"
                className={classes.input}
                placeholder="Tag"
                {...register(`tags${item.id}`, {
                  value: item.value,
                  required: 'Is required',
                })}
              />
              <button type="button" className={classes.btn_delete} onClick={() => onDeletTag(item.id)}>
                Delete
              </button>
            </div>
          ))}
          <div>
            <input
              id="tags"
              type="text"
              className={classes.input}
              placeholder="Tag"
              value={inputState}
              {...register('tags0', {
                onChange: (e) => {
                  setInputState(e.target.value)
                },
              })}
            />
            <button
              type="button"
              className={classes.btn_delete}
              onClick={() => {
                setInputState('')
                unregister('tags0')
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className={classes.btn_add}
              onClick={() => {
                onAddTag()
              }}
            >
              Add tag
            </button>
          </div>
        </div>
        <input
          type="submit"
          name="submit"
          id="submit"
          value="Send"
          onClick={() => {
            reset({ tags0: '' })
          }}
        />
      </form>
    </div>
  )
}

export default CreateArticle
