import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import { getArticle } from '../../services/articleApi'
import Article from '../Article/Article'

import classes from './articlePost.module.scss'

function ArticlePost() {
  const { slug } = useParams()
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticle(slug)
      .then((el) => {
        setData(el.article)
        setLoading(false)
      })
      .catch(() => setError(true))
  }, [slug])

  return (
    <div className={classes.single_post}>
      {loading ? <Spin size="large" className={classes.spin} /> : null}
      {error ? 'Error' : null}
      {data ? (
        <>
          <Article data={data} checkSlug={slug} showmore />
          <ReactMarkdown skipHtml>{data.body}</ReactMarkdown>
        </>
      ) : null}
    </div>
  )
}

export default ArticlePost
