<template>
  <div>
    <div class="search-comic-to-update">
      <input type="text" v-model="searchTerm" placeholder="Tìm kiếm truyện..." />
      <select v-model="selectedSort" class="sort-select">
        <option value="name-asc">Tên truyện A-Z</option>
        <option value="name-desc">Tên truyện Z-A</option>
        <option value="type-asc">Thể loại A-Z</option>
        <option value="type-desc">Thể loại Z-A</option>
        <option value="author-asc">Tác giả A-Z</option>
        <option value="author-desc">Tác giả Z-A</option>
      </select>
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

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAdminStore } from '../store/adminStore';

const adminStore = useAdminStore();
const searchTerm = ref('');
const selectedSort = ref('name-asc');

const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const filteredComics = computed(() => {
  let comics = adminStore.comics;

  if (searchTerm.value) {
    const normalizedSearch = removeVietnameseTones(searchTerm.value.toLowerCase());
    comics = comics.filter(comic =>
      removeVietnameseTones(comic.comicName.toLowerCase()).includes(normalizedSearch) ||
      removeVietnameseTones(comic.comicAuthor.toLowerCase()).includes(normalizedSearch) ||
      removeVietnameseTones(comic.comicTypeName.toLowerCase()).includes(normalizedSearch)
    );
  }

  comics = [...comics];

  switch (selectedSort.value) {
    case 'name-asc':
      comics.sort((a, b) => a.comicName.localeCompare(b.comicName));
      break;
    case 'name-desc':
      comics.sort((a, b) => b.comicName.localeCompare(a.comicName));
      break;
    case 'type-asc':
      comics.sort((a, b) => a.comicTypeName.localeCompare(b.comicTypeName));
      break;
    case 'type-desc':
      comics.sort((a, b) => b.comicTypeName.localeCompare(a.comicTypeName));
      break;
    case 'author-asc':
      comics.sort((a, b) => a.comicAuthor.localeCompare(b.comicAuthor));
      break;
    case 'author-desc':
      comics.sort((a, b) => b.comicAuthor.localeCompare(a.comicAuthor));
      break;
  }

  return comics;
});

onMounted(() => {
  adminStore.fetchAllComics();
});
</script>

<style scoped>
.search-comic-to-update {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.search-comic-to-update input {
  width: 30%;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #4CAF50;
  outline: none;
}

.sort-select {
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #4CAF50;
  background-color: white;
  outline: none;
  cursor: pointer;
}

.btn-add-comic {
  padding: 10px 15px;
  border-radius: 8px;
  background-color: white;
  border: 2px solid #4CAF50;
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.comic-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0px;
  max-width: 100%;
  margin: 0 auto;
}

.comic-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: calc(25% - 10px);
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.comic-author,
.comic-genre {
  color: #666;
  margin: 5px 0;
}
</style>
