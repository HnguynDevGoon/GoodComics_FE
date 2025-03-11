<script setup>
import '../assets/css/DashboardCss.css';
import Dashboard from "../components/Dashboard.vue";
import ComicAdmin from "../components/ComicAdmin.vue";
</script>

<template>
  <div class="container-dashboard">
    <Dashboard></Dashboard>
    <div class="main">
      <h1>Quản lí truyện</h1>
      <div>
        <ComicAdmin></ComicAdmin>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>