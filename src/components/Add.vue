<template>
    <div class="add">
        <div class="show">
            <div class="show_home"><router-link to="/admin">返回首页</router-link></div>
            <div class="show_nei">
                <table>
                    <tr>
                        <td>书名：</td>
                        <td>
                            <input type="text" name="" id="bookName" v-model.trim="bookName">
                        </td>
                    </tr>
                    <tr>
                        <td>编号：</td>
                        <td>
                            <input type="text" name="" id="bookNo" v-model.trim="bookNo">
                        </td>
                    </tr>
                    <tr>
                        <td>类别：</td>
                        <td>
                            <select name="" id="bookClass" v-model.trim="bookClass">
                                <option disabled value="0">请选择</option>
                                <option value="综合">综合</option>
                                <option value="管理">管理</option>
                                <option value="市场">市场</option>
                                <option value="美术">美术</option>
                                <option value="技术">技术</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>时间：</td>
                        <td>
                            <input type="date" name="" id="bookAddTime" v-model.trim="bookAddTime">
                        </td>
                    </tr>
                    <tr>
                        <td>作者：</td>
                        <td>
                            <input type="text" name="" id="bookAuthor" v-model.trim="bookAuthor">
                        </td>
                    </tr>
                    <tr>
                        <td>简介：</td>
                        <td>
                            <textarea name="" id="bookDesc" v-model.trim="bookDesc" cols="100" rows="10"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>图片：</td>
                        <td>
                            <input @change="fileImage" type="file" accept="image/jpeg,image/x-png,image/gif" id="" value="">
                        </td>
                    </tr>
                    <tr>
                        <td>价格：</td>
                        <td>
                            <input type="text" name="" id="bookPrice" v-model.trim="bookPrice">
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button @click="tijiao" :disabled="aa">提交</button>
                        </td>
                    </tr>

                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header'
import Banner from './Banner'
import axios from 'axios';
export default {
    name: 'add',
    components: {
        "app-header": Header,
        Banner,
        Comment
    },
    data () {
        return {
            bookName: '',
            bookNo: '',
            bookClass: 0,
            bookAddTime: '',
            bookAuthor: '',
            bookDesc: '',
            bookPrice: '',
            bookImg: '',
            power: 0
        }
    },
    methods: {
        fileImage(e){
            var that=this;
            var file = e.target.files[0];
            var imgSize=file.size/1024;
            if(imgSize>200){
                alert('请上传大小不要超过200KB的图片')
            }else{
                var reader = new FileReader();
                reader.readAsDataURL(file); // 读出 base64
                reader.onloadend = function () {
                    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
                    that.bookImg = reader.result;
                }
            }
        },
        tijiao(){
            var params = new URLSearchParams();
            params.append('a', 1);
            params.append('bookName', this.bookName);
            params.append('bookNo', this.bookNo);
            params.append('bookClass', this.bookClass);
            params.append('bookAddTime', this.bookAddTime);
            params.append('bookAuthor', this.bookAuthor);
            params.append('bookDesc', this.bookDesc);
            params.append('bookPrice', this.bookPrice);
            params.append('bookImg', this.bookImg);
            axios({
                method: 'post',
                url: '/api/server.ashx',
                data: params
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            }); 
        }
    },
    mounted(){
        axios.get('/api/server.ashx',{
            params: {
                a: 10
            }
        })
        .then((res)=>{
            localStorage.setItem('power', res.data);
        });
    },
    computed: {
        aa: function(){
            if(!this.bookName || !this.bookNo || !this.bookClass || !this.bookAddTime || !this.bookAuthor || !this.bookDesc || !this.bookPrice || !this.bookImg ){
                return true;
            }else{
                return false;
            }
        }
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.show { width: 1100px; margin: 25px auto; }
.show_home { height: 40px; text-align: right; font-weight: 600; padding-right: 40px;}

table td { padding: 5px 0;}
input[type="text"] { padding: 4px 5px;}
select { padding: 4px 5px;}
button { padding: 5px 20px;}

</style>
