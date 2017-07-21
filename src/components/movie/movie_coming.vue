<template>
    <div class="movie-coming movie-scroll">
        <movieData :dataUrl="url" :elem="elem" @loadFlag="loadHandle"></movieData>
        <!-- loader -->
        <div class="load" v-show="spinnerFlag">加载中...</div>
    </div>
</template>
<script>
import movieData from '@/components/movie/movie_data';
export default {
    name: 'movieComing',
    components: {
        movieData
    },
    data() {
        return {
            spinnerFlag: false,
            elem: 'movie-coming',
            url: 'https://api.douban.com/v2/movie/coming_soon?count=10&start='
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
.movie-coming {
    float: left;
    width: 800px;
    height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
}
.movie-content {
    height: auto;
}
.movie-content li {
    box-sizing: border-box;
    height: 100px;
    padding: 25px 0;
    border-bottom: 1px dashed #ccc;
    cursor: pointer;
}
.movie-content-img {
    float: left;
    width: 50px;
    height: 50px;
    margin: 0 25px;
    border-radius: 50%;
    overflow: hidden;
}
.movie-content-info {
    float: left;
    width: 600px;
}
.movie-content-name {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
}
.list-enter-active, .list-leave-active {
    transition: all 1s;
}
.list-enter,
.list-leave-active {
    opacity: 0;
}
.list-enter {
    transform: translateX(20px);
}
.list-leave-active {
    transform: translateX(-20px);
}
</style>