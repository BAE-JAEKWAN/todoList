<template>
<b-container class="mt-3">
    <b-row align-h="center">
        <b-button variant="danger" size="lg" @click="clearTodo">Clear All</b-button>
    </b-row>
</b-container>
</template>

<script>
export default {
    methods: {
        clearTodo() {
            this.$emit('clearAll')
        }
    }
}
</script>

<style>

</style>