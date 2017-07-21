<template>
    <div class="movie-top movie-scroll">
        <movieData :dataUrl="url" :elem="elem" @loadFlag="loadHandle"></movieData>
        <!-- loader -->
        <div class="load" v-show="spinnerFlag">加载中...</div>
    </div>
</template>
<script>
import movieData from '@/components/movie/movie_data';
export default {
    name: 'movieTop',
    components: {
        movieData
    },
    data() {
        return {
            spinnerFlag: false,
            elem: 'movie-top',
            url: 'https://api.douban.com/v2/movie/top250?count=10&start='
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
.movie-top {
    float: left;
    width: 800px;
    height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>