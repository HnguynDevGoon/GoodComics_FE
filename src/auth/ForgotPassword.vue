<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userStore"; 
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import NavHeader from "../components/NavHeader.vue";
import { useRouter } from "vue-router";

const email = ref("");
const userStore = useUserStore();
const router = useRouter();

const handleForgotPassword = async () => {
    if (!email.value) {
        window.$dialog.fail("Vui lòng nhập email!");
        return;
    }
    console.log("Gửi email:", email.value);
    const response = await userStore.forgotPassword(email.value);

    if (response.success) {
        window.$dialog.success(response.message);
        router.push("/Otpforgotpassword");
    } else {
        window.$dialog.fail(response.message);
    }
};
</script>

<template>
    <Header></Header>
    <NavHeader></NavHeader>

    <div class="form-forgot-password-container">
        <div class="forgot-password-box">
            <h2>Quên Mật Khẩu</h2>
            <form @submit.prevent="handleForgotPassword">
                <div class="input-box">
                    <input type="email" v-model="email" />
                    <label>Email</label>
                </div>
                <div class="forgot-password-info">
                    <span>Nhập email của bạn để nhận mã OTP</span>
                </div>

                <button type="submit" class="btn-forgot-password">Gửi mã OTP</button>
            </form>
        </div>
    </div>

    <Footer></Footer>
</template>


<style scoped>
.form-forgot-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    background-color: #ffffff;
}

.forgot-password-box {
    width: 350px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45);
    text-align: center;
}

.forgot-password-box h2 {
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

.forgot-password-info {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

.forgot-password-info span {
    display: block;
    color: #666;
}

.btn-forgot-password {
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

.btn-forgot-password:hover {
    background-color: #45a049;
}
</style>
