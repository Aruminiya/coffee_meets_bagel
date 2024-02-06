<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<script>

import axios from 'axios';
import VueAxios from 'vue-axios'

export default{
    data(){
        return{
            message:'產品列表',
            api:{
            url : 'https://vue3-course-api.hexschool.io/v2',
            api_path : 'florafirstapi'
            },
            productList:[],
        }
    },
    methods:{

    },
    mounted(){
        axios.get(`${this.api.url}/api/${this.api.api_path}/products/all`)
        .then((res)=>{
            //this.changeIsLoadingStatus();
            this.productsList = res.data.products
            console.log(this.productsList)
        })
    }
}



</script>

<template>
<div class='container'>
    <nav class='row pt-5'>
        <div class='d-flex justify-content-between flex-column-reverse flex-lg-row'>
        <ul class='d-flex col-lg-5 justify-content-between'>
            <li style='list-style:none;height:43px'><button type="button" class="btn btn-primary rounded-pill" >全 部</button></li>
            <li style='list-style:none;height:43px'><button type="button" class="btn btn-primary rounded-pill">推 薦</button></li>
            <li style='list-style:none;height:43px'><button type="button" class="btn btn-primary rounded-pill">飲 品</button></li>
            <li style='list-style:none;height:43px'><button type="button" class="btn btn-primary rounded-pill">蛋 糕</button></li>
            <li style='list-style:none;height:43px'><button type="button" class="btn btn-primary rounded-pill">餅 乾</button></li>
        </ul>
        <div class='col-lg-4 border border-primary rounded-pill d-flex align-item-center' style='height:50px'>
            <span class="material-symbols-outlined ms-3 d-block" style='font-size:40px'>search</span>
            <input placeholder='  搜尋商品' style='border:none ;height:45px'>
        </div>
       
        </div>
    </nav>
    <h5>精選飲品</h5>
</div>
</template>