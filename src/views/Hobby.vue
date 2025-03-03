<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store/userStore';  
import { useRouter } from 'vue-router';  // Thêm import useRouter
import NavHeader from '../components/NavHeader.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

const userStore = useUserStore();
const router = useRouter();
const hobbies = ref([]);  

onMounted(async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) {
    window.$dialog.fail("Bạn cần đăng nhập!");
    setTimeout(() => {
      router.push("/");
    }, 1200);
    return;
  }

  if (userData.id) {
    const result = await userStore.getListHobbies(userData.id);
    if (result.success) {
      hobbies.value = result.hobbies || [];

      if (hobbies.value.length === 0) {
        window.$dialog.fail("Bạn chưa có truyện yêu thích!");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }
    } else {
      console.error(result.message);
    }
  }
});

</script>

<template>
  <Header></Header>
  <NavHeader></NavHeader>
  <h1 class="title">Truyện Yêu Thích</h1>
  <div class="comic-container">
    <div v-for="(hobby, index) in hobbies" :key="index" class="comic-card">
      <router-link
        :to="`/DetailComic/${hobby.comicId}`"  
        style="text-decoration: none; color: black;"
      >
        <img :src="hobby.urlImg" alt="Comic Image" class="comic-image" />
        <div class="comic-info">
          <h3 class="comic-title">{{ hobby.comicName }}</h3>
          <p class="comic-author">Tác giả: {{ hobby.comicAuthor }}</p>
          <p class="comic-genre">Thể loại: {{ hobby.comicTypeName }}</p>
        </div>
      </router-link>
    </div>
  </div>

  <Footer></Footer>
</template>



<style scoped>
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
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
}

.comic-author,
.comic-genre {
  color: #666;
  margin: 5px 0;
}

.comic-info h4 {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.comic-info ul {
  padding-left: 20px;
}

.comic-info li {
  font-size: 14px;
  color: #666;
}
</style>
