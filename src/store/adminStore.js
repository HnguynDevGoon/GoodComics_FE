import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAdminStore = defineStore("admin", () => {
    const users = ref([]);
    const loading = ref(false);
    const currentPage = ref(1); // Trang hiện tại
    const pageSize = ref(999999); 
    

    const fetchUsers = async (pageNumber = 1, pageSize = 1) => {
        loading.value = true;
        try {
            const response = await axios.get(`https://localhost:7064/api/User/GetListUser?pageSize=${pageSize}&pageNumber=${pageNumber}`);
             users.value = response.data.filter(user => user.roleId !== 1); 
             console.log(users.value);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
        } finally {
            loading.value = false;
        }
    };

    // Tính toán tổng số trang, lấy từ số lượng người dùng
    const totalPages = computed(() => {
        return Math.max(1, Math.ceil(3 / pageSize.value)); 
    });

    const deleteUser = async (userId) => {
        try {
          console.log("Đang xóa user có ID:", userId);
          const response = await axios.delete(`https://localhost:7064/api/User/DeleteUser?userId=${userId}`);
          console.log("Xóa người dùng thành công:", response.data);
          users.value = users.value.filter(user => user.id !== userId); 
        } catch (error) {
          console.error("Lỗi khi xóa người dùng:", error.response ? error.response.data : error.message);
        }
      };
      


      // Hàm lấy danh sách truyện theo trang
    const comics = ref([]); // Danh sách truyện
    let pageSizeComic = 999999; // Số lượng comic trên mỗi trang
    const fetchAllComics = async (pageNumber = 1) => { 
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/GetListComic?pageNumber=${pageNumber}&pageSize=${pageSizeComic}`);

            const data = response.data;
            comics.value = data.comics; 
            console.log(comics.value);
        } catch (error) {
            console.error("Không thể lấy danh sách truyện tranh:", error);
        }
    };

    const updateComicContent = async (comicId, pageNumber, conTent) => {
        const formData = new FormData();
        formData.append('comicId', comicId);
        formData.append('pageNumber', pageNumber);
        formData.append('conTent', conTent);
    
        try {
            const response = await axios.put(`https://localhost:7064/api/Comic/UpdateContentbyAdmin`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });
    
            console.log("Cập nhật nội dung truyện thành công:", response.data.message);
            return { success: true, message: response.data.message };
        } catch (error) {
            const statusCode = error.response?.status || 500;
            const message = error.response?.data?.message || "Lỗi không xác định!";
            console.error(`Lỗi (${statusCode}):`, message);
            return { success: false, statusCode, message };
        }
    };
    
    
    

    return { 
        users, 
        loading, 
        fetchUsers,
        currentPage,
        pageSize,
        totalPages,
        deleteUser,
        fetchAllComics,
        comics,
        updateComicContent,
    };
});
