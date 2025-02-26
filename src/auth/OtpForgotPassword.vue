<template>
    <Header></Header>
    <NavHeader></NavHeader>

    <div class="form-otp-container">
        <div class="otp-box">
            <h2>Quên Mật Khẩu</h2>
            <form @submit.prevent="submitOtp">
                <div class="input-box">
                    <input type="text" v-model="otp" required maxlength="6" />
                    <label>Mã OTP</label>
                </div>
                <div class="otp-info">
                    <span>Nhập mã OTP đã được gửi vào email của bạn.</span>
                </div>
                <div class="countdown">
                    <span>Mã OTP hết hạn sau: {{ countdown }} giây</span>
                </div>

                <button type="submit" class="btn-otp">Xác nhận OTP</button>
            </form>
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import NavHeader from '../components/NavHeader.vue';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const countdown = ref(120); 
const otp = ref('');
const userStore = useUserStore();
let intervalId;

const startCountdown = () => {
    countdown.value = 120; 
    intervalId = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            clearInterval(intervalId);
        }
    }, 1000);
};

const submitOtp = async () => {
    if (!otp.value) {
        window.$dialog.fail("Vui lòng nhập mã OTP!");
        return;
    }

    console.log("Gửi mã OTP:", otp.value);
    const result = await userStore.checkOtp(otp.value); 
    console.log("Kết quả kiểm tra OTP:", result);
    
    if (result.success) {
        window.$dialog.success("Xác nhận OTP thành công!");
        setTimeout(() => {
            router.push('/updatepassword'); 
        }, 1000);
    } else {
        window.$dialog.fail(result.message);
    }
};

onMounted(() => {
    startCountdown(); 
});

onUnmounted(() => {
    clearInterval(intervalId); 
});
</script>





<style scoped>
.form-otp-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    background-color: #ffffff;
}

.otp-box {
    width: 350px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45);
    text-align: center;
}

.otp-box h2 {
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

.otp-info {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

.otp-info span {
    display: block;
    color: #666;
}

.countdown {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

.btn-otp {
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

.btn-otp:hover {
    background-color: #45a049;
}
</style>
