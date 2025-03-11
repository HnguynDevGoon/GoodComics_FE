<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import '../assets/css/DashboardCss.css';


const isSidebarOpen = ref(true); 
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

</script>

<template>
    <div :class="['sidebar', { 'sidebar-collapsed': !isSidebarOpen }]" >
      <h2 v-if="isSidebarOpen">GoodComics </h2>
      <RouterLink to="/" v-if="isSidebarOpen" class="sidebar-link">
        <i class="bx bx-home"></i> Trang chủ
      </RouterLink>
      <RouterLink to="/UserManagerment" v-if="isSidebarOpen" class="sidebar-link">
        <i class="bx bx-user"></i> Người dùng
      </RouterLink>
      <RouterLink to="/ComicManagerment" v-if="isSidebarOpen" class="sidebar-link">
        <i class="bx bx-book"></i> Quản lí truyện
      </RouterLink>
      <RouterLink to="/AdminAccount" v-if="isSidebarOpen" class="sidebar-link">
        <i class="bx bx-cog"></i> Tài khoản Admin
      </RouterLink>
      <!-- Mũi tên và nút đăng xuất -->
      <div class="toggle-logout-container">
          <button class="toggle-btn" @click="toggleSidebar">
              <i :class="['bx', isSidebarOpen ? 'bx-chevron-left' : 'bx-chevron-right']"></i>
          </button>
      </div>
    </div>
</template>

<style scoped>

</style>
