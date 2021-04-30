<template>
  <div id="app">
    <TodoHeader/>
    <TodoInput @addTodoItem="addTodo"/>
    <TodoList 
      :propsData="todoItems"
      @toggleCompleteEvent="toggleComplete"
      @removeTodoEvent="removeTodo"
      @modifyTodoEvent="modifyTodo"
      @modifyBtnEvent="modifyBtn"
    />
    <!-- <router-view/> -->
    <TodoFooter @clearAll="clearTodo"/>
    <!-- <router-link to="/list">list</router-link>
    <router-link to="/footer">footer</router-link> -->
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    addTodo(todoItem) {
      if(this.newTodoItem !== '') {
        localStorage.clear();
        // 변수 선언을 var에서 const로 바꾼 이유 : 변수 충돌을 방지해서 디버깅하기 편하고 좀 더 안전한 프로그래밍을 할 수 있다.
        const obj = {completed: false, checked: false, todoTitle:todoItem, idx:Date.now() + Math.random(), toggleModify: true}
        this.todoItems.push(obj);
        localStorage.setItem('listData', JSON.stringify(this.todoItems));
      }
    },
    toggleComplete(todoItem, todoItemKey) {
      this.todoItems[todoItemKey].completed = !this.todoItems[todoItemKey].completed
      localStorage.setItem('listData', JSON.stringify(this.todoItems));
    },
    removeTodo(todoItemKey) {
      this.todoItems.splice(todoItemKey, 1);
      localStorage.setItem('listData', JSON.stringify(this.todoItems));
    },
    modifyBtn(todoItemKey) {
      if(this.todoItems[todoItemKey].toggleModify) {
        this.todoItems[todoItemKey].toggleModify = false;
        // this.$refs.modifyInput.focus();
      } else {
        this.todoItems[todoItemKey].toggleModify = true;
      }
    },
    modifyTodo(todoItemKey) {
      localStorage.setItem('listData', JSON.stringify(this.todoItems));
      this.modifyBtn(todoItemKey);
    },
    clearTodo() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  created() {
    if (localStorage.length > 0) {
      this.todoItems = [];
      const localStorageData = localStorage.getItem('listData');
      this.todoItems = JSON.parse(localStorageData);
    }
  },

  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  }
}
</script>

<style>
  body {
    background-color: #f6f6f6;
  }
</style>