<script></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">LOGO</router-link>
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
            >關於我們</router-link
          >
        </div>
        <div class="navbar-nav">
          <router-link to="/order" class="nav-link" aria-current="page" href="#"
            >線上點餐</router-link
          >
        </div>
        <!-- 不知道要放哪邊, 先借放 + 1 -->
        <div class="navbar-nav">
          <router-link
            to="/adminHome"
            class="nav-link"
            aria-current="page"
            href="#"
            >後台首頁(我也借放o口O)</router-link
          >
        </div>
        <!-- 不知道要放哪邊, 先借放 -->
        <div class="navbar-nav">
          <router-link
            to="/adminProducts"
            class="nav-link"
            aria-current="page"
            href="#"
            >後台訂單(暫存)</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
