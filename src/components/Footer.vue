<template>
    <footer>
  <div class="footer-container">
    <div class="footer-section">
      <h3>Thông Tin Về Chúng Tôi</h3>
      <ul>
        <li><i class="bx bx-info-circle"></i> Về Chúng Tôi</li>
        <li><i class="bx bx-phone"></i> Liên Hệ: 1900 0102</li>
        <li><i class="bx bx-lock"></i> Chính Sách Bảo Mật</li>
        <li><i class="bx bx-file"></i> Điều Khoản Dịch Vụ</li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Về Chúng Tôi</h3>
      <p>Chúng tôi là một nền tảng cung cấp các sách và truyện điện tử chất lượng. Đọc sách mọi lúc, mọi nơi, với nhiều thể loại phong phú.</p>
    </div>
    <div class="footer-section">
      <h3>Ý Tưởng</h3>
      <p>Chúng tôi không chỉ cung cấp sách, mà còn là nơi chia sẻ đam mê đọc sách, kết nối cộng đồng yêu sách và truyện.</p>
    </div>
    <div class="footer-section">
        <h3>Đăng ký nhận tin</h3>
        <div>
            <input class="inputRegister" type="text" placeholder="Email...">
            <button class="btnRegister">Gửi</button>
        </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 GoodComics | All rights reserved</p>
  </div>
</footer>

</template>

<style scoped> 
footer {
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 20px 0;
  line-height: 2.2rem;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;  
  padding: 30px 100px;
  margin: 0 auto;
}

.footer-section {
  width: 23%;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 5px 0;
}

.footer-section ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.footer-section ul li a i {
  margin-right: 8px; 
  font-size: 1.2rem; 
}

.inputRegister{
    width: 170px; 
    outline: none; 
    border: none;
    padding: 10px 15px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.btnRegister{
    background-color: #FF6600;
    margin-left: 2px;
    width: 70px;
    outline: none;
    border: none;
    padding: 11px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    cursor: pointer;
    color: #fff;
}

.btnRegister:hover{
    background-color: #ff66009d;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #ffffff;
}

.footer-bottom p {
  margin: 0;
}

</style>