<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAdminStore } from '../store/adminStore';

const adminStore = useAdminStore();
const searchTerm = ref(''); 

// Hàm chuyển đổi chuỗi có dấu thành không dấu
const removeVietnameseTones = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
};

// Danh sách truyện được lọc
const filteredComics = computed(() => {
  if (!searchTerm.value) return adminStore.comics;

  const normalizedSearch = removeVietnameseTones(searchTerm.value.toLowerCase());

  return adminStore.comics.filter(comic => 
    removeVietnameseTones(comic.comicName.toLowerCase()).includes(normalizedSearch) ||
    removeVietnameseTones(comic.comicTypeName.toLowerCase()).includes(normalizedSearch)
  );
});

// Lấy danh sách comic khi component được mount
onMounted(() => {
    adminStore.fetchAllComics(); 
});
</script>


<template>
  <div>
    <div class="search-comic-to-update">
      <input type="text" v-model="searchTerm" placeholder="Tìm kiếm truyện..." />
      <RouterLink to="/AddComic" class="btn-add-comic">Thêm truyện</RouterLink>
    </div>
    <div class="comic-container">
      <router-link
        v-for="(comic, index) in filteredComics" 
        :key="index" 
        class="comic-card" 
        :to="`/UpdateComic/${comic.id}`"
        style="text-decoration: none; color: black;">
        <img :src="comic.urlImage" alt="Comic Image" class="comic-image" />
        <div class="comic-info">
          <h3 class="comic-title">{{ comic.comicName }}</h3>
          <p class="comic-author">Tác giả: {{ comic.comicAuthor }}</p>
          <p class="comic-genre">Thể loại: {{ comic.comicTypeName }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

  


<style scoped>

.search-comic-to-update{
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-comic-to-update input{
  margin-right: 20px;
  width: 30%;
  padding: 10px 10px;
  border-radius: 8px;
  outline: none;
  border: 2px solid #4CAF50;

}

.btn-add-comic {
  display: inline-block;
  width: 10%;
  padding: 9px;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  outline: none;
  border: 2px solid #4CAF50;
  text-align: center;
  text-decoration: none;
  color: black;
}

.comic-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 20px;
    max-width: 100%; 
    margin: 0 auto; 
}

.comic-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: calc(20% - 10px); 
    margin: 5px; 
    margin-top: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s;
    cursor: pointer;
}

.comic-card:hover {
    transform: scale(1.05);
}

.comic-image {
    width: 100%;
    height: 300px; 
    object-fit: cover; 
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.comic-info {
    padding: 15px;
}

.comic-title {
    font-size: 16px; 
    margin: 0;
}

.comic-author,
.comic-genre {
    color: #666;
    margin: 5px 0;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.pagination-button {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
}

.page-number {
    margin: 0 5px;
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.page-number.active {
    background-color: #326E51; 
    color: white; 
}

.page-number:hover {
    background-color: #e0e0e0;
}

.input-page {
    width: 50px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    transition: background-color 0.2s;
}

.input-page:hover {
    background-color: #e0e0e0;
}

.comic-title {
    font-size: 16px;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
</style>
