import { useEffect, useState } from 'react'
import { Spin, Pagination } from 'antd'

import { getArticles } from '../../services/articleApi'
import Article from '../Article/Article'

import classes from './articleList.module.scss'

function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [articles, setArticles] = useState([])
  const [articleError, setArticleError] = useState(false)
  const [totalPage, setTotalPage] = useState()
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  useEffect(() => {
    getArticles(currentPage)
      .then((body) => {
        setArticles(body.articles)
        setTotalPage(body.articlesCount)
        setLoading(false)
      })
      .catch(() => setArticleError(true))
  }, [token])

  const onChangePage = (page) => {
    getArticles(page)
      .then((body) => {
        setArticles(body.articles)
        setTotalPage(body.articlesCount)
        setLoading(false)
      })
      .catch(() => setArticleError(true))
    setCurrentPage(page)
  }

  return (
    <div className={classes.article__list}>
      {loading ? <Spin size="large" className={classes.spin} /> : null}
      {articleError ? 'Error' : null}
      {articles?.map((el) => (
        <Article key={el.slug} data={el} />
      ))}

      {articles?.length ? (
        <Pagination
          className={classes.pagination}
          defaultCurrent={1}
          total={totalPage}
          showSizeChanger={false}
          onChange={onChangePage}
          current={currentPage}
        />
      ) : null}
    </div>
  )
}

export default ArticleList
