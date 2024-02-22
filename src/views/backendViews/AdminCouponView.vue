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
      <!-- discount-searchbar -->
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="input-group mb-4">
            <input
              type="text"
              class="form-control fs-3 fw-semibold text-secondary lh-1 border-colorChart-Primary-200 border-end-0 py-3 ps-4"
              placeholder="請輸入搜尋資料"
              aria-label="Username"
              aria-describedby="discount-searchbar"
            />
            <button
              class="btn btn-colorChart-Primary-200 d-flex align-items-center px-4"
              type="button"
              id="discount-searchbar"
            >
              <span class="material-symbols-outlined cursor-pointer fs-2">
                search
              </span>
            </button>
          </div>
        </div>
      </div>
      <!-- 所有折扣、新增折價券 -->
      <div class="d-flex align-items-center mb-4">
        <h2 class="fs-48 fw-bold text-colorChart-Accessory-200 lh-1 mb-0 me-9">
          所有折扣
        </h2>
        <button
          class="btn btn-colorChart-Primary-200 fs-4"
          @click="openCouponModal(true)"
        >
          新增折價券
        </button>
      </div>

      <div class="border rounded shadow p-4 table-responsive">
        <table
          class="discountTable table table-light table-striped table-hover table-borderless fs-2 align-middle mb-0"
        >
          <thead>
            <tr>
              <th
                width="100"
                class="top-left-border-radius ps-5 py-9 text-truncate"
              >
                折價券名稱
              </th>
              <th width="100" class="py-9 text-truncate">優惠碼</th>
              <th width="100" class="py-9 text-truncate">折扣額度</th>
              <!-- <th width="100" class="py-9 text-truncate">總數量</th> -->
              <th width="100" class="py-9 text-truncate">到期日</th>
              <th width="100" class="py-9 text-truncate">是否啟用</th>
              <th width="50" class="top-right-border-radius py-9"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="coupon in coupons"
              :key="coupon.id"
              class="cursor-pointer"
            >
              <td class="ps-5 py-11 text-truncate">{{ coupon.title }}</td>
              <td class="py-11 text-truncate">{{ coupon.code }}</td>
              <td class="py-11 text-truncate">{{ coupon.percent }}%OFF</td>
              <!-- <td class="py-11 text-truncate">{{ coupon.num }}張</td> -->
              <td class="py-11 text-truncate">
                {{ filterDueDate(coupon.due_date) }}
              </td>
              <td class="py-11 text-truncate">
                <span v-if="coupon.is_enabled > 0" class="text-success"
                  >已啟用</span
                >
                <span v-else class="text-primary">未啟用</span>
              </td>
              <td class="py-11 pe-7">
                <div class="d-flex justify-content-center">
                  <!-- coupon 是每一筆折扣券物件，當要編輯折扣券時，把該物件當作參數傳到內層 CouponModal -->
                  <span
                    class="material-symbols-outlined fs-1 me-6"
                    @click="openCouponModal(false, coupon)"
                  >
                    edit_square
                  </span>
                  <span
                    class="material-symbols-outlined fs-1"
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
import adminLogo from "../../components/BackendLogoComponent.vue";
import adminNav from "../../components/BackendOffcanvasNav.vue";
import CouponModalComponent from "@/components/CouponModalComponent.vue";

import Swal from "sweetalert2";

// 通用環境變數
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
        // 新增數量屬性
        // num: 0,
      },
      isNew: false,
    };
  },
  components: {
    adminLogo,
    adminNav,
    CouponModalComponent,
  },
  methods: {
    // 打開側邊欄位
    openOffCanvasNav() {
      this.$refs.backendNav.openNav();
    },
    // 打開折扣編輯 modal
    openCouponModal(isNew, coupon) {
      this.isNew = isNew;
      // 判斷是否為「新增」優惠券
      if (this.isNew) {
        this.tempCoupon = {
          // 是的話只把 tempCoupon 的 due_date 傳入。另外，因為 due_date post 時一定要使用 unix Timestamp 格式所以先處理好，抓的是當下時間
          due_date: new Date().getTime() / 1000,
        };
        console.log(this.tempCoupon);
      } else {
        // 若是「編輯」折價券，tempCoupon 先接收該物件的淺拷貝資料，避免編輯 CouponModal 時，當前畫面同步變動，接著把 tempCoupon 用 props 傳到 CouponModal
        this.tempCoupon = { ...coupon };
      }

      this.$refs.couponModal.openModal();
    },
    getCoupons() {
      this.axios
        .get(`${host}/v2/api/${path}/admin/coupons`)
        .then((res) => {
          console.log(res.data);
          this.coupons = res.data.coupons;
        })
        .catch((err) => {
          alert(err.response);
        });
    },
    // 把 methods 作為 filter
    filterDueDate(dueDate) {
      return new Date(dueDate * 1000).toLocaleDateString();
    },
    updateCoupon(tempCoupon) {
      // 若是新增，用 post 方法及對應 API 路徑
      let url = `${host}/v2/api/${path}/admin/coupon`;
      let httpMethods = "post";

      // 這邊 tempCoupon 為內層新增、編輯後的折扣券物件
      let data = tempCoupon;

      // 若是編輯，用 put 方法及對應 API 路徑
      if (!this.isNew) {
        url = `${host}/v2/api/${path}/admin/coupon/${this.tempCoupon.id}`;
        httpMethods = "put";
        data = this.tempCoupon;
      }

      this.axios[httpMethods](url, { data })
        .then((res) => {
          console.log(res.data);
          this.getCoupons();
          this.$refs.couponModal.closeModal();
        })
        .catch((err) => console.log(err.response));
    },
    deleteCoupon(coupon) {
      Swal.fire({
        title: "確定要刪除嗎",
        text: "此動作不可復原！",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "取消刪除",
        confirmButtonText: "確認刪除",
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete(`${host}/v2/api/${path}/admin/coupon/${coupon.id}`)
            .then((res) => {
              Swal.fire({
                title: "成功刪除",
                icon: "success",
              });
              this.getCoupons();
            })
            .catch((err) => console.log(err.response));
        }
      });
    },
  },
  mounted() {
    // 從 cookie 取得 token 資料
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)florafirstapi\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // 有些 request 需要夾帶 token 才能使用，所以在發送請求時夾帶 headers 資料，mounted 就載入的話，每次發請求都會自動夾帶
    this.axios.defaults.headers.common["Authorization"] = token;

    this.getCoupons();
  },
};
</script>

<style lang="scss">
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
