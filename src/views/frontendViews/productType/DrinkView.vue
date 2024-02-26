<template>
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
</template>