<template>
    <div class="main">
        <div class="search-box">
            <div>
                图书状态：
                <select v-model="bookState">
                    <option value="0">请选择</option>
                    <option value="在册">在册</option>
                    <option value="借出">借出</option>
                </select>
            </div>
            <div>
                图书类型：
                <select v-model="bookType">
                    <option value="0">请选择</option>
                    <option value="综合">综合</option>
                    <option value="管理">管理</option>
                    <option value="市场">市场</option>
                    <option value="美术">美术</option>
                    <option value="技术">技术</option>
                </select>
            </div>
            <div>
                <span v-if="power"><input type="text" placeholder="书名或借书人" v-model.trim="bookTxt" /></span>
                <span v-else><input type="text" placeholder="书名或作者" v-model.trim="bookTxt" /></span>
            </div>
            <div>
                <input type="button" value="搜索" @click="search(bookState,bookType)" />
            </div>
        </div><!--#end search_box-->

        <div v-show="power" class="adminnav">
            <router-link class="link" to="/add">添加书籍</router-link>
        </div>

        <div class="table-box">
            <table class="tab">
                <tr>
                    <th width="80">编号</th>
                    <th width="80">类型</th>
                    <th>书名<span style="font-size:13px">(超链接)</span></th>
                    <th width="170">作者</th>
                    <th width="120">入库时间</th>
                    <th width="80">图书状态</th>
                    <th width="80" v-show="power">编辑</th>
                </tr>
                <tr v-for="(list,index) in lists" :key="list.bookID">
                    <td>{{list.bookNo}}</td>
                    <td>{{list.bookClass}}</td>
                    <td class="name">
                        <!-- <span @click="goShow(list.ID)">{{list.bookName}}</span> -->
                        <router-link class="link" :to="{ path: '/show/'+list.ID }">{{list.bookName}}</router-link>
                        <!-- <span v-if="power"><router-link class="link" :to="{ path: '/admin/show/'+list.ID }">{{list.bookName}}</router-link></span>
                        <span v-else><router-link class="link" :to="{ path: '/home/show/'+list.ID }">{{list.bookName}}</router-link></span> -->
                        <div class="dialog">
                            简介：{{list.bookDesc}}
                        </div>
                    </td>
                    <td>{{list.bookAuthor}}</td>
                    <td>{{list.bookAddTime}}</td>
                    <td>{{list.bookUser}}</td>
                    <td v-show="power">
                        <span v-if="list.bookState=='在册'"><button @click="dialog(list.ID,index)">借阅</button></span>
                        <span v-else><button @click="reback(list.ID,index)">归还</button></span>
                    </td>
                </tr>
            </table>
        </div><!--#end table_box-->
    </div>
</template>

<script>
import axios from 'axios';
var tmp = null;
export default {
    name: 'main2',
    props: ['inputValue','inputDate','power'],
    data () {
        return {
            bookState: 0,
            bookType: 0,
            bookTxt: '',
            lists: [],
            lists2: [],
            newLists1: [],
            newLists2: [],
            lists3: []
        }
    },
    methods: {
        jiazai(){
            axios.get('server.ashx', {
                params: {
                    a: 2
                }
            })
            .then((res) => {
                this.lists = res.data;
                //console.log('书籍列表：'+this.lists);
                tmp = this.lists;
            })
            .catch((error)=> {
                console.log(error);
            });
        },
        choose(){
            console.log(this.selected);
        },
        goShow(id){
            this.$router.push({ path: 'show/'+id });
        },
        goAdd(id){
            this.$router.push({ name: 'Add', params: { id: id }});
        },
        search(bookstate,booktype){
            this.lists = [];
            this.lists2 = [];
            
            if(bookstate!=0 && booktype==0){
                for(var i=0;i<tmp.length;i++){
                    if(tmp[i].bookState == bookstate){
                        this.lists.push(tmp[i]);
                    }
                }
                this.limit();
            }else if(bookstate!=0 && booktype!=0){
                for(var i=0;i<tmp.length;i++){
                    if(tmp[i].bookState == bookstate){
                        this.lists.push(tmp[i]);
                    }
                }
                for(var i=0;i<this.lists.length;i++){
                    if(this.lists[i].bookClass == booktype){
                        this.lists2.push(this.lists[i]);
                    }
                }
                this.lists = this.lists2;
                this.limit();
            }else if(booktype!=0 && bookstate==0){
                for(var i=0;i<tmp.length;i++){
                    if(tmp[i].bookClass == booktype){
                        this.lists.push(tmp[i]);
                    }
                }
                this.limit();
            }else if(booktype==0 && bookstate==0){
                this.lists = tmp;
                this.limit();
            }
        },
        limit: function(){
            this.lists3 = [];
            for(var i=0;i<this.lists.length;i++){
                if(this.power){
                    if(this.lists[i].bookName.indexOf(this.bookTxt)!=-1 || this.lists[i].bookUser.indexOf(this.bookTxt)!=-1){
                        this.lists3.push(this.lists[i]);
                    }
                }else{
                    if(this.lists[i].bookName.indexOf(this.bookTxt)!=-1 || this.lists[i].bookAuthor.indexOf(this.bookTxt)!=-1){
                        this.lists3.push(this.lists[i]);
                    }
                }
            }
            this.lists = this.lists3;
        },
        dialog(id,index){
            $('#appDiv1').show();
            $('#index').val(index);
            $('#id').val(id);
            this.$emit('upup',this.lists); //主动触发upup方法，'hehe'为向父组件传递的数据
        },
        reback(num,index){
            axios.get('server.ashx', {
                params: {
                    a: 4,
                    id: num
                }
            })
            .then((res) => {
                this.lists[index].bookState = '在册';
                this.lists[index].bookUser = '在册';
            })
            .catch((error)=> {
                console.log(error);
            });
            
        }
    },
    mounted: function(){
        this.jiazai();
        //setInterval(this.jiazai,1000)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adminnav { margin: 0 auto 15px;}
button { padding: 4px 15px;}
.main { width: 1100px; margin: 0 auto;}
.search-box { width: 660px; display: flex; align-items:center; margin: 25px auto; text-align: center; font-weight: 600;}
.search-box div { margin-right: 10px;}
select { padding: 4px 5px;}
input[type="text"] { padding: 3px 5px; width: 200px;}
input[type="button"] { padding: 3px 20px;}
.tab { table-layout: fixed; border-collapse: collapse; border: none; width: 100%; box-sizing: border-box;}
.tab td,.tab th { border: 1px solid #666; padding: 10px 0; text-align: center; position: relative;}
/* td.name:hover .dialog { display:block } */
td.name:hover { color: red; cursor: pointer;}
.dialog { position: absolute; z-index: 1; display: none; width: 200px; border: 1px solid #222; left: 100%; top: 0px; padding: 10px; background: #fff; text-align: left; font-size: 14px; line-height: 20px;}
.link { color: #66BB06;}

</style>
