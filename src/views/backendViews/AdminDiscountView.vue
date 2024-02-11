<template>
  <!-- Google font -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <!-- logo 觸發 offcanvas 效果，不能放 BackendOffcanvasNav component 裡面 -->
  <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
  <!-- 側邊選單 -->
  <adminNav ref="backendNav" />
  <main>
    <div class="container mt-10 py-5">
      <!-- discount-searchbar -->
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="input-group mb-4">
            <input type="text"
              class="form-control fs-3 fw-semibold text-secondary lh-1 border-colorChart-Primary-200 border-end-0 py-3 ps-4"
              placeholder="請輸入搜尋資料" aria-label="Username" aria-describedby="discount-searchbar">
            <button class="btn btn-colorChart-Primary-200 d-flex align-items-center px-4" type="button"
              id="discount-searchbar">
              <span class="material-symbols-outlined cursor-pointer fs-2">
                search
              </span>
            </button>
          </div>
        </div>
      </div>
      <!-- 所有折扣、新增折價券 -->
      <div class="d-flex align-items-center mb-4">
        <h2 class="fs-48 fw-bold text-colorChart-Accessory-200 lh-1 mb-0 me-9">所有折扣</h2>
        <button class="btn btn-colorChart-Primary-200 fs-4">新增折價券</button>
      </div>

      <div class="border rounded shadow p-4 table-responsive">
        <table class="discountTable table table-light table-striped table-hover table-borderless fs-2 align-middle mb-0">
          <thead>
            <tr>
              <th width="150" class="top-left-border-radius ps-5 py-9 text-truncate">折價券名稱</th>
              <th width="150" class="py-9">優惠碼</th>
              <th width="100" class="py-9 text-truncate">折扣額度</th>
              <th width="100" class="py-9 text-truncate">總數量</th>
              <th width="50" class="top-right-border-radius py-9"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id" class="cursor-pointer">
              <td class="ps-5 py-11 text-truncate">{{ coupon.title }}</td>
              <td class="py-11 text-truncate">{{ coupon.code }}</td>
              <td class="py-11 text-truncate">{{ coupon.percent }}%OFF</td>
              <td class="py-11 text-truncate">{{ coupon.num }}張
              </td>
              <td class="py-11 pe-7">
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined fs-1 me-6">
                    edit_square
                  </span>
                  <span class="material-symbols-outlined fs-1">
                    delete
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import adminLogo from '../../components/BackendLogoComponent.vue';
import adminNav from '../../components/BackendOffcanvasNav.vue';

// 通用環境變數
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

export default {
  data () {
    return {
      coupons: []
    }
  },
  components: {
    adminLogo,
    adminNav
  },
  methods: {
    // 打開側邊欄位
    openOffCanvasNav () {
      this.$refs.backendNav.openNav();
    },
    getCoupons () {
      this.axios.get(`${host}/v2/api/${path}/admin/coupons`).then(res => {
        console.log(res.data)
        this.coupons = res.data.coupons
      }).catch(err => {
        alert(err.response)
      })
    }
  },
  mounted () {
    // 從 cookie 取得 token 資料
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)florafirstapi\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // 有些 request 需要夾帶 token 才能使用，所以在發送請求時夾帶 headers 資料，mounted 就載入的話，每次發請求都會自動夾帶
    this.axios.defaults.headers.common["Authorization"] = token;

    this.getCoupons();
  }
}

</script>

<style lang="scss">
.lh-1 {
  line-height: 1;
}

.cursor-pointer {
  cursor: pointer;
}

.fs-48 {
  font-size: 48px;
}

.top-left-border-radius {
  border-radius: 5px 0 0 0;
}

.top-right-border-radius {
  border-radius: 0 5px 0 0;
}

.discountTable {
  tbody {
    tr {
      &:last-child {
        td {
          &:first-child {
            border-radius: 0 0 0 5px;
          }

          &:last-child {
            border-radius: 0 0 5px 0;
          }
        }
      }
    }
  }
}
</style>