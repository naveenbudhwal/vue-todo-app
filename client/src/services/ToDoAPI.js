import API from './API.js'

export default {
  getToDos() {
    return API().get("todo")
  },
  addToDo(todo) {
    return API().push("addToDo", {
      todo: todo
    })
  }
}