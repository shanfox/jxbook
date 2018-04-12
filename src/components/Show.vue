<template>
    <div id="show">
        <div class="show">
            <div class="show_home">
                <span v-if="power"><router-link to="/admin">返回首页</router-link></span>
                <span v-else><router-link to="/home">返回首页</router-link></span></div>
            <div class="show_nei">
                <div><img src="../assets/1.jpg" /></div>
                <ul class="show_ul">
                    <li>书名：{{lists.bookName}}</li>
                    <li>类型：{{lists.bookClass}}</li>
                    <li>时间：{{lists.bookAddTime}}</li>
                    <li>作者：{{lists.bookAuthor}}</li>
                    <li>简介：<span v-html="lists.bookDesc"></span></li>
                </ul>
                <button class="wypl" @click="dialog(lists.ID)">我要评论</button>
            </div>
        </div>
        <router-view :comments="comments" :vComment="vComment" :vDate="vDate"></router-view>
        <!-- <Comment :comments="comments" :vComment="vComment" :vDate="vDate"></Comment> -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'show',
    props: ['vComment','vDate','power'],
    //props: ['inputValue','inputDate'],
    // components: {
    //     Comment
    // },
    data () {
        return {
            showId: this.$route.params.id,
            lists: {},
            comments: []
        }
    },
        mounted: function(){
        this.getShow();
        Date.prototype.format = function(fmt) { 
            var o = { 
                "M+" : this.getMonth()+1,                 //月份 
                "d+" : this.getDate(),                    //日 
                "h+" : this.getHours(),                   //小时 
                "m+" : this.getMinutes(),                 //分 
                "s+" : this.getSeconds(),                 //秒 
                "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                "S"  : this.getMilliseconds()             //毫秒 
            }; 
            if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt; 
        }
    },
    methods: {
        commentList(){
            axios.get('/api/server.ashx', {
                params: {
                    a: 7,
                    id: this.lists.ID
                }
            })
            .then((res) => {
                this.comments = res.data;
                console.log(this.comments);
            })
            .catch((error)=> {
                console.log(error);
            });
        },
        getShow(){
            axios.get('/api/server.ashx', {
                params: {
                    a: 5,
                    id: this.showId
                }
            })
            .then((res) => {
                this.lists = res.data;
                if(this.lists.ID){
                    this.commentList();
                }
            })
            .catch((error)=> {
                console.log(error);
            });
        },
        dialog(id){
            $('#appDiv2').show();
            $('#id2').val(id);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,li { padding: 0; margin: 0; list-style: none;}
.show { width: 1100px; margin: 25px auto; }
.show_home { height: 40px; text-align: right; font-weight: 600; padding-right: 40px;}
.show_nei { clear: both; overflow: hidden; position: relative;}
.wypl { padding: 5px 20px; position: absolute; bottom: 0; right: 0; cursor: pointer;}
.show_nei img { width: 380px; float: left;}
.show_nei .show_ul { width: 680px; float: right;}
.show_ul li { height: 32px; line-height: 32px; clear: both; overflow: hidden;}
.show_ul li.btns { height: 40px; margin-top: 10px; margin-left: 48px;}
.show_ul li.btns button { padding: 4px 20px; font-size: 14px;}


</style>
