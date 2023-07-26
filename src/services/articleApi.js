// Получение статей
export const getArticles = async (page) => {
  const token = localStorage.getItem('token')
  return fetch(`https://blog.kata.academy/api/articles?&limit=5&offset=${(page - 1) * 5}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json())
}

// получение 1 статьи
export const getArticle = async (slug) => {
  const token = localStorage.getItem('token')
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json())
}

// добавление новой статьи
export const createNewArticle = async (data) => {
  const token = localStorage.getItem('token')
  const { title, body, description, tagList } = data
  return fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  }).then((res) => res.json())
}

// редактирование статьи
export const editArticle = async (slug, data) => {
  const token = localStorage.getItem('token')
  const { title, body, description, tagList } = data
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  }).then((res) => res.json())
}

// удаление статьи
export const deleteArticle = async (slug) => {
  const token = localStorage.getItem('token')
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json())
}

// лайк
export const setFavorite = async (slug) => {
  const token = localStorage.getItem('token')
  return fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json())
}

// дизлайк
export const deleteFavorite = async (slug) => {
  const token = localStorage.getItem('token')
  return fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json())
}
