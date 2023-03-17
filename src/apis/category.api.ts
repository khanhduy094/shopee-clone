import http from 'src/utils/http'

const URL = 'categories'

const categoriesApi = {
  getCategories: () => {
    return http.get(URL)
  }
}

export default categoriesApi
