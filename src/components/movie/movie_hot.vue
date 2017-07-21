<template>
    <div class="movie-hot movie-scroll">
        <movieData :dataUrl="url" :elem="elem" @loadFlag="loadHandle"></movieData>
        <!-- loader -->
        <div class="load" v-show="spinnerFlag">加载中...</div>
    </div>
</template>
<script>
import movieData from '@/components/movie/movie_data';
export default {
    name: 'movieHot',
    components: {
        movieData
    },
    data() {
        return {
            spinnerFlag: false,
            elem: 'movie-hot',
            url: 'https://api.douban.com/v2/movie/in_theaters?count=10&start='
        }
    },
    methods: {
        loadHandle(flag) {
            this.spinnerFlag = flag;
        }
    }
}
</script>
<style scoped>
.movie-hot {
    float: left;
    width: 800px;
    height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>