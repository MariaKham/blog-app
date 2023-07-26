import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
import { Spin, Pagination } from 'antd'

import { getArticles } from '../../services/articleApi'
// import { setArticles, setTotalPage, setLoading, setArticleError } from '../../store/actions/articleAction'
import Article from '../Article/Article'

import classes from './articleList.module.scss'

function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1)
  // const articles = useSelector((state) => state.articles)
  // const loading = useSelector((state) => state.loading)
  // const articleError = useSelector((state) => state.error)
  // const totalPage = useSelector((state) => state.totalPage)
  const [articles, setArticles] = useState([])
  const [articleError, setArticleError] = useState(false)
  const [totalPage, setTotalPage] = useState()
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  // const dispatch = useDispatch()

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

  const showLoading = loading ? <Spin size="large" className={classes.spin} /> : null
  const showError = articleError ? 'Error' : null

  return (
    <div className={classes.article__list}>
      {showLoading}
      {showError}
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
