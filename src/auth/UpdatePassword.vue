<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import NavHeader from '../components/NavHeader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const newPassword = ref('');
const confirmPassword = ref('');

const showPassword = ref(false); 
const togglePassword = () => {
    showPassword.value = !showPassword.value; 
};

const submitUpdatePassword = async (event) => {
    event.preventDefault();
    
    if (newPassword.value !== confirmPassword.value) {
        window.$dialog.fail("Xác nhận mật khẩu không khớp!");
        return;
    }

    const result = await userStore.updatePassAfterOtp(newPassword.value, confirmPassword.value);
    if (result.success) {
        window.$dialog.success(result.message);
        setTimeout(() => {
            router.push('/login'); 
        }, 1000);
    } else {
        window.$dialog.fail(result.message);
    }
};
</script>

<template>
    <Header />
    <NavHeader />
    <div class="form-update-password-container">
        <div class="update-password-box">
            <h2>Cập Nhật Mật Khẩu</h2>
            <form @submit.prevent="submitUpdatePassword">
                <div class="input-box">
                    <input 
                        v-model="newPassword" 
                        :type="showPassword ? 'text' : 'password'" 
                        required 
                    />
                    <label>Mật khẩu mới</label>
                    <span class="toggle-icon" @click="togglePassword">{{ showPassword ? "👁️" : "🙈" }}</span>
                </div>  
                <div class="input-box">
                    <input 
                        v-model="confirmPassword" 
                        :type="showPassword ? 'text' : 'password'" 
                        required 
                    />
                    <label>Xác nhận mật khẩu</label>
                    <span class="toggle-icon" @click="togglePassword">{{ showPassword ? "👁️" : "🙈" }}</span>
                </div>
                <button type="submit" class="btn-update-password">Cập nhật</button>
            </form>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
.form-update-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    background-color: #ffffff;
}

.update-password-box {
    width: 350px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45);
    text-align: center;
}

.update-password-box h2 {
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

.btn-update-password {
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

.btn-update-password:hover {
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
