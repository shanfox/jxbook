<template>
    <div class="add">
        <app-header />
        <Banner />
        <div class="show">
            <div class="show_home"><router-link to="/">返回首页</router-link></div>
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
                                <option value="综合类">综合类</option>
                                <option value="管理类">管理类</option>
                                <option value="市场类">市场类</option>
                                <option value="美术类">美术类</option>
                                <option value="技术类">技术类</option>
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
                            <input @change="fileImage" type="file" accept="image/jpeg,image/x-png,image/gif" id="bookImg" value="">
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
            if(imgSize>10240){
                alert('请上传大小不要超过10240KB的图片')
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
            //console.log(this.bookImg);
            var that = this;
            var params = new URLSearchParams();
            params.append('a', 1);
            params.append('bookName', that.bookName);
            params.append('bookNo', that.bookNo);
            params.append('bookClass', that.bookClass);
            params.append('bookAddTime', that.bookAddTime);
            params.append('bookAuthor', that.bookAuthor);
            params.append('bookDesc', that.bookDesc);
            params.append('bookPrice', that.bookPrice);
            params.append('bookImg', that.bookImg);
            axios({
                method: 'post',
                url: 'server.ashx',
                data: params
            })
            .then(function (res) {
                console.log(res);
                if(res.data==0){
                    alert('添加成功');
                    that.bookName = that.bookNo = that.bookAddTime = that.bookAuthor = that.bookDesc = that.bookPrice = '';
                    $('#bookImg').val('');
                    that.bookClass = 0;
                }else if(res.data==103){
                    alert('此书已添加');
                }else if(res.data==102){
                    alert('图片上传失败');
                }else if(res.data==200){
                    alert('添加失败，请联系管理员');
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
        }
    },
    mounted(){
        axios.get('server.ashx',{
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
