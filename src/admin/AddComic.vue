<script setup>
import { ref } from "vue";
import { useComicStore } from "../store/comicStore";  
import "../assets/css/DashboardCss.css";
import Dashboard from "../components/Dashboard.vue";
import { useRouter } from "vue-router";


const comicStore = useComicStore();
const router = useRouter();

const comicName = ref("");
const comicContent = ref("");
const comicAuthor = ref("");
const createDate = ref("");
const comicTypeId = ref("");
const urlImage = ref("");
const imagePreview = ref(null);

// Danh sách thể loại truyện
const comicTypes = [
  { id: 2, name: "Ngôn Tình" },
  { id: 3, name: "Hài Hước" },
  { id: 4, name: "Dân Gian" },
  { id: 5, name: "Truyện Ngắn" },
  { id: 6, name: "Tiểu Thuyết" },
  { id: 7, name: "Kinh Dị" },
  { id: 8, name: "Việt Nam" },
  { id: 9, name: "Tâm Sự" }
];

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    urlImage.value = URL.createObjectURL(file);
    imagePreview.value = file;
  }
};

const triggerFileInput = () => {
  document.getElementById("fileInput").click();
};

// Thêm truyện
const addNewComic = async () => {

  window.$dialog.success("Loading...");  

  const result = await comicStore.addComic({
    comicName: comicName.value,
    comicContent: comicContent.value,
    comicAuthor: comicAuthor.value,
    createDate: createDate.value,
    urlImage: imagePreview.value,
    comicTypeId: comicTypeId.value
  });

  if (result.success) {
    window.$dialog.success(result.message);  
  } else {
    window.$dialog.fail("Vui lòng không bỏ trống thông tin truyện!");  
  }
};
</script>

<template>
  <div class="container-dashboard">
    <Dashboard />
    <div class="main">
      <h1>Thêm truyện</h1>
      <div class="form-container">
        <div class="form-group">
          <label>Hình ảnh truyện</label>
          <div class="image-upload" @click="triggerFileInput">
            <img v-if="urlImage" :src="urlImage" alt="Preview" />
            <span v-else>Chọn ảnh</span>
          </div>
          <input
            id="fileInput"
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            hidden
          />
        </div>
        <div class="form-group">
          <label for="comicName">Tên truyện</label>
          <input
            id="comicName"
            type="text"
            v-model="comicName"
            placeholder="Nhập tên truyện..."
          />
        </div>

        <div class="form-group">
          <label for="comicContent">Nội dung truyện</label>
          <textarea
            id="comicContent"
            v-model="comicContent"
            placeholder="Nhập nội dung truyện..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="comicAuthor">Tác giả</label>
          <input
            id="comicAuthor"
            type="text"
            v-model="comicAuthor"
            placeholder="Nhập tên tác giả..."
          />
        </div>

        <div class="form-group">
          <label for="createDate">Ngày tạo</label>
          <input id="createDate" type="date" v-model="createDate" />
        </div>

        <div class="form-group">
          <label for="comicTypeId">Chọn thể loại</label>
          <select id="comicTypeId" v-model="comicTypeId">
            <option v-for="type in comicTypes" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>

      </div>
      <button style="margin-right: 25px;" class="submit-btn" @click="router.push('/ComicManagerment')">Về trang sửa truyện</button>
      <button class="submit-btn" @click="addNewComic">Thêm truyện</button>
    </div>
  </div>
</template>



<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group select {
  width: 140px;
  border: 2px solid #4caf50;
  padding: 12px;
  outline: none;
  cursor: pointer;
}

.form-group select option{
  font-size: 1rem;
  cursor: pointer;
}

input,
textarea {
  padding: 10px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #45a049;
}

textarea {
  height: 100px;
  resize: vertical;
}

input[type="date"] {
  padding: 8px;
}

.submit-btn {
  padding: 10px 40px;
  background: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #45a049;
}

.image-upload {
  width: 280px;
  height: 300px;
  border: 2px dashed #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
  background: #f9f9f9;
  transition: 0.3s;
}

.image-upload:hover {
  background: #e8f5e9;
}

.image-upload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.image-upload span {
  font-size: 14px;
  color: #777;
}
</style>
