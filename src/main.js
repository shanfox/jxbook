// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Home from './components/Home'
import Main from './components/Main'
import Show from './components/Show'
import Add from './components/Add'
import Comment from './components/Comment'
import $ from 'jquery'


Vue.config.productionTip = false
Vue.use(VueRouter)

Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}



//配置路由
const router = new VueRouter({
    //history: false,
    //hashbang: true,
    routes: [
        { path: "", name: "Home", component: Home },
        { path: "/show/:id", name: "Show", component: Show },
        { path: "/add", name: "Add", component: Add },

    ],
    //mode: "history",
    // routes: [
    //     { path: '/', redirect: '/home' },
    //     {
    //         path: '/home',
    //         name: 'home',
    //         title: '首页',
    //         component: Home,
    //         children: [{
    //             path: '',
    //             name: 'main1',
    //             title: '书籍首页',
    //             component: Main
    //         }, {
    //             path: 'show/:id',
    //             name: 'show1',
    //             title: '书籍详细页面',
    //             component: Show,
    //             children: [{
    //                 path: '',
    //                 name: 'comment1',
    //                 title: '书籍评论页面',
    //                 component: Comment,
    //             }]
    //         }]
    //     },
    //     {
    //         path: '/admin',
    //         name: 'admin',
    //         title: '后台',
    //         component: Admin,
    //         children: [{
    //             path: '',
    //             name: 'main2',
    //             title: '书籍首页',
    //             component: Main
    //         }, {
    //             path: 'add',
    //             name: 'add',
    //             title: '添加数据',
    //             component: Add
    //         }, {
    //             path: 'show/:id',
    //             name: 'show2',
    //             title: '书籍详细页面',
    //             component: Show,
    //             children: [{
    //                 path: '',
    //                 name: 'comment2',
    //                 title: '书籍评论页面',
    //                 component: Comment,
    //             }]
    //         }]
    //     }
    // ],
    //
})

/* eslint-disable no-new */
new Vue({
    router,
    el: '#app',
    components: { App },
    template: '<App/>'
})