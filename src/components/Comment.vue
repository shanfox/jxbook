<template>
    <div class="comment">
        <ul>
            <li v-for="(data,index) in comments" :key="data.ID">
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
    computed: {
        // newLists(){
        //     if(this.vComment){
        //         var tmp = {'commentDes':this.vComment,'commentTime':this.vDate}
        //         if(this.comments.length>0){
        //             this.comments.unshift(tmp);
        //         }else{
        //             this.comments.push(tmp);
        //         }
        //     }
        //     return this.comments;
        // }  
    },
    mounted() {
        console.log(this.comments.length);
        console.log(this.comments);
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
