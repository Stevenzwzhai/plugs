/*
    use

    <div style="height:100px;">
        <swipe-col :speed="5000">
            <div v-for="i in 10" style="height:100px;">{{i}}</div>
        </swipe-col>
    </div>

*/

<template>
    <div class="co-swipe-col">
        <div class="wrapper" ref="wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                moveTimer: null,
                swipeLen: 0,
                translateRange: 0,
                index:1
            }
        },
        props:{
            speed: {
                type: Number,
                default: 3000
            }
        },
        mounted(){
            this.$nextTick(() => {
                let obj = this.$refs.wrapper;
                this.swipeLen = obj.childNodes.length+1;
                this.translateRange = obj.getBoundingClientRect().height/obj.childNodes.length;
                obj.appendChild(obj.childNodes[0].cloneNode(true));
                this.move();
            })
        },
        update() {

        },
        methods:{
            move() {
                if (this.moveTimer) {
                    return;
                }
                let obj = this.$refs.wrapper;
                this.moveTimer = setInterval(() => {
                    obj.style.transition = "transform 0.3s ease";
                    obj.style.webkitTransform = `translate3d(0, ${-this.index*this.translateRange}px, 0)`


                    if(this.index == this.swipeLen){
                        this.index = 1;
                        let timer = setTimeout(() => {
                            clearTimeout(timer);
                            obj.style.transition = "transform 0s ease";
                            obj.style.webkitTransform = `translate3d(0, 0, 0)`
                        }, 300)
                    }else{
                        this.index++;
                    }


                }, this.speed)
            }
        }
    }
</script>
<style scoped lang="scss">
    .co-swipe-col{
        height:100%;
        width:100%;
        overflow: hidden;
    }
</style>
