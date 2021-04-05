<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <b-input-group>
                    <b-form-input placeholder="할 일을 입력하세요" v-model="newTodoItem" @keyup.enter="addTodo(newTodoItem)" />
                    <b-input-group-append>
                        <b-button variant="info" @click="addTodo()" class="addTodoBtn"><b-icon icon="gear-fill" aria-hidden="true"></b-icon> 할 일 추가</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <defaultModal v-if="showModal" @close="showModal = false">
            <!--
            you can use custom content here to overwrite
            default content
            -->
            <h3 slot="header">앗 할 일이 없당!</h3>
            <div slot="body">할 일을 입력해주세요.</div>
            <div slot="footer">
                <b-button @click="showModal=false">닫기</b-button>
            </div>
        </defaultModal>
    </b-container>
</template>

<script>
import defaultModal from './common/defaultModal.vue'

export default {
    data(){
        return {
            newTodoItem: '',
            showModal: false
        }
    },
    methods: {
        addTodo() {
            if(this.newTodoItem !== '') {
                this.$emit('addTodoItem', this.newTodoItem)
                this.clearInput();
            } else {
                // this.$refs['modal-1'].show()
                this.showModal = !this.showModal
            }
        },
        clearInput() {
            this.newTodoItem = '';
        }
    },
    components: {
        defaultModal
    }
}
</script>

<style scoped>
    .addTodoBtn:hover .b-icon,
    .addTodoBtn:focus .b-icon {
        animation: b-icon-animation-spin 1.5s linear infinite normal;
    }
</style>