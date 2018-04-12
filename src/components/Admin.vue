<template>
  <div class="admin">
    <div id="appDiv1" class="appDiv">
        <div class="tc_box">
            <span class="close" @click="close">X</span>
            <h3>借阅</h3>
            <input type="text" name="" id="text" placeholder="请输入借书人名字">
            <input type="hidden" name="" id="index">
            <input type="hidden" name="" id="id">
            
            <button @click="add">提交</button>
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
    
    <router-view :inputValue="vName" :inputDate="vJDate" :power="power" @upup="change" :comments="comments" :vComment="vComment" :vDate="vDate"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './Header'
import Banner from './Banner'
import Main from './Main'

export default {
  name: 'admin',
  //props: ['vComment','vDate','comments'],
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

        axios.get('/api/server.ashx', {
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
            $('#appDiv1').hide();
            $('#text').val('');
            console.log(this.vName);
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
        axios.get('/api/server.ashx', {
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
    close(){
        $('#appDiv').hide();
    },
    change(msg){
      this.vList = msg; 
    },
    close2(){ //评论关闭弹窗
        $('#appDiv2').hide();
    }
  },
  mounted: function(){
      /*
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
      */

      axios.get('/api/server.ashx',{
          params: {
              a: 10
          }
      })
      .then((res)=>{
          this.power = res.data;
          console.log('权限'+this.power);
          if(this.power==0){
              this.$router.push({path:'/home'});  //前端页面
          }else{
              this.$router.push({path:'/admin'});
          }
      });
      
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
* { margin: 0; padding:0;}
a {
  text-decoration: none;
}

.appDiv { width: 100%; height: 100%; position: fixed; background: rgba(0,0,0,0.6); z-index: 999999; display: none;}
.tc_box { width: 500px; height: 180px; background: #fff; transform: translate(-50%,-50%); left: 50%; top: 50%; position: absolute; box-sizing: border-box; padding: 25px 10px 15px; text-align: center;}
.tc_box .close { position: absolute; right: 5px; top: 5px; cursor: pointer;}
.tc_box textarea { padding: 5px; box-sizing: border-box; line-height: 20px;}
.tc_box button { padding: 5px 20px; text-align: center; margin-top: 10px; cursor: pointer;}
.tc_box h3 { text-align: center; margin-bottom: 15px;}
input[type="text"] { padding: 6px 0;}
</style>
