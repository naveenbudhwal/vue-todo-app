<template>
  <div>
    <form @submit="addToDo($event)">
      <input type="text" placeholder="Enter ToDo" v-model="newTodo" />
      <input type="submit" />
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo">
        <span>{{todo}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoAPI from "../services/ToDoAPI.js";

export default {
  data() {
    return {
      newToDo: "",
      todos: []
    };
  },
  mounted() {
    this.loadTodos();
  },
  methods: {
    async addToDo(evt) {
      evt.preventDefault();
      const response = await ToDoAPI.addToDo(this.newToDo);
      this.todos.push(response.data);
      this.newToDo = "";
    },
    async loadTodos() {
      const response = await ToDoAPI.getToDos();
      this.todos = response.data;
    }
  }
};
</script>

<style>
</style>
