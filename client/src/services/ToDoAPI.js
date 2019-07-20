import API from './API.js'

export default {
  getToDos() {
    return API().get('todo')
  }
}