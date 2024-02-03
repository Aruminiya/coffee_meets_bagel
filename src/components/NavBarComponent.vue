<script></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand" href="#"
        ><img
          class="logo"
          src="../../public/coffee_meets_bagel_Logo.svg"
          alt="coffee_meets_bagel_Logo"
          width="200"
      /></router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/about" class="nav-link" aria-current="page" href="#"
            ><p class="m-0">關於我們</p></router-link
          >
        </div>
        <div class="navbar-nav">
          <router-link to="/order" class="nav-link" aria-current="page" href="#"
            ><p class="m-0">線上點餐</p></router-link
          >
        </div>
        <!-- 不知道要放哪邊, 先借放 -->
        <div class="navbar-nav">
          <router-link
            to="/admin/adminProducts"
            class="nav-link"
            aria-current="page"
            href="#"
            ><p class="m-0">後台訂單(暫存)</p></router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: $colorChart-Accessory-100;
}
p {
  color: $colorChart-Accessory-200;
}
</style>
