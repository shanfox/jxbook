<template>
    <header id="top">
        <div class="dTop">
            <a href="http://jx.sdo.com" target="_blank" class="aLogo png24">锦天科技</a>
            <ul class="ulNav">
                <li class="liMore"><a href="http://jx.sdo.com" target="_blank">锦星官网</a></li>
                <li class="liMore"><a href="http://corp.sdo.com" target="_blank">盛大游戏员工平台</a></li>
                <li class="liMore"><a href="http://10.226.32.23" target="_blank">锦星作业平台</a></li>
                <li class="liMore"><a href="http://10.226.32.23/jt" target="_blank">锦星万事通</a></li>
            </ul>
        </div>
    </header><!--#end header-->
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,li { list-style: none; margin: 0; padding:0;}
header {/*position:fixed;top:0;left:0;*/width:100%;height:53px;background:#363435;}
header .dTop {position:relative;width:1100px;height:53px;margin:0 auto;background:#363435;z-index:3;}
header .dTop .aLogo {float:left;width:235px;height:53px;overflow:hidden;background:#363435 url(../assets/logo.jpg) no-repeat left center;text-indent:-9999px;-webkit-transition:all .2s ease-in; margin-left:35px;}
header .dTop .aLogo:hover {background-color:#363435;}

header .dTop .ulNav {float:left;height:53px; width:700px;}
header .dTop .ulNav li {float:left;padding:0 25px;}
header .dTop .ulNav li.li_r {background:none}
header .dTop .ulNav li a {display:inline-block;height:47px;overflow:hidden;padding:0 10px;border-bottom:6px solid #363435;line-height:53px;font-size:16px;color:#D6D3D3;
-webkit-transition:all .2s ease-in;
font-weight:600;
}
header .dTop .ulNav li a:hover,header .dTop .ulNav li.current a{border-color:#b5101b;color:#fff;text-decoration:none;}
</style>
