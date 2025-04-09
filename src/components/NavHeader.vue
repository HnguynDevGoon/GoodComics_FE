<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import { useComicStore } from '../store/comicStore';

const comicStore = useComicStore();
const router = useRouter(); // Sử dụng useRouter

// Lấy danh sách thể loại truyện
const fetchComicTypes = async () => {
    await comicStore.fetchComicTypes();
    console.log(comicStore.comicTypes);
};

// Hàm xử lý khi chọn thể loại
const displayComicType = (comicType) => {
    // Gọi API tìm kiếm truyện theo thể loại
    comicStore.searchComicByTypeName(comicType.comicTypeName);
    console.log(`Tìm kiếm truyện thể loại: ${comicType.comicTypeName}`);

    // Chuyển hướng đến trang ListComic và truyền thể loại qua query
    router.push({ name: 'ListComic', query: { type: comicType.comicTypeName } });
};

onMounted(() => {
    fetchComicTypes();
});
</script>

<template>
  <div class="navbar">
    <ul class="navbar-menu">
      <li><RouterLink to="/"><i class="bx bx-home"></i> Trang Chủ</RouterLink></li>
      <li class="dropdown">
        <RouterLink to="#"><i class="bx bx-category"></i> Thể Loại</RouterLink>
        <ul class="dropdown-menu">
          <div class="dropdown-content">
            <div v-for="(comicType, index) in comicStore.comicTypes" :key="index" class="dropdown-item" @click="displayComicType(comicType)">
              {{ comicType.comicTypeName }}
            </div>
          </div>
        </ul>
      </li>
      <li><RouterLink to="/Hobby"><i class='bx bx-heart-circle'></i> Yêu Thích</RouterLink></li>
      <li><RouterLink to="/History"><i class="bx bx-history"></i> Lịch Sử Đọc</RouterLink></li>
      <li><RouterLink to="/Location"><i class='bx bx-current-location'></i> Vị trí</RouterLink></li>
      <!-- <li><RouterLink to="/"><i class='bx bx-message-dots'></i> Đánh giá</RouterLink></li> -->
    </ul>
  </div>
</template>

<style scoped>
.navbar {
    background: var(--background-color);
    padding: 15px 100px; 
    display: flex;
    justify-content: center; 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.navbar-menu {
    list-style: none;
    display: flex;
    gap: 40px; 
}

.navbar-menu li {
    display: inline;
    position: relative;
}

.navbar-menu a {
    text-decoration: none;
    color: var(--text-color); 
    font-size: 18px;
    padding: 10px 15px;
    display: flex;
    align-items: center; 
    gap: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar-menu a:hover {
    background-color: var(--primary-color); 
    color: #fff; 
    border-radius: 5px; 
}

.navbar-menu i {
    font-size: 20px; 
    transition: transform 0.3s ease;
}

.navbar-menu a:hover i {
    transform: translateX(5px); 
}

.dropdown-menu {
    display: none;
    position: absolute; 
    top: 100%; 
    left: 0; 
    background: var(--background-color); 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
    z-index: 1000; 
    padding: 10px; 
    border-radius: 5px; 
    transition: all 0.3s ease; 
}

.dropdown-menu::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    height: 10px; 
    z-index: -1000; 
}

.dropdown:hover .dropdown-menu {
    display: block; 
}

.dropdown-content {
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    gap: 10px;
}

.dropdown-item {
    padding: 10px; 
    text-align: center; 
    border-radius: 5px; 
    transition: background-color 0.3s ease, transform 0.3s ease; 
    white-space: nowrap; 
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: var(--primary-color); 
    color: #fff; 
    transform: scale(1.05); 
}
</style>
