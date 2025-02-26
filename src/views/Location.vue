<script setup>
import { onMounted } from "vue";
import Header from "../components/Header.vue";
import NavHeader from "../components/NavHeader.vue";
import Footer from "../components/Footer.vue";

onMounted(() => {
  var map = L.map('location-map').setView([10.014261043875985, 105.76485523032171], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  }).addTo(map);

  var marker = L.marker([10.014261043875985, 105.76485523032171]).addTo(map)
    .bindPopup('GoodComics')
    .openPopup();

  marker.on('click', () => {
    window.open(`https://www.google.com/maps?q=10.014261043875985,105.76485523032171`, '_blank');
  });

  map.attributionControl.setPrefix('');
});

</script>


<template>
<Header></Header>
<NavHeader></NavHeader>
  <div class="location-layout">
    <div class="location-sidebar">
      <h1>Địa chỉ</h1>
      <div class="address">
        <p>123 Đường 30/4, <br> Ninh Kiều, Tp.Cần Thơ, Việt Nam</p>
      </div>
    </div>
    <div class="location-content">
      <h2>Vị Trí Tại Cửa Hàng (Chỉ hỗ trợ tại cửa hàng)</h2>
      <div id="location-map" style="height: 400px; border-radius: 10px;"></div>
    </div>
  </div>
<Footer></Footer>
</template>

<style scoped>
.location-layout {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

.location-sidebar {
  width: 250px;
  background-color: #F5F5F5;
  color: #333;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.location-sidebar h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.address {
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
}

.location-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffffff;
}

.location-content h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

#location-map {
  flex-grow: 1;
  background-color: #bdc3c7;
  text-align: center;
  line-height: 400px;
  color: #7f8c8d;
  height: 400px;
  border-radius: 10px;
}
</style>
