<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminStore } from "../store/adminStore";
import Dashboard from "../components/Dashboard.vue";

const adminStore = useAdminStore();
const searchQuery = ref("");

// Lấy dữ liệu người dùng khi trang được tải
onMounted(() => {
  adminStore.fetchUsers(adminStore.currentPage, adminStore.pageSize);
});

// Lọc người dùng theo từ khóa tìm kiếm và roleId
const filteredUsers = computed(() => {
  let users = adminStore.users;

  if (searchQuery.value) {
    users = users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  users = users.filter(user => user.roleId !== 1); // Ẩn user có roleId = 1
  return users;
});

// Hàm thay đổi trang
const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= adminStore.totalPages) {
    adminStore.currentPage = newPage;
    adminStore.fetchUsers(newPage, adminStore.pageSize);
  }
};

// Hàm xóa người dùng
const deleteUser = (userId) => {
  adminStore.deleteUser(userId);
};
</script>

<template>
  <div class="container-dashboard">
    <Dashboard />
    <div class="main">
      <h1>Quản lý người dùng</h1>

      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm người dùng..." />
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button class="delete-btn" @click="deleteUser(user.id)">
                  <i class="bx bx-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="3" class="no-results">Không tìm thấy người dùng</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Phân trang -->
      <!-- <div class="pagination">
        <button @click="changePage(adminStore.currentPage - 1)" :disabled="adminStore.currentPage === 1">Trước</button>
        <span>{{ adminStore.currentPage }} / {{ adminStore.totalPages }}</span>
        <button @click="changePage(adminStore.currentPage + 1)" :disabled="adminStore.currentPage === adminStore.totalPages">Sau</button>
      </div> -->
    </div>
  </div>
</template>


<style scoped>
.main {
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 28px;
  color: #333;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-container input {
  width: 400px;
  padding: 10px;
  border: 2px solid #4CAF50;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
}

.table-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: white;
  text-transform: uppercase;
}

tbody tr:hover {
  background-color: #f1f1f1;
  transition: 0.3s;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 8px;
  font-size: 18px;
  transition: 0.3s;
  border-radius: 50%;
}

.delete-btn:hover {
  background-color: #d32f2f;
  transform: scale(1.1);
}

.no-results {
  text-align: center;
  color: red;
  margin-top: 10px;
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 6px;
  margin: 0 10px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
}

.pagination span {
  font-size: 18px;
  line-height: 40px;
}
</style>
