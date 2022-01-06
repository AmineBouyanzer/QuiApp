import axios from 'axios'

const url = "https://localhost:44397";

export function getAllQuiz() {
  return axios
    .get(url + `/quiz/all`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    })
}

export function getQuizzById(id) {
  return axios
    .get(url + `/quiz/details/` + id)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    })
}

export function addQuizz(quizz) {
  return axios
    .post(url + `/quiz`, quizz)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    })
}

export function getAllCategories() {
  return axios
    .get(url + `/quiz/categories/all`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    })
}

export function getCategory(category) {
  return axios
    .get(url + `/quiz/category/` + category)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    })
}

export function updateQuizz(quizz, quizzId) {
  return axios
    .put(url + "/quiz/update/" + quizzId, quizz)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    })
}

export function rateQuizz(rate) {
  return axios
  .post(url + `/quiz/rating/`, rate)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error.response;
  })
}

export function unlockQuizz(password) {
  return axios
    .post(url + "/quiz/unlock", password)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    })
}


export function deleteQuizz(quizzId) { 
  return axios
    .delete(url + "/quiz?id="+ quizzId)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    })
}