const initialState = {
  error: false,
  loading: true,
  articles: [],
  curArticle: {},
  // offset: 0,
  totalPage: 0,
}

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLE_ERROR':
      return { ...state, error: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ARTICLES':
      return { ...state, articles: action.articles }
    case 'SET_CUR_ARTICLE':
      return { ...state, curArticle: action.article }
    case 'SET_TOTAL_PAGE':
      return { ...state, totalPage: action.totalPage }
    // case 'SET_OFFSET':
    //   return { ...state, offset: action.offset }
    default:
      return state
  }
}

export default articlesReducer
