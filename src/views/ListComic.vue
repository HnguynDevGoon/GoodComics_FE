<script setup>
import Header from "../components/Header.vue";
import NavHeader from "../components/NavHeader.vue";
import Footer from "../components/Footer.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useComicStore } from "../store/comicStore";

const comicStore = useComicStore();
const comics = ref([]);
const route = useRoute();
const noResults = ref(false);
const visibleCount = ref(4); // Số lượng truyện hiển thị ban đầu

// Hàm tìm kiếm truyện theo tên từ store
const searchComicByName = async (comicName) => {
  await comicStore.searchComicByName(comicName);
  comics.value = comicStore.searchName;
  noResults.value = comics.value.length === 0;
};

// Hàm lấy thể loại từ query
const fetchComicsByType = async (comicTypeName) => {
  if (comicTypeName) {
    await comicStore.searchComicByTypeName(comicTypeName);
    comics.value = comicStore.searchComic;
    noResults.value = comics.value.length === 0;
  }
};

// Hàm lưu lịch sử khi người dùng click vào truyện
const historyComic = async (comicId) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData ? userData.id : null;

  if (userId && comicId) {
    await comicStore.historyComicAfterClick(userId, comicId);
  }
};

// Hàm gọi khi component mount
onMounted(() => {
  const comicTypeName = route.query.type;
  const searchQuery = route.query.search;

  if (comicTypeName) {
    fetchComicsByType(comicTypeName);
  }

  if (searchQuery) {
    searchComicByName(searchQuery);
  }
});

// Theo dõi sự thay đổi của query type và search trong URL
watch(
  () => route.query.type,
  (newType) => {
    if (newType) {
      fetchComicsByType(newType);
    }
  }
);

watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch) {
      searchComicByName(newSearch);
    }
  }
);

// Hàm load thêm truyện
const loadMore = () => {
  visibleCount.value += 4;
};
</script>

<template>
  <Header />
  <NavHeader />
  <div class="comic-list">
    <p v-if="noResults" class="no-results">Không có kết quả</p>

    <router-link
      v-for="(comic, index) in comics.slice(0, visibleCount)"
      :key="comic.id"
      :to="`/DetailComic/${comic.id}`"
      @click="historyComic(comic.id)"
      style="text-decoration: none; color: black"
    >
      <div class="comic-item">
        <img :src="comic.urlImage" class="comic-image" />
        <div class="comic-content">
          <h3>{{ comic.comicName }}</h3>
          <div class="comic-details">
            <p>
              Tác giả: <span class="author">{{ comic.comicAuthor }}</span>
            </p>
            <p>
              Thể loại: <span class="type">{{ comic.comicTypeName }}</span>
            </p>
          </div>
        </div>
      </div>
    </router-link>

    <button v-if="visibleCount < comics.length" @click="loadMore" class="load-more">
      Xem thêm
    </button>

  </div>
  <Footer />
</template>


<style scoped>
.no-results {
  color: red;
  font-size: 18px;
  text-align: center;
  margin: 20px;
}

.comic-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 15px;
  width: 95%;
  max-width: 1100px;
  margin: 0 auto;
}
.comic-item:hover{
    background: rgba(128, 128, 128, 0.145);
}

.comic-image {
  width: 240px;
  height: 270px;
  object-fit: cover;
  margin-right: 15px;
}

.comic-content {
  flex: 1;
  padding-right: 10px;
}

.comic-details p {
  margin: 5px 0;
}

.author {
  font-weight: bold;
  color: #007bff;
}

.type {
  color: green;
}

.load-more {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.load-more:hover {
  background-color: #45a049;
}
</style>
