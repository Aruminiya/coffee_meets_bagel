<template>
  <!-- 移除 total_pages !== 1 判斷，避免在搜尋完後，清除搜尋欄時分頁導覽消失 -->
  <div class="d-flex justify-content-center">
    <nav aria-label="navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link"
            @click.prevent="emitPages(pagination.current_page - 1)"
            href="#"
            >前一頁</a
          >
        </li>
        <li
          v-for="(page, key) in pagination.total_pages"
          :key="key + 999"
          :class="{ active: pagination.current_page === page }"
          class="page-item"
        >
          <a class="page-link" @click.prevent="emitPages(key + 1)" href="#">{{
            key + 1
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link"
            @click.prevent="emitPages(pagination.current_page + 1)"
            href="#"
            >下一頁</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    emitPages (page) {
      this.$emit('emit-pages', page)
    }
  }
}
</script>
