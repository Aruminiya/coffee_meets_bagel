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
      </div>
    </div>
  </nav>
  <h1>這是根組件 App.vue</h1>
  <RouterView />
</template>

<style lang="scss" scoped></style>
