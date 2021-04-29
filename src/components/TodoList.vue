<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <transition-group name="list" tag="b-list-group">
          <b-list-group-item v-for="(todoItem, todoItemKey) in propsData" :key="todoItem.idx">
            <b-row align-v="center">
              <b-col>
                <b-form-checkbox
                  :id="'checkbox-'+ todoItemKey"
                  :name="'checkbox-'+ todoItemKey"
                  @change="toggleComplete(todoItem, todoItemKey)"
                  v-model="todoItem.checked"
                  v-if="todoItem.toggleModify"
                  switch
                >
                  <span class="completeBtn">{{todoItem.checked?'완료':'미완료'}}</span>
                  <span :class="{lineThrough: todoItem.completed}">{{todoItem.todoTitle}}</span>
                </b-form-checkbox>
                <b-form-input 
                  v-model="todoItem.todoTitle" 
                  :ref="'modifyInput' + todoItemKey"
                  @keyup.enter="modifyTodo(todoItemKey)" 
                  v-else
                >{{todoItem.todoTitle}}</b-form-input>
              </b-col>
              <b-col cols="auto">
                <b-button-group>
                  <b-button @click="modifyBtn(todoItemKey)" variant="secondary"><b-icon icon="pencil-fill" aria-hidden="true"></b-icon><span class="blind"> 할 일 수정하기</span></b-button>
                  <b-button @click="removeTodo(todoItemKey)" variant="dark"><b-icon icon="trash-fill" aria-hidden="true"></b-icon><span class="blind"> 할 일 삭제하기</span></b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-list-group-item>
        </transition-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ['propsData'],
  methods: {
    toggleComplete(todoItem, todoItemKey) {
      this.$emit('toggleItem', todoItem, todoItemKey);
    },
    removeTodo(todoItem, todoItemKey) {
      this.$emit('removeTodoItem', todoItem, todoItemKey);
    },
    modifyTodo(todoItem, todoItemKey) {
      this.$emit('modifyTodo', todoItem, todoItemKey);
    },
    modifyBtn(todoItemKey) {
      this.$emit('modifyBtn', todoItemKey);
      this.$nextTick(() =>
        {
          // if(document.querySelector('__BVID__40'))
          this.$refs['modifyInput' + todoItemKey][0].focus()
          // this.$refs[`modifyInput${todoItemKey}`][0].focus()
          // console.log('나오냐??')
        }
      );
    }
  },
  watch: {
    
  }
}
</script>

<style>
.lineThrough {
  text-decoration: line-through;
  color: #bbb;
}
.completeBtn {
  display: inline-block;
  width: 50px;
  margin-right: 15px;
}

.list-group-item + .list-group-item {
  margin-top: 6px;
  border-top-width: 1px
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.blind {
  font-size: 0;
  opacity: 0;
  position: absolute;
}
</style>