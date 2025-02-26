<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import NavHeader from "../components/NavHeader.vue";

const router = useRouter();
const userStore = useUserStore();
const username = ref("");
const password = ref("");

// toggle password
const showPassword = ref(false);
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
    if (!username.value.trim() || !password.value.trim()) {
        window.$dialog.fail("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const result = await userStore.login(username.value, password.value);

    console.log("Kết quả đăng nhập:", result);

    if (!result.success) {
        window.$dialog.fail(result.message);
        return;
    }

    window.$dialog.success("Đăng nhập thành công!");

    // logout auto sau 1 ngày
    setTimeout(() => {
        localStorage.removeItem("user"); 
    }, 24 * 60 * 60 * 1000); 

    setTimeout(() => {
        router.push("/"); 
    }, 1000);
};
</script>

<template>
    <Header />
    <NavHeader />

    <div class="form-login-container">
        <div class="login-box">
            <h2>Đăng Nhập</h2>
            <form @submit.prevent="handleLogin">
                <div class="input-box">
                    <input v-model="username" type="text" required />
                    <label>Tên đăng nhập</label>
                </div>
                <div class="input-box">
                    <input v-model="password" :type="showPassword ? 'text' : 'password'" required />
                    <label>Mật khẩu</label>
                    <span class="toggle-icon" @click="togglePassword">
                        {{ showPassword ? "👁️" : "🙈" }}
                    </span>
                </div>
                <div class="login-info">
                    <span>Bạn chưa có tài khoản?</span>
                    <RouterLink to="/Register">Đăng ký ngay</RouterLink>
                </div>
                <div class="login-info">
                    <span></span>
                    <RouterLink to="/forgotpassword" class="forgot-password">Quên mật khẩu?</RouterLink>
                </div>
                <button type="submit" class="btn-login">Đăng nhập</button>
            </form>
        </div>
    </div>

    <Footer />
</template>


<style scoped>
.form-login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    background-color: #ffffff;
}

.login-box {
    width: 350px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45);
    text-align: center;
}

.login-box h2 {
    margin-bottom: 20px;
    color: #333;
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

.login-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 20px;
}

.login-info span {
    color: #666;
}

.login-info a {
    text-decoration: none;
    color: #4caf50;
    font-weight: bold;
    transition: 0.3s;
}

.login-info a:hover {
    color: #388e3c;
}

.btn-login {
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

.btn-login:hover {
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
