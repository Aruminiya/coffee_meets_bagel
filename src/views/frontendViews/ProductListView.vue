<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<script>

import axios from 'axios';
import VueAxios from 'vue-axios'

export default{
    data(){
        return{
            message:'產品列表test',
            api:{
            url : 'https://vue3-course-api.hexschool.io/v2',
            api_path : 'florafirstapi'
            },
            productsList:[],
        }
    },
    methods:{

    },
    mounted(){
        axios.get(`${this.api.url}/api/${this.api.api_path}/products/all`)
        .then((res)=>{
            //this.changeIsLoadingStatus();
            this.productsList = res.data.products
            console.log(this.productsList);
            console.log('mounted')
        });
    }
}



</script>

<template>
<div class='container' >
    <nav class='row pt-5'>
        <div class='d-flex justify-content-between flex-column-reverse flex-lg-row'>
        <ul class='d-flex col-lg-5 justify-content-between ps-0 mb-0'>
            <li style='list-style:none' class='d-flex align-items-center '><button type="button" class="btn btn-primary rounded-pill" >全 部</button></li>
            <li style='list-style:none' class='d-flex align-items-center '><button type="button" class="btn btn-primary rounded-pill">推 薦</button></li>
            <li style='list-style:none' class='d-flex align-items-center '><button type="button" class="btn btn-primary rounded-pill">飲 品</button></li>
            <li style='list-style:none' class='d-flex align-items-center '><button type="button" class="btn btn-primary rounded-pill">蛋 糕</button></li>
            <li style='list-style:none' class='d-flex align-items-center '><button type="button" class="btn btn-primary rounded-pill">餅 乾</button></li>
        </ul>
        <div class='col-lg-4 border border-primary rounded-pill d-flex align-items-center' style='height:50px'>
            <span class="material-symbols-outlined ms-3 d-block" style='font-size:40px'>search</span>
            <input placeholder='  搜尋商品' style='border:none ;height:40px; background-color:transparent' class='w-75'>
        </div>
        </div>
    </nav>
    <div class='row py-5'>
        <div class='col-lg-3 d-flex align-items-center justify-content-between'>
            <h1 class='text-primary'>全部</h1> 
            <h4 class='d-flex align-items-center text-primary'>
                <span class="material-symbols-outlined d-block">favorite</span>
                店長推薦
            </h4>
        </div>
    </div>
    <div>

        <ul class='row d-flex ps-0  '>
            <li v-for='item in productsList' class='col-lg-3 d-flex justify-content-center mb-5 productCard' style='list-style:none' >
                <div class="card border-0" style="width: 18rem;">
                    <img :src='item.imageUrl' class="" :alt="item.title" style='height:280px'>
                    <div class="card-body cardContent">
                        <div class='d-flex justify-content-between'>
                            <p class="card-text text-primary"> {{item.title}}</p>
                            <p class='text-primary'>NT${{item.price}}/{{item.unit}}</p>
                        </div>
                    </div>
                    <div class='card-body addToCartBtn ' >
                        <div class=' addToCartText ' style='height:72px'>
                            <!-- <div class=' d-flex justify-content-between'>
                            <p class="card-text text-primary"> {{item.title}}</p>
                            <p class='text-primary'>NT${{item.price}}/{{item.unit}}</p>
                            </div> -->
                            <p style=' font-size:12px'>{{item.description}}</p>
                        </div>
                        <button class='text-center w-100 border-0' style='background-color:#4f2413'><p class='mb-0 text-light'>加入購物車</p></button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<style lang='scss'>

.productCard{
    .addToCartBtn{
        border: 1px solid transparent;
        .addToCartText{
        display:none
        };
    };
    &:hover{
        .addToCartBtn{
            
            }
        .addToCartText{
            display:block
            }
        .cardContent{
            display:none
        }
        };
}





</style>