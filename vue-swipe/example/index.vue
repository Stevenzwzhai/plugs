<template>
    <div id="app">
        <swipe :speed="1000" :col="col">
            <div v-for="i in 3">{{i}}</div>
        </swipe>
        <button @click="col=!col">change</button>
    </div>
</template>

<script>
    import swipe from './swipe'
    export default {
        name: 'app',
        data() {
            return {
                col:true
            }
        },
        components: {
            swipe
        },
        mounted(){
        }
    }
</script>