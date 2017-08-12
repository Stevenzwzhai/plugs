<template>
    <div id="yg-img">
        <div class="wrap">
            <div class="header">
                {{title}}
                <span class="close" @click.stop="close">&times;</span>
            </div>
            <div class="container">
                <div class="img-show">
                    <div class="img-show-content" ref="img-show">
                        <span ref="img-obj" dragable="true">
                            <img :src="currentImg.url" dragable="true" data-target="yg-img" @dragstart="startDrag($event)" @drag="drag($event)" @dragend="endDrag($event)" alt="">
                        </span>
                    </div>
                    <div class="img-show-btn">
                        <button type="button" @click="rotateLeft">left rotate</button>
                        <button type="button" @click="rotateRight">right rotate</button>
                        <button type="button" @click="enlarge">scale+</button>
                        <button type="button" @click="reduce">scale-</button>
                    </div>
                </div>
                <div class="img-list">
                    <ul>
                        <li v-for="(img, index) in imgList" :class="{on:index==currentImg.index}" @click.stop="changeImg(img, index, $event)">
                            <img :src="img.url" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"yg-img",
        props:{
            title:{
                type:String,
                default:function () {
                    return "图片查看";
                }
            },
            imgList:{
                type: Array,
                require: true
            },
            show:{
                type:Boolean,
                default:function(){
                    return false;
                }
            }
        },
        watch:{
            show：function(val){
                if(val){
                    this.show();
                }else{
                    this.hide();
                }
            }
        },
        created(){
            
            this.$nextTick(() =>{
                let height = this.$refs['img-show'].offsetHeight;
                this.currentImg = Object.assign({index:0}, this.imgList[0]);
            })
        },
        data (){
            return {
                currentImg:{},
                leftIndex:0,
                rightIndex:0,
                rotateIndex:0,
                scaleIndex:1,
                imgHeight:"",
                imgWidth:"",
                containerWidth:"",
                containerHeight:"",
                canDrag:false,
                isDown:false,
                startPos:{},
                translatex:0,
                translatey:0
            }
        },
        mounted(){
            //$nextTick并不能准确输出
            let timer = setTimeout(() => {
                clearTimeout(timer);
                let imgObj = this.$refs['img-obj'];
                this.imgHeight = imgObj.offsetHeight;
                this.imgWidth = imgObj.offsetWidth;
                this.containerHeight = this.$refs['img-show'].offsetHeight;
                this.containerWidth = this.$refs['img-show'].offsetWidth;
                this.translatex = this.getTransform()[4];
                this.translatey = this.getTransform()[5];
            },0)
        },
        methods:{
            changeImg(img, index, event){
                if(this.currentImg.index == index){
                    return;
                }
                let imgObj = this.$refs['img-obj'];
                imgObj.style.webkitTransform = `rotate(0deg) translate(-50%, -50%) scale(1)`;
                this.leftIndex = 0;
                this.rightIndex = 0;
                this.rotateIndex = 0;
                this.scaleIndex = 1;
                this.currentImg = Object.assign({index:index},img);
                this.getTransform();
                this.translatex = this.getTransform()[4];
                this.translatey = this.getTransform()[5];
            },
            getTransform(){
                let st = window.getComputedStyle(this.$refs['img-obj'],null).getPropertyValue("-webkit-transform")||window.getComputedStyle(this.$refs['img-obj'],null).getPropertyValue("transform");

                let pattern = new RegExp("\\(((.| )+?)\\)","igm");

                let target = pattern.exec(st)[1];
                return target.split(',');
            },
            setTransform(pos){
                let imgObj = this.$refs['img-obj'];
                let previousValue = this.getTransform();
                pos?null:imgObj.style.webkitTransform = `rotate(${90*this.rotateIndex}deg) scale(${1+0.5*this.scaleIndex})`;
                let nextValue = this.getTransform();
                nextValue[4] = pos?pos.x+Number(this.translatex):previousValue[4];
                nextValue[5] = pos?pos.y+Number(this.translatey):previousValue[5];
                this.$refs['img-obj'].style.webkitTransform = `matrix(${nextValue.join(',')})`;
            },
            startDrag(event){
                this.isDown = true;
                this.startPos = {
                    x:event.clientX,
                    y:event.clientY
                }
                console.log(this.getTransform(), this.canDrag);
            },
            drag(event){

                if(!this.isDown){
                    return;
                }
                if(event.clientX==0 || event.clientY==0){
                    return;
                }
                if(this.$refs["img-show"].offsetLeft>event.clientX || this.$refs["img-show"].offsetTop>event.clientY || this.$refs["img-show"].offsetLeft+this.$refs["img-show"].offsetWidth<event.clientX || this.$refs["img-show"].offsetTop+this.$refs["img-show"].offsetHeight<event.clientY){
                    return;
                }
                console.log(12)
                this.setTransform({
                    x:event.clientX - this.startPos.x,
                    y:event.clientY - this.startPos.y
                })
            },
            endDrag(){
                this.isDown = false;
                this.translatex = this.getTransform()[4];
                this.translatey = this.getTransform()[5];
            },
            rotateLeft(){
              
                --this.rotateIndex<-4 ? this.rotateIndex = -1 : null;
               
                this.setTransform();
            },
            rotateRight(){
              
                ++this.rotateIndex>4 ? this.rotateIndex = 1 : null;
               
                this.setTransform();
            },
            enlarge(){
                
                ++this.scaleIndex>8 ? this.scaleIndex = 8 : null;
             
                this.setTransform();
            },
            reduce(){
                --this.scaleIndex<-1 ? ++this.scaleIndex : null;
                this.setTransform();
            },
            close(){
                document.querySelector("#yg-img").style.display = "none";
            },
            show(){
                document.querySelector("yg-img").style.display = "block";
            }
        }
    }
</script>
<style scoped>
    #yg-img{
        position:fixed;
        background-color:rgba(0, 0, 0, 0.4);
        height:100%;
        width:100%;
        line-height:100%;
        top:0;
        z-index:1000;
        text-align:left;
        color:#fff;
    }
    .on{
        border:2px solid #01B8EC !important;
    }
    #yg-img .wrap{
        width:80%;
        height:80%;
        border:1px solid #ccc;
        box-sizing:border-box;
        background-color:#fff;
        margin-left:10%;
        margin-top:5%;
    }
    #yg-img .wrap .header{
        height:36px;
        background-color:#01B8EC;
        width:100%;
        line-height:36px;
        box-sizing:border-box;
        padding:0 15px;
        color:#fff;
        font-size:16px;
        font-weight:bold;
    }
    #yg-img .wrap .header .close{
        float:right;
        font-size:30px;
    }
    #yg-img .wrap .container{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        padding:15px;
        height:95%;
    }
    #yg-img .wrap .container .img-show{
        flex:1;
        height:100%;
        box-sizing:border-box;
        
    }
    #yg-img .wrap .container .img-show .img-show-content{
        height:90%;
        overflow:hidden;
        position:relative;
        border:1px solid #01B8EC;
        box-sizing:border-box;
    }
    #yg-img .wrap .container .img-show .img-show-content span{
        display:inline-block;
        position:absolute;
        max-height:100%;
        max-width:80%;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
    #yg-img .wrap .container .img-show .img-show-content img{
        max-height:100%;
        max-width:100%;
        cursor:move;
    }
    #yg-img .wrap .container .img-show .img-show-btn{
        height:8%;
        margin-top:15px;
        box-sizing:border-bpx;
        padding-left:10px;
        line-height:50px;
    }
    #yg-img .wrap .container .img-show .img-show-btn button{
        height:30px;
        line-height:30px;
        box-sizing:border-box;
        border-radius:2px;
        outline:none;
        border:0;
        width:80px;
        background-color:#01B8EC;
        color:#fff;
        font-size:14px;
        margin-right:15px;
    }
    #yg-img .wrap .container .img-list{
        width:256px;
        box-sizing:border-box;
        padding-left:16px;
        height:100%;
        overflow-Y:scroll;
    }
    #yg-img .wrap .container .img-list li{
        text-align:center;
        display:block;
        height:120px;
        line-height:120px;
        box-sizing:border-box;
        border:1px solid #ccc;
        margin-bottom:10px;
        cursor:pointer;
        overflow: hidden;

    }
    #yg-img .wrap .container .img-list li img{
        max-height:120px;
        max-width:200px;
        vertical-align:middle;
    }

    .ivu-icon-android-refresh:before {
        content: "\F3A8";
    }
</style>
