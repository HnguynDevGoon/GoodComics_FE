
<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userStore"; 
import { useRouter } from "vue-router";
import { useComicStore } from "../store/comicStore"; 

const userStore = useUserStore();
const comicStore = useComicStore(); 
const searchValue = ref(""); 
const router = useRouter();

// Hàm tìm kiếm và gọi API, sau đó chuyển hướng đến trang ListComic
const searchComics = async () => {
  if (searchValue.value.trim() !== "") {
    await comicStore.searchComicByName(searchValue.value);
    router.push({ path: "/ListComic", query: { search: searchValue.value } });
  }
};
</script>

<template>
  <header class="header">
    <div class="header-logo">
      <RouterLink to="/"><img src="../assets/images/logo.png" alt="Logo"></RouterLink>
    </div>
    <div class="header-right">
      <div class="header-search">
        <input
          v-model="searchValue"
          type="text"
          @keyup.enter="searchComics"
          placeholder="Nhập tên truyện..."
          class="search-box"
        />
        <button class="search-btn" @click="searchComics">
          <i class="bx bx-search"></i>
        </button>
      </div>
      <div class="header-auth-links">
        <RouterLink v-if="!userStore.user" to="/Login">
          <i class="bx bx-user"></i> Tài khoản
        </RouterLink>
        <RouterLink v-else to="/Profile">
          <img v-if="userStore.user.urlavartar" :src="userStore.user.urlavartar" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
          {{ userStore.user.username }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>


<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;
    background: var(--background-color);
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.header-logo img {
    width: 100px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 20px; 
}

/* Search Box */
.header-search {
    display: flex;
    align-items: center;
    border-radius: 5px; 
    background-color: #ffffff; 
    width: 250px;
    border: 1px solid #00000030;
    box-shadow: none; 
}

.header-search input {
    border: none;
    outline: none;
    width: 100%;
    padding: 8px 12px;
    border-radius: 5px; 
    font-size: 16px;
    background-color: transparent;
}

.header-search button {
    background-color: transparent;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
}
.header-search button:hover{
    background-color: rgba(158, 158, 158, 0.431);
}

.header-search button i {
    color: #000; 
    font-size: 18px;
}

/* Liên kết tài khoản */
.header-auth-links a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.header-auth-links a:hover {
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 2px 4px;
    transition: 0.4s;
    color: white;
}

.header-auth-links i {
    font-size: 20px;
}

.header-auth-links span {
    color: #000; 
}

/* Thêm giỏ hàng */
.header-cart a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.header-cart a:hover {
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 2px 4px;
    transition: 0.4s;
    color: white;
}

.header-cart i {
    font-size: 20px;
}

</style>