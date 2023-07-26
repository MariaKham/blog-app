export const setArticles = (articles) => ({ type: 'SET_ARTICLES', articles })
export const setCurArticle = (article) => ({ type: 'SET_CUR_ARTICLE', article })
export const setTotalPage = (totalPage) => ({ type: 'SET_TOTAL_PAGE', totalPage })
// export const setOffset = (offset) => ({ type: 'SET_OFFSET', offset })
export const setArticleError = (payload) => ({ type: 'SET_ARTICLE_ERROR', payload })
export const setLoading = (payload) => ({ type: 'SET_LOADING', payload })

// export const getArticles = (offset) => async (dispatch) => {
//   const token = localStorage.getItem('token')
//   await fetch(`https://blog.kata.academy/api/articles?limit=5?offset=${offset}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       dispatch(setArticles(res.articles))
//       dispatch(setTotalPage(res.articlesCount))
//       dispatch(setLoading(false))
//       console.log(res.articles)
//     })
//     .catch(() => dispatch(setArticleError(true)))
// }

// export const getCurArticle = (slug) => async (dispatch) => {
//   const token = localStorage.getItem('token')
//   await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       dispatch(setCurArticle(res.article))
//       dispatch(setLoading(false))
//     })
//     .catch(() => dispatch(setArticleError(true)))
// }
