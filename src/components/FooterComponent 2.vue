<script></script>

<template>
  <div class="footer p-3">
    <div
      class="footerContainer d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center p-1 p-md-5"
    >
      <router-link to="/"
        ><div class="logoContainer my-3">
          <img
            class="img-fluid"
            src="../../public/coffee_meets_bagel_Logo_Footer.svg"
            alt="coffee_meets_bagel_Logo_Footer"
          /></div
      ></router-link>

      <div class="textContainer">
        <div class="text px-3">
          <p class="m-0 font-weight-400">
            106 台北市大安區信義路三段 75 號 1 號 2 樓
          </p>
          <div>
            <p class="m-0 font-weight-400">02-2707-8877</p>
            <a href="#"
              ><img src="../../public/FacebookIcon.svg" alt="FacebookIcon"
            /></a>
            &nbsp;
            <a href="#"
              ><img src="../../public/InstagramIcon.svg" alt="InstagramIcon"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
P {
  color: white;
}
.footer {
  background-color: $colorChart-bg-color;
}
.logoContainer {
  max-width: 256px;
}
.footerContainer {
  border-radius: 1rem;
  height: 256px;

  background-color: $colorChart-Logo-Brown;
  .text {
    border-left: solid 4px white;
  }
}
</style>
