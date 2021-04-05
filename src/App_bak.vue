<template>
  <div id="app">
    <TodoHeader/>
    <TodoInput @addTodoItem="addTodo"/>
    <TodoList 
      :propsData="todoItems"
      @toggleItem="toggleComplete"
      @removeTodoItem="removeTodo"
    />
    <TodoFooter @clearAll="clearTodo"/>
    <!-- <router-link to="/list">list</router-link>
    <router-link to="/footer">footer</router-link>
    <router-view/> -->
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
          // 변수 선언을 var에서 const로 바꾼 이유 : 변수 충돌을 방지해서 디버깅하기 편하고 좀 더 안전한 프로그래밍을 할 수 있다.
            const obj = {completed: false, checked: false, todoTitle:todoItem}
            localStorage.setItem(todoItem, JSON.stringify(obj));
            this.todoItems.push(obj);
        }
    },
    toggleComplete(todoItem, todoItemKey) {
      this.todoItems[todoItemKey].completed = !this.todoItems[todoItemKey].completed
      localStorage.removeItem(todoItem.todoTitle);
      localStorage.setItem(todoItem.todoTitle, JSON.stringify(todoItem));
    },
    removeTodo(todoItem, todoItemKey) {
      localStorage.removeItem(todoItem.todoTitle);
      this.todoItems.splice(todoItemKey, 1);
    },
    clearTodo() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  created() {
    if (localStorage.length > 0) {
      // 변수 선언을 var에서 let으로 바꾼 이유 : 반복문은 값이 올라가야 하기 때문에 let으로 선언 해야 된다.
      for (let i = 0; i < localStorage.length; i ++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
      }
    }
  },

  components: {
    'TodoHeader' : TodoHeader,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter,
  }
}
</script>

<style>
  body {
    background-color: #f6f6f6;
  }
</style>
