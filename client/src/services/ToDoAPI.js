import API from './API.js'

export default {
  getToDos() {
    return API().get("todo")
  },
  addTodo(todo) {
    return API().post('addTodo', {
      todo: todo // add our data to the request body
    })
  }
}