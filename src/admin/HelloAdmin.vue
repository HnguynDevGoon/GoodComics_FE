<script setup>
import '../assets/css/DashboardCss.css';
import Dashboard from "../components/Dashboard.vue";
</script>

<template>
  <div class="container-dashboard">
    <Dashboard></Dashboard>
    <div class="main">
      <div class="welcome-box">
        <img
          src="../assets/images/logo.png"
          alt="Admin Image"
          class="admin-image"
        />
        <h1 class="greeting-text">Xin chào Quản Trị Viên</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: #f1f2f6;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.welcome-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.825);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  width: 350px; 
  height: 450px; 
}

.admin-image {
  width: 250px; 
  height: auto;
  border-radius: 50%; 
  margin-bottom: 20px;
}

.greeting-text {
  font-size: 24px;
  font-weight: bold;
  color: #000000;
}
</style>
