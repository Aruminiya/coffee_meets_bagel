<script>
import axios from 'axios'
import NavBarComponent from '../../components/NavBarComponent.vue'
import FooterComponent from '../../components/FooterComponent.vue'
const VITE_HEXAPI = import.meta.env.VITE_HEXAPI
const VITE_USER_PATH = import.meta.env.VITE_USER_PATH

export default {
  components: {
    NavBarComponent,
    FooterComponent
  },
  data () {
    return {
      text: '',
      isLoading: true
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    const id = this.$route.params.id
    axios.get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/product/${id}`)
      .then((res) => {
        console.log(res)
        this.text = res
        this.isLoading = false
      })
  }
}

</script>

<template>
  <NavBarComponent></NavBarComponent>
  <LaodingOverlay :active="isLoading" />
    <div>{{text}}</div>

  <FooterComponent/>

</template>
