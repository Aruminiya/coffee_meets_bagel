<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<script>

import axios from 'axios';
import VueAxios from 'vue-axios';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import ModalComponent from '../../components/ModalComponent.vue';
import ToastComponent from '../../components/ToastComponent.vue';
//pinia
import { mapState, mapActions } from "pinia";
import cartStore from "../../stores/CartStore.js";

const VITE_HEXAPI = import.meta.env.VITE_HEXAPI;
const VITE_USER_PATH = import.meta.env.VITE_USER_PATH;

export default{
    components:{
        NavBarComponent,
        FooterComponent,
        ModalComponent,
        ToastComponent,
    },
    data(){
        return{
            categories:['飲品','蛋糕','餅乾','輕食'],
            productsList:[],
            modal:null,
            isLoading:true,
            showPagination:false,
            pages:{

            }
        }
    },
    watch:{
        '$route.query':{
            handler(){
                this.getProduct();
            },
            deep:true,
        }
    },
    methods:{
        openModal(product){
            // console.log(product)
            // console.log( this.$refs)
            this.$refs.productDetailModal.modalShow(product)
        },

        getProduct(page=1){
        this.isLoading=true;
        this.showPagination=true;
        //console.log(this.$route);
        const {category = ''} = this.$route.query;
        axios.get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/products?category=${category}&page=${page}`)
        .then((res)=>{
            //console.log(res)
            this.pages=res.data.pagination;
            this.productsList = res.data.products;
            this.productsList.sort(function(a, b){
                return a.title.localeCompare(b.title, 'zh-Hans-CN');
                });
            this.isLoading=false;
        });
        },

        sortRecommend(){
            this.isLoading=true;
            this.showPagination=false;
            axios.get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/products/all`)
            .then((res)=>{
                const recommendArr = [];
                res.data.products.forEach((item) => {
                    if(item.is_recommend === 1){
                        recommendArr.push(item)
                    };
                    //console.log(recommendArr);
                    this.productsList = recommendArr;
                    //console.log(this.producstList);
                    this.productsList.sort(function(a, b){
                        return a.title.localeCompare(b.title, 'zh-Hans-CN');
                });
                    this.isLoading=false;
                });
            });

        },

        scrollBehavior() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
                });
        },



    },
    computed:{
        ...mapState(cartStore, ['addedToCart']),
    },
    mounted(){
        this.getProduct();
        //this.sortRecommend()
        //const arr = ['ab', 'abc','de']
        


        

    }
}



</script>

<template>
<NavBarComponent></NavBarComponent>
<LaodingOverlay :active='isLoading'/>
<ModalComponent ref='productDetailModal'></ModalComponent>


<div class='container' >
    
    
    
    <nav class='row pt-5 justify-content-md-center'>
        <div class='d-flex justify-content-between flex-column-reverse flex-lg-row col-md-6 col-lg-12 '>
        <ul class='d-flex col-lg-4 justify-content-between ps-0 mb-0 mt-2 justify-content-center '>

            <li style='list-style:none' class='d-flex align-items-center '>
             <RouterLink class="btn btn-primary rounded-pill" to="/productList">全部
            </RouterLink>
            </li>

            <li style='list-style:none' class='d-flex align-items-center '>
             <a class="btn rounded-pill" style='background-color:#712214; color:white' @click='sortRecommend'>推薦
            </a>
            </li>
            <li style='list-style:none' class='d-flex align-items-center '>
             <RouterLink class="btn btn-primary rounded-pill" to="/productList?category=輕食">
             輕食
            </RouterLink>
            </li>

            <li style='list-style:none' class='d-flex align-items-center '>
             <RouterLink class="btn btn-primary rounded-pill" to="/productList?category=飲品" >飲品
            </RouterLink>
            </li>

            <li style='list-style:none' class='d-flex align-items-center '>
             <RouterLink class="btn btn-primary rounded-pill" to="/productList?category=蛋糕">蛋糕
            </RouterLink>
            </li>

            <li style='list-style:none' class='d-flex align-items-center '>
             <RouterLink class="btn btn-primary rounded-pill" to="/productList?category=餅乾">餅乾
            </RouterLink>
            </li>
            

        </ul>
        <div class='col-lg-4 border border-primary rounded-pill d-flex align-items-center' style='height:50px'>
            <span class="material-symbols-outlined ms-3 d-block" style='font-size:40px'>search</span>
            <input placeholder='  搜尋商品' style='border:none ;height:40px; background-color:transparent' class='w-75'>
        </div>
        </div>
    </nav>
    <div class='row py-5'>
        <div class='col-lg-4 d-flex align-items-center justify-content-lg-between justify-content-center'>
            <h1 class='text-primary'>全部</h1> 
            <h4 class='d-flex align-items-center text-primary'>
                <i class="fa-solid fa-crown me-1 text-warning ms-5"></i>
                店長推薦
            </h4>
        </div>
    </div>
    <div>

        <ul class='row d-flex ps-0  '>
            <li v-for='item in productsList' class='col-lg-3 d-flex justify-content-center mb-5 productCard' style='list-style:none' >
                <div class="card border-0" style="width: 18rem;">
                    <img :src='item.imageUrl' class="" :alt="item.title" style='height:280px; object-fit="none" '>
                    <div class="card-body cardContent  ">
                        <div class='d-flex justify-content-between ' v-if='item.is_recommend'>
                            <p class="card-text text-primary  " style='font-size:14px' > 
                                <span><i class="fa-solid fa-crown me-1 text-warning"  ></i></span> 
                                {{item.title}}</p>
                            <p class='text-primary' style='font-size:14px'>${{item.price}}/{{item.unit}}</p>
                        </div>
                       <div class='d-flex justify-content-between' v-else>
                            <p class="card-text text-primary"  style='font-size:14px'> 
                                {{item.title}}</p>
                            <p class='text-primary' style='font-size:14px'>${{item.price}}/{{item.unit}}</p>
                        </div>

                    </div>
                    <div class='card-body addToCartBtn' >
                        <div class=' addToCartText ' style='height:72px'>
                            <p style=' font-size:14px'>{{item.description}}</p>
                        </div>
                        <button ref='modalBtn' @click='openModal(item)' class='text-center w-100 '><p class='mb-0 '>加入購物車</p></button>

                    </div>
                </div>
            </li>
        </ul>

 <nav aria-label="Page navigation example" class='d-flex justify-content-center' 
 v-if='pages.total_pages!==1 && showPagination==true' >
  <ul class="pagination">

    <li class="page-item" :class='{disabled:pages.has_pre==false}'
    @click.prevent="getProduct(pages.current_page-1)" >
        <a class="page-link "  href="#" aria-label="Previous" @click='scrollBehavior'>
          <span aria-hidden="true">&laquo</span>
        </a>
    </li>

    <li class="page-item"
     v-for='page in pages.total_pages' 
     :key='page+"123"'   
    @click.prevent="getProduct(page)">
    <a class='page-link' 
    :class="{'bg-warning': pages.current_page == page}"
    href="#" @click='scrollBehavior' >{{page}}</a>
    </li>

    <li class="page-item" :class='{disabled:pages.has_next==false}'
    @click.prevent="getProduct(pages.current_page+1)" >
        <a class="page-link" href="#" aria-label="Next" @click='scrollBehavior' >
          <span aria-hidden="true">&raquo;</span>
        </a>
    </li>

  </ul>
</nav>

    </div>
</div>
<FooterComponent></FooterComponent>
</template>

<style lang='scss'>

.addToCartBtn {
    position: relative;
    z-index:1;
    height:70px;
    @media(max-width:991px){
    height:120px;
    }
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color:rgba(222,219,218,0.8);
        transform: scaleY(0);
        transition: transform 0.3s ease-in-out;
        z-index: -1;
    };
    button{
        display:block;
        background-color:#4f2413;
        color:	#FFFFFF;
        border: 2px solid transparent;
        }
    @media(min-width:992px){
    button{
        display:none
    }
    }

    
}




.productCard{
    position:relative;
    .card-body{
        padding:8px;
    }

    @media(min-width:992px){
        .addToCartText{
        display:none;
        };
    &:hover{
        button{
        display:block;
        background-color:#4f2413;
        color:	#FFFFFF;
        border: 2px solid transparent;
        }
        .addToCartText{
            display:block;
            }
        .cardContent{
            display:none
        };
        .addToCartBtn::before{
        height:130px;
        margin-top:0px;
        transform: scaleY(1);
        transform-origin:bottom center;

        }
    }
    }

    
}
</style>
