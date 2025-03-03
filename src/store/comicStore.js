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
            totalPages.value = data.totalPages; 
            currentPage.value = data.currentPage; 
            console.log(comics.value);
        } catch (error) {
            console.error("Không thể lấy danh sách truyện tranh:", error);
        }
    };

    // Hàm lấy thông tin chi tiết của comic
    const fetchComicDetail = async (comicId) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/GetComicById?comicId=${comicId}`);
            comicDetail.value = response.data.data;
        } catch (error) {
            console.error("Không thể lấy thông tin chi tiết truyện tranh:", error);
        }
    };

    // Hàm để lấy nội dung của comic
    const fetchComicContent = async (comicId, pageNumber) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/GetComicContent?comicId=${comicId}&pageNumber=${pageNumber}`);
            
            // Lưu nội dung vào biến comicContent
            comicContent.value = response.data.content;  
            
            // Lấy tổng số trang từ phản hồi
            totalPages.value = response.data.totalPages; 

            console.log('Comic Content:', comicContent.value);
            console.log('Total Pages:', totalPages.value);
        } catch (error) {
            console.error("Không thể lấy nội dung truyện tranh:", error);
        }
    };

    // Hàm thêm comment
    const addNewComment = async (commentData) => {
        const { commentTitle, rate, comicId } = commentData;
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData ? userData.id : null;
    
        const url = `https://localhost:7064/api/Comment/AddNewComment?commentTitle=${encodeURIComponent(commentTitle)}&rate=${rate}&userId=${userId}&comicId=${comicId}`;
    
        console.log("Dữ liệu gửi đến API:", url);
    
        try {
            const response = await axios.post(url);
    
            if (response.data.status === 200) {
                return { success: true, message: response.data.message || "Thêm bình luận thành công!" };
            } else {
                console.error("Lỗi từ backend:", response.data.message);
                return { success: false, message: response.data.message || "Lỗi không xác định!" };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Không thể kết nối tới server!";
            console.error("Lỗi khi gọi API:", errorMessage);
            return { success: false, message: errorMessage };
        }
    };
    
    // Hàm hiển thị comment
    const comments = ref([]); 
    const fetchComments = async (comicId) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Comment/GetListComment?comicId=${comicId}`);
            comments.value = response.data; // Lưu bình luận theo comicId
        } catch (error) {
            console.error("Không thể lấy danh sách bình luận:", error);
        }
    };
    
    // Hàm toggle like và unlike comic
    const toggleHobby = async (userId, comicId) => {
        if (!userId || !comicId) {
            return { success: false, message: "Thiếu userId hoặc comicId!" };
        }
    
        try {
            const response = await axios.post(`https://localhost:7064/api/Hobby/ToggleHobby?userId=${userId}&comicId=${comicId}`);
            
            if (response.data && response.data.status === 200) {
                return { success: true, message: response.data.message || "Cập nhật trạng thái yêu thích thành công!" };
            } else {
                return { success: false, message: response.data.message || "Lỗi không xác định!" };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Không thể kết nối tới server!";
            console.error("Lỗi khi gọi API:", errorMessage);
            return { success: false, message: errorMessage };
        }
    };
    
    // Hàm kiểm tra những truyện đã thích của từng user
    const getLikeStatus = async (userId, comicId) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Hobby/GetLikeStatus?userId=${userId}&comicId=${comicId}`);
            return response.data; // Trả về trạng thái yêu thích
        } catch (error) {
            console.error("Lỗi khi lấy trạng thái yêu thích:", error);
            return { success: false, message: "Không thể kết nối tới server!" };
        }
    };

    const searchComic = ref([]); // Danh sách truyện
    // Hàm tìm kiếm truyện theo thể loại
    const searchComicByTypeName = async (comicTypeName) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/SearchComicByType?comicTypeName=${encodeURIComponent(comicTypeName)}`);
            
            // Kiểm tra dữ liệu trả về từ API
            if (Array.isArray(response.data)) {
                searchComic.value = response.data; 
            } else {
                console.error("Dữ liệu trả về không phải là mảng: ", response.data);
            }
        } catch (error) {
            console.error("Không thể lấy truyện theo thể loại:", error);
        }
    };

    // Thêm searchResult để lưu kết quả tìm kiếm
    const searchName = ref([]); 
    // Hàm tìm kiếm truyện theo tên
    const searchComicByName = async (comicName) => {
        try {
            const response = await axios.get(`https://localhost:7064/api/Comic/SearchComicByName?comicName=${encodeURIComponent(comicName)}`);
            if(Array.isArray(response.data)){
                searchName.value = response.data; 
            }
            console.log(searchName.value);
        } catch (error) {
            console.error("Không thể tìm kiếm truyện:", error);
        }
    };
    

    const historyComicAfterClick = async (userId, comicId) => {
        console.log("User ID:", userId);
        console.log("Comic ID:", comicId);
    
        try {
            const response = await axios.post(`https://localhost:7064/api/History/AddHistoryAfterClick?userId=${userId}&comicId=${comicId}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy trạng thái lịch sử:", error);
            return { success: false, message: "Không thể kết nối tới server!" };
        }
    };

    const listHistory = ref([]);
    const getListHistory = async (userId) => {
        console.log("User ID:", userId);
    
        if (!userId) {
            console.error("User ID không hợp lệ");
            return { success: false, message: "User ID không hợp lệ" };
        }
    
        try {
            const response = await axios.get(`https://localhost:7064/api/History/GetListHistory?userId=${userId}`);
            listHistory.value = response.data;
            console.log(listHistory.value);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy trạng thái lịch sử:", error);
            return { success: false, message: "Không thể kết nối tới server!" };
        }
    };
    
    
    
    return {
        comicTypes,
        fetchComicTypes,
        comics, 
        searchComic,
        searchName,
        listHistory,
        fetchComics,
        currentPage,
        totalPages,
        comicDetail,
        fetchComicDetail,
        comicContent, 
        fetchComicContent,
        addNewComment,
        comments,
        fetchComments,
        toggleHobby,
        getLikeStatus,
        searchComicByTypeName,
        searchComicByName,
        historyComicAfterClick,
        getListHistory,
    };
});