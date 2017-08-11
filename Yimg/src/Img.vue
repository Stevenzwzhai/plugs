<template>
    <div id="yls-img">
        <img :src="imgUrl" alt="">
        <div class="big-img">
            <img :src="imgUrl" alt="">
        </div>
        <!-- <slot name="content" class="content"></slot> -->
    </div>
        
</template>
<script>
    export default{
        name: "yls-img",
        created(){
            console.log(this.width, this.height);
            let key = "yls-img"
            this.$nextTick(() => {
                document.querySelector('#yls-img').style.width=`${this.size}px`;
                document.querySelector('#yls-img').style.height=`${this.size}px`;
                document.querySelector('#yls-img').style.lineHeight=`${this.size}px`;
                document.querySelector('#yls-img img').style.maxWidth=`${this.size-2}px`;
                document.querySelector('#yls-img img').style.maxHeight=`${this.size-2}px`;
            })

        },
        data (){
            return {

            }
        },
        props:{
            imgUrl:{
                type:String,
                required:true
            },
            size: [String, Number]
        }
    }
</script>
<style scoped>
    #yls-img{
        position:relative;
        width:50px;
        text-align:center;
        height:50px;
        line-height:50px;
        vertical-align: bottom;
        display:inline-block;
        box-sizing:border-box;
        border:1px solid #ccc;
        over-flow:hidden;
    }
    #yls-img img{
        max-width:50px;
        vertical-align:middle;
        max-height:50px;
    }
    #yls-img:hover .big-img{
        display:block !important;
    }
    #yls-img .big-img{
        display:none;
        position:absolute;
        width:200px;
        height:200px;
        line-height:200px;
        bottom:0;
        right:-200px;
        background-color:rgba(0, 0, 0,0.3);
        z-index:1000;
    }
    #yls-img .big-img img{
        max-height:200px;
        max-width:200px;
    }
    #yls-img .content{
        text-align:left;
    }

</style>