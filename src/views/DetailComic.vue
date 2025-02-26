<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import NavHeader from "../components/NavHeader.vue";
import { ref, onMounted, computed } from "vue";
import { useComicStore } from "../store/comicStore";
import { useRoute } from "vue-router";

const comicStore = useComicStore();
const commentText = ref("");
const comments = ref([]);
const rating = ref(0);
const currentPage = ref(1);
const route = useRoute();

// Hàm lấy chi tiết comic
const fetchComicDetail = async (comicId) => {
  await comicStore.fetchComicDetail(comicId);
  await fetchComicContent(comicId, currentPage.value); // Lấy nội dung comic
};

// Hàm lấy nội dung comic
const fetchComicContent = async (comicId, pageNumber) => {
  await comicStore.fetchComicContent(comicId, pageNumber);
};

// Khi component được gắn vào DOM
onMounted(async () => {
  const comicId = route.params.id;
  await fetchComicDetail(comicId);
  window.scrollTo(0, 0); // Cuộn trang về đầu
});

// Hàm gửi bình luận
const submitComment = () => {
  if (commentText.value.trim() !== "") {
    comments.value.push({
      username: "Người dùng",
      text: commentText.value,
      rating: rating.value,
    });
    commentText.value = "";
    rating.value = 0; // Reset số sao sau khi gửi
  }
};

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
  <Header />
  <NavHeader />

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
          <p>
            <strong>Tác giả:</strong> {{ comicStore.comicDetail?.comicAuthor }}
          </p>
          <p><strong>Ngày phát hành:</strong> {{ formattedDate }}</p>
          <p>
            <strong>Thể loại:</strong> {{ comicStore.comicDetail?.comicTypeName }}
          </p>
        </div>
      </div>

      <div class="comic-content-wrapper">
        <div class="comic-content">
          <h3>Nội dung</h3>
          <p>{{ comicStore.comicContent }}</p>
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">Trang trước</button>
            <span>Trang {{ currentPage }} / {{ comicStore.totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === comicStore.totalPages">Trang sau</button>
          </div>
        </div>
      </div>

      <div class="comment-section">
        <h3>Nhận xét</h3>
        <div class="rating">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ active: rating >= star }"
            @click="rating = star"
          >
            ★
          </span>
        </div>
        <div class="comment-input">
          <textarea
            v-model="commentText"
            placeholder="Viết bình luận của bạn..."
            rows="3"
          ></textarea>
          <button class="submit-comment" @click="submitComment">Gửi</button>
        </div>
        <div class="comments-list">
          <div
            class="comment"
            v-for="(comment, index) in comments"
            :key="index"
          >
            <img
              src="../assets/images/slide1.jpg"
              alt="User Avatar"
              class="user-avatar"
            />
            <div>
              <div class="comment-rating">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ active: comment.rating >= star }"
                >
                  ★
                </span>
              </div>
              <strong>{{ comment.username }}:</strong>
              <p>{{ comment.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>


<style scoped>
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

.comment-section {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rating {
  display: flex;
  gap: 5px; /* Khoảng cách giữa các sao */
  margin-bottom: 10px; /* Khoảng cách giữa sao và textarea */
}

.star {
  font-size: 24px;
  color: #ddd; /* Màu sao mặc định */
  cursor: pointer;
  transition: color 0.3s;
}

.star.active {
  color: #ffcc00; /* Màu sao đã chọn */
}

.comment-input {
  display: flex;
  align-items: stretch;
  gap: 10px;
}

.comment-section textarea {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  resize: none;
  font-size: 1rem;
  min-height: 42px;
}

.submit-comment {
  height: 4.9rem;
  background-color: #4caf50;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-comment:hover {
  background-color: #45a049;
}

.comments-list {
  margin-top: 10px;
}

.comment {
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center; /* Căn giữa avatar và nội dung */
}

.user-avatar {
  width: 40px; /* Chiều rộng của avatar */
  height: 40px; /* Chiều cao của avatar */
  border-radius: 50%; /* Làm tròn avatar */
  margin-right: 10px; /* Khoảng cách giữa avatar và tên người dùng */
}

.comment strong {
  color: #4caf50;
}

.comment p {
  margin: 5px 0 0;
  line-height: 1.5;
}
</style>
