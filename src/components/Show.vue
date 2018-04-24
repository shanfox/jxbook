<template>
    <div id="show">
        <div id="appDiv2" class="appDiv">
            <div class="tc_box">
                <span class="close" @click="close2">X</span>
                <textarea id="textarea" placeholder="请输入评论"></textarea>
                <input type="hidden" name="" id="id2">
                <button @click="add2">提交</button>
            </div>
        </div>
        <app-header />
        <Banner />
        <div class="show">
            <div class="show_home">
                <span><router-link to="/">返回首页</router-link></span></div>
            <div class="show_nei">
                <!-- <div><img src="../assets/1.jpg" /></div> -->
                <!-- <div><img :src="'/api/'+lists.bookImg" width="350" height="350" /></div> -->
                <div><img :src="lists.bookImg" width="350" height="350" /></div>
                <table class="show_ul">
                    <tr>
                        <th>书名：</th>
                        <td>{{lists.bookName}}</td>
                    </tr>
                    <tr>
                        <th>类型：</th>
                        <td>{{lists.bookClass}}</td>
                    </tr>
                    <tr>
                        <th>时间：</th>
                        <td>{{lists.bookAddTime}}</td>
                    </tr>
                    <tr>
                        <th>作者：</th>
                        <td>{{lists.bookAuthor}}</td>
                    </tr>
                    <tr>
                        <th>简介：</th>
                        <td><span v-html="lists.bookDesc"></span></td>
                    </tr>
                </table>
                <button class="wypl" @click="dialog(lists.ID)">我要评论</button>
            </div>
        </div>
        <!-- <router-view :comments="comments" :vComment="vComment" :vDate="vDate"></router-view> -->
        <Comment :comments="comments" :vComment="vComment" :vDate="vDate"></Comment>
    </div>
</template>

<script>
import axios from 'axios';
import Comment from './Comment';
import Header from './Header'
import Banner from './Banner'
export default {
    name: 'show',
    //props: ['vComment','vDate','power'],
    //props: ['inputValue','inputDate'],
    components: {
        "app-header": Header,
        Banner,
        Comment
    },
    data () {
        return {
            showId: this.$route.params.id,
            lists: {},
            comments: [],
            vComment: '',
            vDate: ''
        }
    },
    mounted: function(){
        this.getShow();
        //setInterval(this.getShow,1000)
    },
    methods: {
        commentList(){
            axios.get('server.ashx', {
                params: {
                    a: 7,
                    id: this.lists.ID
                }
            })
            .then((res) => {
                this.comments = res.data;
            })
            .catch((error)=> {
                console.log(error);
            });
        },
        getShow(){
            axios.get('server.ashx', {
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
        },
        add2(){ //评论提交
            $('#appDiv2').hide();
            axios.get('server.ashx', {
                params: {
                    a: 6,
                    id: $('#id2').val(),
                    c: $('#textarea').val()
                }
            })
            .then((res) => {
                if(res.data==0){
                    this.vDate =  new Date().format("yyyy-MM-dd hh:mm:ss");
                    this.vComment = $('#textarea').val();
                    $('#textarea').val('')
                    alert('评论成功');
                    this.getShow();
                }else if(res.data==100){
                    alert('请输入评论内容');
                }
                
            })
            .catch((error)=> {
                console.log(error);
            });
        },
        close(){
            $('#appDiv').hide();
        },
        change(msg){
            this.vList = msg; 
        },
        close2(){ //评论关闭弹窗
            $('#appDiv2').hide();
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
.show_nei .show_ul th { width: 70px; vertical-align: top; padding: 5px 0; line-height: 25px;}
.show_nei .show_ul td { vertical-align: top; padding: 5px 0; line-height: 25px;}
.show_ul li { min-height: 32px; line-height: 32px; clear: both; overflow: hidden;}
.show_ul li.btns { height: 40px; margin-top: 10px; margin-left: 48px;}
.show_ul li.btns button { padding: 4px 20px; font-size: 14px;}

.appDiv { width: 100%; height: 100%; position: fixed; background: rgba(0,0,0,0.6); z-index: 999999; display: none;}
.tc_box { width: 500px; height: 180px; background: #fff; transform: translate(-50%,-50%); left: 50%; top: 50%; position: absolute; box-sizing: border-box; padding: 25px 10px 15px; text-align: center;}
.tc_box .close { position: absolute; right: 5px; top: 5px; cursor: pointer;}
.tc_box textarea { width: 460px; height: 90px; margin: 0 auto; padding: 5px; box-sizing: border-box; line-height: 20px;}
.tc_box button { padding: 5px 20px; text-align: center; margin-top: 10px; cursor: pointer;}
.tc_box h3 { text-align: center; margin-bottom: 15px;}
input[type="text"] { padding: 6px 0;}

</style>
