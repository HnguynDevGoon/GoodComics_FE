import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
    const loading = ref(false);
    const error = ref(null);
    const user = ref(null);

    const loadUserFromLocalStorage = () => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser && storedUser !== 'undefined') {
                user.value = JSON.parse(storedUser);
            } else {
                user.value = null;
            }
        } catch (e) {
            console.error("Lỗi khi phân tích dữ liệu người dùng từ localStorage", e);
            user.value = null;
        }
    };

    // Gọi hàm loadUserFromLocalStorage khi khởi tạo store
    loadUserFromLocalStorage();

    const setUser = (userData) => {
        console.log("Đang lưu vào localStorage: ", userData); 
        user.value = userData;
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const createUser = async (userData) => {
        loading.value = true;
        error.value = null;
    
        try {
            const response = await axios.post(
                "https://localhost:7064/api/User/CreateUser", userData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data.status === 200) {
                return { success: true, message: response.data.message || "Đăng ký thành công!" };
            } else {
                return { success: false, message: response.data.message || "Lỗi không xác định!" };
            }
        } catch (err) {
            error.value = err.response?.data?.message || "Không thể kết nối tới server!";
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };

    const login = async (username, password) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.post("https://localhost:7064/api/User/UserLogin", {
                username: username,
                password: password
            });

            console.log("Kết quả đăng nhập:", response.data);

            if (response.data.status === 200 && response.data.data) {
                setUser(response.data.data);
                return { success: true, message: response.data.message || "Đăng nhập thành công!" };
            } else {
                return { success: false, message: response.data.message || "Đăng nhập thất bại!" };
            }
        } catch (err) {
            error.value = err.response?.data?.message || "Không thể kết nối tới server!";
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        user.value = null;
    };

    const changePassword = async (oldPassword, newPassword) => {
        loading.value = true;
        error.value = null;
    
        try {
            const storedUser = localStorage.getItem("user");
            const userData = storedUser ? JSON.parse(storedUser) : null;
    
            if (!userData || !userData.id) {
                throw new Error("Người dùng không tồn tại trong local storage.");
            }
    
            // Gửi yêu cầu PUT với các tham số truyền qua query string
            const response = await axios.put(`https://localhost:7064/api/User/ChangePassword`, null, {
                params: {
                    userId: userData.id,
                    oldPass: oldPassword,
                    newPass: newPassword
                }
            });
    
            if (response.data.status === 200) {
                return { success: true, message: response.data.message || "Đổi mật khẩu thành công!" };
            } else {
                return { success: false, message: response.data.message || "Đổi mật khẩu thất bại!" };
            }
        } catch (err) {
            error.value = err.response?.data?.message || "Không thể kết nối tới server!";
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };
    
    
    const updateAvatar = async (formData) => {
        loading.value = true;
        error.value = null;
    
        try {
            const storedUser = localStorage.getItem("user");
            const userData = storedUser ? JSON.parse(storedUser) : null;
    
            if (!userData || !userData.id) {
                throw new Error("Người dùng không tồn tại trong local storage.");
            }
    
            // Thêm ID vào formData
            formData.append("Id", userData.id);
    
            const response = await axios.put("https://localhost:7064/api/User/UpdateAvatar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            if (response.data.status === 200) {
                // Cập nhật thông tin người dùng mới vào store nếu cần
                setUser(response.data.data);
                return { success: true, message: response.data.message || "Cập nhật avatar thành công!" };
            } else {
                return { success: false, message: response.data.message || "Lỗi cập nhật avatar!" };
            }
        } catch (err) {
            error.value = err.response?.data?.message || "Không thể kết nối tới server!";
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };

    const forgotPassword = async (email) => {
        loading.value = true;
        error.value = null;
    
        try {
            console.log("Gửi yêu cầu quên mật khẩu với email:", email);

            const response = await axios.post(
                `https://localhost:7064/api/User/ForgotPassword?email=${encodeURIComponent(email)}`
                // encodeURIComponent: Được sử dụng để mã hóa email trong trường hợp có ký tự đặc biệt.
            );
    
            console.log("Phản hồi từ API:", response.data);
    
            if (response.data.status === 200) {
                return { success: true, message: response.data.message || "Mã OTP đã gửi!" };
            } else {
                return { success: false, message: response.data.message || "Gửi OTP thất bại!" };
            }
        } catch (err) {
            console.error("Lỗi API:", err.response?.data);
            error.value = err.response?.data?.message || "Không thể kết nối tới server!";
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };
    
    const checkOtp = async (otp) => {
        loading.value = true;
        error.value = null;
    
        try {
            const response = await axios.post(`https://localhost:7064/api/User/CheckOtp?otp=${otp}`, null);
            console.log("Phản hồi từ API:", response);
            if (response.data.status === 200) {
                const userId = parseInt(response.data.message);
                localStorage.removeItem("userData"); // Xóa thông tin cũ
                localStorage.setItem("userData", JSON.stringify({ userId, expiredTime: Date.now() + 5 * 60 * 1000 })); // Lưu thông tin mới
                return { success: true, userId: userId, message: response.data.message || "Mã OTP hợp lệ!" };
            } else {
                return { success: false, message: response.data.message || "Mã OTP không hợp lệ!" };
            }
        } catch (err) {
            console.error("Chi tiết lỗi:", err);
            error.value = err.response?.data?.message || "Không thể kết nối tới server!";
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };
    
    const updatePassAfterOtp = async (newPassword, confirmPass) => {
        loading.value = true;
        error.value = null;
    
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const userId = userData ? userData.userId : null;
    
            if (!userId) {
                throw new Error("Không tìm thấy thông tin người dùng để đặt lại mật khẩu!");
            }
    
            const response = await axios.put(`https://localhost:7064/api/User/UpdatePassAfterOtp`, null, {
                params: {
                    userId: userId,
                    newPass: newPassword,
                    confirmPass: confirmPass
                }
            });
    
            if (response.data.status === 200) {
                localStorage.removeItem("userData"); 
                return { success: true, message: response.data.message || "Cập nhật mật khẩu thành công!" };
            } else {
                return { success: false, message: response.data.message || "Cập nhật mật khẩu thất bại!" };
            }
        } catch (err) {
            error.value = err.response?.data?.message || "Xác nhận OTP trước khi vào đây!";
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };
    
    
    
    

    return { 
        loading, 
        error,
        user, 
        createUser, 
        login, 
        logout,
        changePassword,
        updateAvatar,
        forgotPassword,
        checkOtp,
        updatePassAfterOtp,
    };
});
