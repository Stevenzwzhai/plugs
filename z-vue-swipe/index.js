import swipe from './src/index'
import Vue from 'vue'

swipe.install = Vue => Vue.components('swipe', swipe);

export default swipe