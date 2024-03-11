<template>
  <!-- Google font -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />

  <!-- logo 觸發 offcanvas 效果，不能放 BackendOffcanvasNav component 裡面 -->
  <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
  <!-- 側邊選單 -->
  <adminNav ref="backendNav" />
  <main>
    <div class="container mt-10 py-5">
      <!-- coupon-searchbar -->
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="input-group my-4">
            <input
              type="text"
              v-model="search"
              class="form-control fw-semibold lh-1 border-colorChart-Primary-200 border-end-0 ps-3"
              placeholder="請輸入搜尋資料"
              aria-label="Username"
              aria-describedby="coupon-searchbar"
            />
            <button
              class="btn btn-colorChart-Primary-200 d-flex align-items-center"
              type="button"
              id="coupon-searchbar"
              @click="searchCoupon"
            >
              <span class="material-symbols-outlined cursor-pointer">
                search
              </span>
            </button>
          </div>
        </div>
      </div>
      <!-- 所有折扣、新增折價券 -->
      <div class="d-flex align-items-center mb-4">
        <h2 class="fw-bold text-colorChart-Accessory-200 lh-1 mb-0 me-9">
          所有折扣
        </h2>
        <button
          class="btn btn-colorChart-Primary-200 fs-4"
          @click="openCouponModal(true)"
        >
          新增折價券
        </button>
      </div>

      <div
        class="border rounded shadow table-responsive couponTableHeight mb-4 p-4"
      >
        <table
          class="couponTable table table-light table-striped table-hover table-borderless fs-4 align-middle mb-0"
        >
          <thead>
            <tr>
              <th
                width="100"
                class="top-left-border-radius ps-5 py-8 text-truncate"
              >
                折價券名稱
              </th>
              <th width="100" class="py-8 text-truncate">優惠碼</th>
              <th width="100" class="py-8 text-truncate">折扣額度</th>
              <th width="100" class="py-8 text-truncate">到期日</th>
              <th width="100" class="py-8 text-truncate">是否啟用</th>
              <th width="50" class="top-right-border-radius py-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="coupon in renderCoupons"
              :key="coupon.id + 999"
              class="cursor-pointer"
            >
              <td class="ps-5 py-8 text-truncate">{{ coupon.title }}</td>
              <td class="py-8 text-truncate">{{ coupon.code }}</td>
              <td class="py-8 text-truncate">{{ coupon.percent }}% OFF</td>
              <td class="py-8 text-truncate">
                {{ filterDueDate(coupon.due_date) }}
              </td>
              <td class="py-8 text-truncate">
                <span v-if="coupon.is_enabled > 0" class="text-success"
                  >已啟用</span
                >
                <span v-else class="text-primary">未啟用</span>
              </td>
              <td class="py-8 pe-7">
                <div class="d-flex justify-content-center">
                  <!-- coupon 是每一筆折扣券物件，當要編輯折扣券時，把該物件當作參數傳到內層 CouponModal -->
                  <span
                    class="material-symbols-outlined fs-3 me-6"
                    @click="openCouponModal(false, coupon)"
                  >
                    edit_square
                  </span>
                  <span
                    class="material-symbols-outlined fs-3"
                    @click="deleteCoupon(coupon)"
                  >
                    delete
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationComponent
        :pagination="pagination"
        @emit-pages="getRenderCoupons"
      />
    </div>
  </main>
  <CouponModalComponent
    ref="couponModal"
    :is-new="isNew"
    :coupon="tempCoupon"
    @update-coupon="updateCoupon"
  />
</template>

<script>
import adminLogo from '../../components/BackendLogoComponent.vue'
import adminNav from '../../components/BackendOffcanvasNav.vue'
import CouponModalComponent from '@/components/CouponModalComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import Swal from 'sweetalert2'

// 通用環境變數
const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH

export default {
  data () {
    return {
      // 接收所有折扣券資料
      allCoupons: [],
      // 渲染的用折扣資料
      renderCoupons: [],
      // 做為要新增或編輯折扣券的接收資料物件
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      // 接收分頁資料
      pagination: {},
      // 資料總頁數
      pages: 0,
      // 搜尋字詞
      search: '',
      // 判斷新增或是編輯折扣券
      isNew: false
    }
  },
  components: {
    adminLogo,
    adminNav,
    CouponModalComponent,
    PaginationComponent
  },
  methods: {
    // 打開側邊欄位
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    // 打開折扣編輯 modal
    openCouponModal (isNew, coupon) {
      this.isNew = isNew
      // 判斷是否為「新增」優惠券
      if (this.isNew) {
        this.tempCoupon = {
          // 先傳入 is_enabled: 0，否則沒有勾選是否啟用時，會因為沒有 is_enabled 屬性而 post 失敗
          is_enabled: 0,
          // 新增折扣券的情況下只把 tempCoupon 的 due_date 傳入。另外，因為 due_date post 時一定要使用 unix Timestamp 格式所以先處理好，抓的是當下時間
          due_date: new Date().getTime() / 1000
        }
      } else {
        // 若是「編輯」折價券，tempCoupon 先接收該物件的淺拷貝資料，避免編輯 CouponModal 時，當前畫面同步變動，接著把 tempCoupon 用 props 傳到 CouponModal
        this.tempCoupon = { ...coupon }
      }

      this.$refs.couponModal.openModal()
    },
    // 取得所有 coupons 資料
    getAllCoupons () {
      this.axios
        .get(`${host}/v2/api/${path}/admin/coupons`)
        .then((res) => {
          // 先取得資料總頁數
          this.pagination = res.data.pagination
          this.pages = this.pagination.total_pages
          // 因為每次最多只回傳 10 筆資料，所以要用總頁數跑 for 迴圈，取得每頁的資料再一一推進 coupons 陣列中
          for (let i = 1; i <= this.pages; i++) {
            this.axios
              .get(`${host}/v2/api/${path}/admin/coupons?page=${i}`)
              .then((res) => {
                res.data.coupons.forEach((coupon) => {
                  this.allCoupons.push(coupon)
                })
              })
          }
        })
        .catch((err) => {
          alert(err.response)
        })
    },
    // 渲染 coupons 資料，預設為第一頁(page = 1)，一頁有 10 筆資料
    getRenderCoupons (page = 1) {
      this.axios
        .get(`${host}/v2/api/${path}/admin/coupons?page=${page}`)
        .then((res) => {
          this.renderCoupons = res.data.coupons
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          alert(err.response)
        })
    },
    // 搜尋折扣券功能
    searchCoupon () {
      const result = this.allCoupons.filter((coupon) => {
        // coupon.due_date 回傳時是 unix Timestamp，所以先處裡成 YYYY-MM-DD 格式
        const dueDate = new Date(coupon.due_date * 1000).toLocaleDateString()
        // 搜尋比對的是折扣券標題、折扣碼、折扣額度及日期
        return [coupon.title, coupon.code, coupon.percent, dueDate]
          .toString()
          .match(this.search)
      })

      this.renderCoupons = result

      // 搜尋後，把頁面預設為第一頁
      this.pagination = {
        total_pages: this.pages,
        current_page: 1,
        has_pre: false,
        has_next: true
      }
    },
    // 把 methods 作為 filter 來轉換渲染的日期格式為 YYYY/MM/DD
    filterDueDate (dueDate) {
      return new Date(dueDate * 1000).toLocaleDateString()
    },
    // 新增、編輯折扣券共用同一個 method
    updateCoupon (innerTempCoupon) {
      // 若是新增，用 post 方法及對應 API 路徑
      let url = `${host}/v2/api/${path}/admin/coupon`
      let httpMethods = 'post'

      // 這邊 innerTempCoupon 為內層新增、編輯後的折扣券物件
      let data = innerTempCoupon

      // 若是編輯，用 put 方法及對應 API 路徑
      if (!this.isNew) {
        url = `${host}/v2/api/${path}/admin/coupon/${this.tempCoupon.id}`
        httpMethods = 'put'
        data = this.tempCoupon
      }

      this.axios[httpMethods](url, { data })
        .then((res) => {
          // 每次新增、編輯或刪除都先清空所有折扣券資料，再跑 getAllCoupons 重新取得一次，不然會重複取到資料
          this.allCoupons = []
          // 每次新增、編輯或刪除都要再取得全部折扣券(getAllCoupons)一次(不然搜尋功能會只比對最新 10 筆資料)，接著才執行渲染
          this.getAllCoupons()
          this.getRenderCoupons()
          this.$refs.couponModal.closeModal()
        })
        .catch((err) => console.log(err.response))
    },
    // 刪除折扣券
    deleteCoupon (coupon) {
      Swal.fire({
        title: '確定要刪除嗎',
        text: '此動作不可復原！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#20c997',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消刪除',
        confirmButtonText: '確認刪除'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete(`${host}/v2/api/${path}/admin/coupon/${coupon.id}`)
            .then((res) => {
              Swal.fire({
                title: '成功刪除',
                icon: 'success'
              })
              this.allCoupons = []
              this.getAllCoupons()
              this.getRenderCoupons()
            })
            .catch((err) => console.log(err.response))
        }
      })
    }
  },
  mounted () {
    this.getAllCoupons()
    this.getRenderCoupons()
  }
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}

.top-left-border-radius {
  border-radius: 5px 0 0 0;
}

.top-right-border-radius {
  border-radius: 0 5px 0 0;
}

.couponTableHeight {
  max-height: 740px;
  overflow: auto;
  .couponTable {
    tbody {
      height: 200px;
      overflow: auto;
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
}
</style>
