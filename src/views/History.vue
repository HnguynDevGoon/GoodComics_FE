<script setup>
import { onMounted } from "vue";
import { useComicStore } from "../store/comicStore";
import NavHeader from "../components/NavHeader.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { useRouter } from "vue-router";

const comicStore = useComicStore();
const router = useRouter();

// Hàm lấy lịch sử người dùng
const getHistory = async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData ? userData.id : null;

  if (!userId) {
    window.$dialog.fail('Bạn cần đăng nhập!');
    setTimeout(() => {
        router.push('/');  
    }, 1000);
    return;
  }

  await comicStore.getListHistory(userId);
};

// Chuyển đổi lastRead sang format ngày tháng năm, giờ phút giây
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

onMounted(async () => {
  await getHistory();

  if (!comicStore.listHistory || comicStore.listHistory.length === 0) {
    window.$dialog.fail("Bạn chưa có lịch sử truyện!");
    setTimeout(() => {
      router.push("/");
    }, 1200);
  }
});
</script>

<template>
  <Header />
  <NavHeader />
  <div>
    <h1 class="history-title">Lịch sử đọc</h1>
    <div class="comic-container">
      <div
        v-for="(comic, index) in comicStore.listHistory"
        :key="index"
        class="comic-card"
      >
        <router-link
          :to="`/DetailComic/${comic.id}`"
          style="text-decoration: none; color: black"
        >
          <img :src="comic.urlImg" alt="Comic Image" class="comic-image" />
          <div class="comic-info">
            <h3 class="comic-title">{{ comic.comicName }}</h3>
            <p class="comic-author">Tác giả: {{ comic.comicAuthor }}</p>
            <p class="comic-genre">Thể loại: {{ comic.comicTypeName }}</p>
            <p class="comic-history">
              Lần đọc cuối: {{ formatDate(comic.lastRead) }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.history-title {
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
  color: #333;
}
.comic-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 20px;
  max-width: 90%;
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.comic-author,
.comic-genre,
.comic-history {
  color: #666;
  margin: 5px 0;
}
</style>
