<template>
    <div class="comment">
        <ul>
            <li v-for="(data,index) in newLists" :key="data.ID">
                <p>{{index+1}}楼 <span>{{data.commentTime}}</span></p>
                <p>{{data.commentDesc}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'comment',
  props: ['vComment','vDate','comments'],
  data () {
    return {
        
    }
  },
  computed: {
      newLists: function(){
          if(this.vComment){
            this.comments.unshift({commentDesc:this.vComment,commentTime:this.vDate});
            return this.comments;
          }else{
              return this.comments;
          }
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,li { list-style: none; margin: 0; padding:0;}
.comment { width:1100px; margin:0 auto; border-top: 10px solid #333; }
.comment ul li { margin: 10px 0; border-bottom:1px dotted #333; overflow: hidden; padding: 10px;}
.comment ul li span { float:right; font-size: 13px; color:#ccc;}
.comment ul li p:nth-child(1) { margin-bottom: 15px;}

</style>
