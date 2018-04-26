<template>
    <div id="home">
        <div id="goTopBtn"></div>
        <div id="appDiv1" class="appDiv">
            <div class="tc_box">
                <span class="close" @click="close">X</span>
                <h3>借 阅</h3>
                <p><input type="text" name="" id="text" placeholder="请输入借书人名字"></p>
                <input type="hidden" name="" id="index">
                <input type="hidden" name="" id="id">
                <p><button @click="add">提交</button></p>
            </div>
        </div>
        <div id="appDiv2" class="appDiv">
            <div class="tc_box">
                <span class="close" @click="close2">X</span>
                <textarea cols="60" rows="4" id="textarea" placeholder="请输入评论"></textarea>
                <input type="hidden" name="" id="id2">
                <button @click="add2">提交</button>
            </div>
        </div>
        <app-header />
        <Banner />
        <!-- <router-view :inputValue="vName" :inputDate="vJDate" :power="power" @upup="change" :comments="comments" :vComment="vComment" :vDate="vDate"></router-view> -->
        <app-main :inputValue="vName" :inputDate="vJDate" :power="power" @upup="change" :comments="comments" :vComment="vComment" :vDate="vDate"></app-main>
    </div>
</template>

<script>
import axios from 'axios';
import Header from './Header'
import Banner from './Banner'
import Main from './Main'

export default {
  name: 'home',
  components: {
    "app-header": Header,
    Banner,
    "app-main": Main,
  },
  data(){
    return {
      vName: '',
      vJDate: '',
      vList: [],
      comments: [],
      vComment: '',
      vDate: '',
      power: 0
    }
  },
  methods: {
    add(){  //借阅提交
        this.vJDate =  new Date().format("yyyy-MM-dd hh:mm:ss");
        this.vName = $('#text').val();
        $('#appDiv1').hide();
        axios.get('server.ashx', {
            params: {
                a: 3,
                u: this.vName,
                id: $('#id').val(),
            }
        })
        .then((res) => {
          if(res.data == 0){
            this.vList[$('#index').val()].bookUser = this.vName;
            this.vList[$('#index').val()].bookState = '借出';
            $('#text').val('');
            alert('借阅成功');
          }else if(res.data == 100){
            alert('借阅人不能为空');
          }
        })
        .catch((error)=> {
            console.log(error);
        });

        
    },
    add2(){ //评论提交
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
                $('#appDiv2').hide();
                $('#textarea').val('')
                alert('评论成功');
            }else if(res.data==100){
                alert('请输入评论内容');
            }
            
        })
        .catch((error)=> {
            console.log(error);
        });
    },
    close(){  //借阅关闭弹窗
        $('#appDiv1').hide();
    },
    change(msg){
      this.vList = msg; 
    },
    close2(){ //评论关闭弹窗
        $('#appDiv2').hide();
    }
  },
  mounted: function(){
      
        axios.get('server.ashx',{
            params: {
                a: 10
            }
        })
        .then((res)=>{
            this.power = res.data;
            // if(this.power==1){
            //     this.$router.push({path:'/admin'});  //前端页面
            // }
        });

        $(window).scroll(function(){
            var sc=$(window).scrollTop();
            var rwidth=$(window).width()
            if(sc>0){
                $("#goTopBtn").css("display","block");
                $("#goTopBtn").css("left",(rwidth-100)+"px")
            }else{
                $("#goTopBtn").css("display","none");
            }
        })
        $("#goTopBtn").click(function(){
            var sc=$(window).scrollTop();
            $('body,html').animate({scrollTop:0},500);
        })
      
      
    }
}
</script>

<style>
#goTopBtn {
    position: fixed;
    line-height: 36px;
    width: 36px;
    bottom: 200px;
    height: 36px;
    cursor: pointer;
    display: none;
    background: url(../assets/top.gif);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 50px;
}
* { margin: 0; padding:0;}
a {
  text-decoration: none;
}

.appDiv { width: 100%; height: 100%; position: fixed; background: rgba(0,0,0,0.6); z-index: 999999; display: none;}
.tc_box { width: 500px; height: 180px; background: #fff; transform: translate(-50%,-50%); left: 50%; top: 50%; position: absolute; box-sizing: border-box; text-align: center;}
.tc_box .close { position: absolute; right: 8px; top: 7px; cursor: pointer; font-size: 20px; color: #fff;}
.tc_box textarea { padding: 5px; box-sizing: border-box; line-height: 20px;}
.tc_box button { padding: 5px 20px; text-align: center; margin-top: 10px; cursor: pointer;}
.tc_box h3 { height: 35px; line-height:35px; text-align: center; margin-bottom: 25px; background: #A0BC7C; color: #fff;}
.tc_box p { margin-bottom: 8px; text-align: center;}
input[type="text"] { padding: 6px 5px;}


</style>
