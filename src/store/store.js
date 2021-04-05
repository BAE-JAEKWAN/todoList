import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storege = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            // this.todoItems = localStorage.getItem('listData');
            this.todoItems = [];
            const localStorageData = localStorage.getItem('listData');
            arr.push(JSON.parse(localStorageData));
    
            // this.todoItems.push(JSON.parse(localStorage.getItem('listData')));
            // 변수 선언을 var에서 let으로 바꾼 이유 : 반복문은 값이 올라가야 하기 때문에 let으로 선언 해야 된다.
            // for (let i = 0; i < localStorage.length; i ++) {
            //   if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
            //   this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            //   }
            // }
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        todoItems: storege.fetch()
    }
});