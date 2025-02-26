<script setup>
import { computed, onMounted } from 'vue';
import { useComicStore } from '../store/comicStore';

const comicStore = useComicStore();

const displayedPages = computed(() => {
    if (comicStore.totalPages <= 3) {
        return Array.from({ length: comicStore.totalPages }, (_, i) => i + 1);
    }
    if (comicStore.currentPage <= 3) {
        return [1, 2, 3];
    }
    if (comicStore.currentPage >= comicStore.totalPages - 2) {
        return [comicStore.totalPages - 2, comicStore.totalPages - 1, comicStore.totalPages];
    }
    return [comicStore.currentPage - 1, comicStore.currentPage, comicStore.currentPage + 1];
});

const prevPage = () => {
    if (comicStore.currentPage > 1) {
        comicStore.fetchComics(comicStore.currentPage - 1);
    }
};

const nextPage = () => {
    if (comicStore.currentPage < comicStore.totalPages) {
        comicStore.fetchComics(comicStore.currentPage + 1);
    }
};

const goToPage = (page) => {
    comicStore.fetchComics(page);
};

onMounted(() => {
    comicStore.fetchComics();
});
</script>

<template>
    <div>
        <div class="comic-container">
            <router-link
                v-for="(comic, index) in comicStore.comics" :key="index" class="comic-card" :to="`/DetailComic/${comic.id}`"
                style="text-decoration: none; color: black;">
                <img :src="comic.urlImage" alt="Comic Image" class="comic-image" />
                <div class="comic-info">
                    <h3 class="comic-title">{{ comic.comicName }}</h3>
                    <p class="comic-author">Tác giả: {{ comic.comicAuthor }}</p>
                    <p class="comic-genre">Thể loại: {{ comic.comicTypeName }}</p>
                </div>
            </router-link>
        </div>
        <div class="pagination">
            <button class="pagination-button" @click="prevPage" :disabled="comicStore.currentPage === 1">◀</button>
            <span class="pagination-numbers">
                <span v-if="comicStore.currentPage > 3" class="page-number" @click="goToPage(1)">Đầu</span>
                <span class="page-number" 
                      v-for="page in displayedPages" 
                      :key="page" 
                      @click="goToPage(page)" 
                      :class="{ active: page === comicStore.currentPage }">
                    {{ page }}
                </span>
                <span v-if="comicStore.currentPage < comicStore.totalPages - 2" class="page-number" @click="goToPage(comicStore.totalPages)">Cuối</span>
            </span>
            <button class="pagination-button" @click="nextPage" :disabled="comicStore.currentPage === comicStore.totalPages">▶</button>
        </div>
    </div>
</template>

<style scoped>
.comic-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    max-width: 90%; 
    margin: 0 auto; 
}

.comic-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: calc(20% - 10px); 
    margin: 5px; 
    margin-top: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s;
    cursor: pointer;
}

.comic-card:hover {
    transform: scale(1.05);
}

.comic-image {
    width: 100%;
    height: 300px; 
    object-fit: cover; 
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.comic-info {
    padding: 15px;
}

.comic-title {
    font-size: 16px; 
    margin: 0;
}

.comic-author,
.comic-genre {
    color: #666;
    margin: 5px 0;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.pagination-button {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
}

.page-number {
    margin: 0 5px;
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.page-number.active {
    background-color: #326E51; 
    color: white; 
}

.page-number:hover {
    background-color: #e0e0e0;
}

.input-page {
    width: 50px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    transition: background-color 0.2s;
}

.input-page:hover {
    background-color: #e0e0e0;
}

.comic-title {
    font-size: 16px;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
</style>
