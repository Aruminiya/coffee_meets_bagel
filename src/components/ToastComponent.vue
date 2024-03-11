<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
// pinia
import { mapState } from 'pinia'
import cartStore from '../stores/CartStore.js'

export default {
  data () {
    return {
      toast: null
    }
  },
  methods: {
    toastShow () {
      this.toast.show()
    }
  },
  computed: {
    ...mapState(cartStore, ['cartStatus'])
  },
  mounted () {
    this.toast = new bootstrap.Toast(this.$refs.toast)
  }
}
</script>

<template>

<div ref='toast' class="toast position-fixed top-10 end-0"  style="z-index: 5" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body text-primary">
    <i class="fa-solid fa-cart-shopping me-1"></i>   {{cartStatus}}
   </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
</template>
