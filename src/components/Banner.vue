<template>
    <div class="banner">
        <ul class="banner_bg">
            <template v-for="(slide,index) in slides">
                <li :class="{current: index==nowIndex?true:false}" :style="{backgroundImage:'url('+slide.src+')'}"></li>
            </template>
        </ul>
        <div id="jdt">
            <div class="con" :style="{width: Swidth + '%'}"></div>
        </div>
    </div>
</template>


<script>

import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
export default {
    name: 'banner',
    data () {
        return {
            p1: p1,
            slides: [
                {src: p1},
                {src: p2}
            ],
            nowIndex: 0,
            inv: 3000,
            invId: null,
            Swidth: 0
        }
    },
    methods: {
        runInv() {
            this.invId = setInterval(() => {
                this.nowIndex = this.nextIndex;
            }, this.inv);
        },
        clearInv() {
            clearInterval(this.invId);
        }
    },
    mounted() {
        this.runInv();
    },
    computed: {
        nextIndex() {
            if(this.nowIndex === this.slides.length-1) {
                return 0;
            }else {
                return this.nowIndex + 1;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner{ width: 100%; position:relative; height:150px; clear:both; overflow:hidden;}

.banner_bg{ width:100%; min-width:1000px; height:150px; margin:0 auto; text-align:center; overflow:hidden;}
.banner_bg li{ width:100%; height:220px; background-position: center 0; background-repeat: no-repeat; display: none;}
.banner_bg li.current{ display:block;}
.banner_bg li.currento{ display:none;}


#jdt{ position:absolute; width:100%; height:5px; font-size:0px; z-index:2; top:53px;}
#jdt .con{ width:0%; height:5px; font-size:0px; background:#FFF; opacity:0.6;}
</style>
