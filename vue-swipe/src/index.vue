<template>
    <div class="swipe" ref="swipe">
        <div class="wrapper" ref="wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data() {
            return {
                moveTimer: null,
                swipeLen: 0,
                translateRange: 0,
                swipeIndex:1
            }
        },
        props:{
            speed: {
                type: Number,
                default: 3000
            },
            col: {
                type: Boolean,
                default: false
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.init();
            })
        },
        methods:{
            init() {
                let obj = this.$refs.wrapper;
                this.swipeLen = obj.childNodes.length;
                obj.appendChild(obj.childNodes[0].cloneNode(true));
                this.translateRange = this.col ? obj.getBoundingClientRect()[this.col ? "height" : "width"]/(this.swipeLen+1) : obj.getBoundingClientRect()[this.col ? "height" : "width"];
                if(this.col){
                    this.$refs.swipe.style["height"] = `${this.translateRange}px`;
                }else{
                    this.$refs.wrapper.childNodes.forEach(nodeObj => {
                        nodeObj.className += " swipe-item";
                    })
                }
                this.move();
            },
            move() {
                if (this.moveTimer) {
                    return;
                }
                let obj = this.$refs.wrapper;
                this.moveTimer = setInterval(() => {
                    obj.style.transition = "transform 0.3s ease";
                    obj.style.webkitTransform = this.col ? `translate3d(0, ${-this.swipeIndex*this.translateRange}px, 0)` : `translate3d(${-this.swipeIndex*this.translateRange}px, 0, 0)`;
                    if(this.swipeIndex == this.swipeLen){
                        this.swipeIndex = 1;
                        let timer = setTimeout(() => {
                            clearTimeout(timer);
                            obj.style.transition = "transform 0s ease";
                            obj.style.webkitTransform = `translate3d(0, 0, 0)`
                        }, 300)
                    }else{
                        this.swipeIndex++;
                    }


                }, this.speed)
            }
        }
    }
</script>
<style scoped>
    .swipe{
        width:100%;
        overflow: hidden;
    }
    .swipe .wrapper{
        word-break:keep-all;
        white-space:nowrap;
        position:relative;
        width:100%;
    }
    .swipe-item{
        display:inline-block;
        width:100%;
    }
</style>
