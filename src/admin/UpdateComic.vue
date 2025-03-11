<script setup>
import { ref, onMounted, computed } from "vue";
import { useComicStore } from "../store/comicStore";
import Dashboard from "../components/Dashboard.vue";
import { useRoute } from "vue-router";
import { useAdminStore } from "../store/adminStore";

const adminStore = useAdminStore();
const comicStore = useComicStore();
const currentPage = ref(1);
const route = useRoute();

// Hàm lấy chi tiết comic
const fetchComicDetail = async (comicId) => {
  await comicStore.fetchComicDetail(comicId);
  await fetchComicContent(comicId, currentPage.value);
};

// Hàm lấy nội dung comic
const fetchComicContent = async (comicId, pageNumber) => {
  await comicStore.fetchComicContent(comicId, pageNumber);
};

const updateComic = async () => {
  const comicId = route.params.id;
  const pageNumber = currentPage.value;
  const conTent = comicStore.comicContent; 

  const result = await adminStore.updateComicContent(comicId, pageNumber, conTent);
  
  if (!result.success) {
    window.$dialog.fail(result.message);
  } else {
    window.$dialog.success(result.message);
  }
};


// Khi component được gắn vào DOM
onMounted(async () => {
  const comicId = route.params.id;
  console.log(comicId);
  await fetchComicDetail(comicId);
  window.scrollTo(0, 0);
});

// Định dạng ngày
const formattedDate = computed(() => {
  if (!comicStore.comicDetail?.createDate) return "";

  const date = new Date(comicStore.comicDetail.createDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
});

// Hàm phân trang
const nextPage = () => {
  if (currentPage.value < comicStore.totalPages) {
    currentPage.value++;
    fetchComicContent(route.params.id, currentPage.value);
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchComicContent(route.params.id, currentPage.value);
  }
};
</script>

<template>
  <div class="container-dashboard">
    <Dashboard></Dashboard>
    <div class="main">
      <h1>Sửa truyện</h1>

      <div class="container">
        <div class="detail-container">
          <div class="comic-detail">
            <img
              :src="comicStore.comicDetail?.urlImage"
              alt="Comic Name"
              class="comic-image"
            />
            <div class="comic-info">
              <h2>{{ comicStore.comicDetail?.comicName }}</h2>
              <p><strong>Tác giả:</strong> {{ comicStore.comicDetail?.comicAuthor }}</p>
              <p><strong>Ngày phát hành:</strong> {{ formattedDate }}</p>
              <p><strong>Thể loại:</strong> {{ comicStore.comicDetail?.comicTypeName }}</p>
            </div>
          </div>

          <div class="comic-content-wrapper">
            <div class="comic-content">
              <h3>Nội dung</h3>
              <p>{{ comicStore.comicContent }}</p>
              <div class="pagination">
                <button @click="previousPage" :disabled="currentPage === 1">Trang trước</button>
                <span>
                  Trang
                  <select class="select-page" v-model="currentPage" @change="fetchComicContent(route.params.id, currentPage)">
                    <option class="select-page_option" v-for="page in comicStore.totalPages" :key="page" :value="page">
                      {{ page }}
                    </option>
                  </select>
                  / {{ comicStore.totalPages }}
                </span>
                <button @click="nextPage" :disabled="currentPage === comicStore.totalPages">Trang sau</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Thêm textarea để cập nhật nội dung truyện -->
      <div class="updatecomic">
        <h3>Cập nhật nội dung truyện</h3>
        <textarea v-model="comicStore.comicContent" class="content-textarea"></textarea>
        <button @click="updateComic">Lưu cập nhật</button>
      </div>
    </div>
  </div>
</template>






<style scoped>
.updatecomic {
  margin-top: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h3 {
  font-size: 22px;
  color: #4caf50;
  margin-bottom: 10px;
}

.content-textarea {
  width: 100%;
  height: 450px;
  font-size: 18px;
  padding: 15px;
  border: 2px solid #4caf50;
  border-radius: 10px;
  resize: vertical;
  font-family: Arial, sans-serif;
  line-height: 2;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.content-textarea:focus {
  border-color: #388e3c;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
  outline: none;
}

.container {
  background-color: #5050501b;
  display: flex;
  justify-content: center;
  padding: 30px;
  max-width: 1550px;
  margin: auto;
}

.detail-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comic-detail {
  display: flex;
  gap: 30px;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}

.comic-detail:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.comic-image {
  width: 350px;
  height: 450px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #ddd;
}

.comic-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  font-size: 1.1rem;
  color: #333;
}

.comic-content-wrapper {
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comic-content {
  padding: 20px;
  background: #eeeeee;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: justify;
  line-height: 2;
  font-size: 1.15rem;
}

h3 {
  margin-bottom: 10px;
  color: #4caf50;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.select-page {
  font-size: 18px;
  border: none;
  padding: 8px;
  background-color: #eeeeee;
  border-radius: 40%;
  cursor: pointer;
  outline: none;
  border-bottom: 1px solid black;
}

.select-page_option {
  font-style: italic;
  font-size: 18px;
  background-color: #ffffff;
}
</style>
