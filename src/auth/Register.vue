<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import NavHeader from "../components/NavHeader.vue";
import { useUserStore } from "../store/userStore";

// Khởi tạo store và router
const userStore = useUserStore();
const router = useRouter();

// Các biến dữ liệu
const avatarPreview = ref("");
const fileInput = ref(null);
const avatar = ref(null);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

// toggle password
const showPassword = ref(false);
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

// Các hàm xử lý file ảnh
const handleAvatarChange = (event) => { 
    const file = event.target.files[0];
    if (file) {
        avatar.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const triggerFileInput = () => {
    fileInput.value.click();
};

// Hàm xử lí đăng ký
const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Mật khẩu xác nhận không khớp!";
        window.$dialog.fail(errorMessage.value);
        return;
    }

    const formData = new FormData();
    formData.append("Username", username.value);
    formData.append("Email", email.value);
    formData.append("Password", password.value);
    if (avatar.value) {
        formData.append("Urlavartar", avatar.value);
    }

    // Gọi API
    const result = await userStore.createUser(formData);

    console.log("Response từ API:", result);

    if (!result || !result.success) {  
        console.error("Đăng ký thất bại:", result?.message);
        window.$dialog.fail(result?.message || "Lỗi không xác định!");
        return; 
    }

    window.$dialog.success(result.message);

    setTimeout(() => {
        router.push("/Login"); 
    }, 1000);
};

</script>

<template>
    <Header></Header>
    <NavHeader></NavHeader>

    <div class="form-register-container">
        <div class="register-box">
            <h2>Đăng Ký</h2>
            <form @submit.prevent="handleRegister">
                <div class="avatar-upload" @click="triggerFileInput">
                    <input type="file" ref="fileInput" id="avatarInput" accept="image/*" class="avatar-input" @change="handleAvatarChange" />
                    <div class="avatar-preview" v-if="avatarPreview">
                        <img :src="avatarPreview" alt="Avatar Preview" class="avatar-image" />
                    </div>
                    <div class="avatar-placeholder" v-else>
                        <span>Bấm để chọn ảnh</span>
                    </div>
                </div>
                <div class="input-box">
                    <input v-model="username" type="text" required />
                    <label>Tên đăng nhập</label>
                </div>
                <div class="input-box">
                    <input v-model="email" type="email" required />
                    <label>Email</label>
                </div>
                <div class="input-box">
                    <input v-model="password" :type="showPassword ? 'text' : 'password'" required />
                    <label>Mật khẩu</label>
                    <span class="toggle-icon" @click="togglePassword">
                        {{ showPassword ? "👁️" : "🙈" }}
                    </span>
                </div>
                <div class="input-box">
                    <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" required />
                    <label>Xác nhận mật khẩu</label>
                    <span class="toggle-icon" @click="togglePassword">
                        {{ showPassword ? "👁️" : "🙈" }}
                    </span>
                </div>
                <div class="register-info">
                    <span>Bạn đã có tài khoản?</span>
                    <RouterLink to="/Login">Đăng nhập ngay</RouterLink>
                </div>
                <button type="submit" class="btn-register" :disabled="userStore.loading">
                    Đăng ký
                </button>
            </form>
        </div>
    </div>

    <Footer></Footer>
</template>



<style scoped>
.form-register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
}

.register-box {
    width: 350px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45);
    text-align: center;
}

.register-box h2 {
    margin-bottom: 20px;
    color: #333;
}

.avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
}

.avatar-input {
    display: none;
}

.avatar-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.avatar-placeholder {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #666;
    border: 2px dashed #ccc;
}

.input-box {
    position: relative;
    margin-bottom: 20px;
    margin-top: 30px;
}

.input-box input {
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    font-size: 16px;
    transition: 0.3s;
    background: transparent;
}

.input-box label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #aaa;
    transition: 0.3s;
    pointer-events: none;
}

.input-box input:focus {
    border-bottom: 2px solid #4caf50;
}

.input-box input:focus + label,
.input-box input:not(:placeholder-shown) + label {
    top: -3px;
    font-size: 14px;
    color: #4caf50;
}

.register-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 20px;
}

.register-info span {
    color: #666;
}

.register-info a {
    text-decoration: none;
    color: #4caf50;
    font-weight: bold;
    transition: 0.3s;
}

.register-info a:hover {
    color: #388e3c;
}

.btn-register {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-register:hover {
    background-color: #45a049;
}

.toggle-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
}
</style>