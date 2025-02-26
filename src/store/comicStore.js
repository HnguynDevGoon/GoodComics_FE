import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useComicStore = defineStore("comic", () => {
    const comicTypes = ref([]); // Danh sách thể loại truyện
    const comics = ref([]); // Danh sách truyện
    const currentPage = ref(1); // Trang hiện tại
    const totalPages = ref(1); // Tổng số trang
    const pageSize = 10; // Số lượng comic trên mỗi trang
    const comicDetail = ref(null); // Thông tin chi tiết của comic
    const comicContent = ref(''); // Nội dung truyện

    // Hàm lấy danh sách thể loại truyện
    const fetchComicTypes = async () => {
        try {
            const response = await axios.get('https://localhost:7064/api/ComicType/GetListComicType');
            comicTypes.value = response.data; 
        } catch (error) {
            console.error("Không thể lấy danh sách thể loại:", error);
        }
    };

    // Hàm lấy danh sách truyện theo trang
    const fetchComics = async (pageNumber = 1) => { 
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/GetListComic?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const data = response.data;
            comics.value = data.comics; 
            totalPages.value = data.totalPages; // Cập nhật tổng số trang
            currentPage.value = data.currentPage; // Cập nhật trang hiện tại
        } catch (error) {
            console.error("Không thể lấy danh sách truyện tranh:", error);
        }
    };

    // Hàm lấy thông tin chi tiết của comic
    const fetchComicDetail = async (comicId) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/GetComicById?comicId=${comicId}`);
            comicDetail.value = response.data.data; // Lưu thông tin chi tiết vào biến comicDetail
        } catch (error) {
            console.error("Không thể lấy thông tin chi tiết truyện tranh:", error);
        }
    };

    // Hàm để lấy nội dung của comic
    const fetchComicContent = async (comicId, pageNumber) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/GetComicContent?comicId=${comicId}&pageNumber=${pageNumber}`);
            comicContent.value = response.data; // Lưu nội dung vào biến comicContent
    
            // Tính toán tổng số trang trên frontend
            const totalWords = comicContent.value.split(' ').length; // Đếm số từ trong nội dung
            totalPages.value = Math.ceil(totalWords / pageSize); 
    
            console.log('Comic Content:', comicContent.value);
        } catch (error) {
            console.error("Không thể lấy nội dung truyện tranh:", error);
        }
    };
    
    
    return {
        comicTypes,
        fetchComicTypes,
        comics, 
        fetchComics,
        currentPage,
        totalPages,
        comicDetail,
        fetchComicDetail,
        comicContent, 
        fetchComicContent,
    };
});