<template>
    <div class="movie-detail">
        <!-- header-back -->
        <headerBack :title="movieDetail.title"></headerBack>
        <!-- main -->
        <transition name="slide">
            <div class="movieDetail-wrap" v-show="!spinnerFlag">
                <img :src="movieDetail.images ? movieDetail.images.large : ''" alt="" class="movieDetail-img">
                <div class="movieDetail-container">
                    <div class="movieDetail-title">{{movieDetail.title}}</div>
                    <div class="movieDetail-info">
                        <p>
                            {{movieDetail.countries ? movieDetail.countries[0]: ''}} / <span v-for="genre in movieDetail.genres">{{genre}}</span>
                        </p>
                        <p>
                            年份：{{movieDetail.year}}
                        </p>
                    </div>
                </div>
                <div class="movieDetail-wrap">
                    <div class="movieDetail-subheading">
                        <h3>导演：{{movieDetail.directors ? movieDetail.directors[0].name : ''}}</h3>
                        <div class="movieDetail-reservation">
                            <img :src="movieDetail.directors? movieDetail.directors[0].avatars.medium: ''" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- load -->
        <div class="load" v-show="spinnerFlag">detail 加载中...</div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
export default {
    name: 'movie-detail',
    components: {
        headerBack
    },
    data() {
        return {
            movieId: this.$route.params.id,
            movieDetail: {},
            spinnerFlag: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getMovieDetail();
        })
    },
    methods: {
        getMovieDetail() {
            this.$http.get('https://api.douban.com/v2/movie/subject/' + this.movieId)
                .then(response => {
                    this.movieDetail = response.data.id ? response.data : JSON.parse(response.request.response);
                    this.spinnerFlag = false;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped>
.load {
    margin-top: 20px;
    text-align: center;
}
.movie-detail {
    position: relative;
}
.movieDetail-wrap {
    margin-top: 20px;
    text-align: center;
}
.movieDetail-img {
    width: 300px;
    height: 444px;
    margin: 0 auto;
}
.movieDetail-container {
    margin-top: 20px;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
}
.movieDetail-title {
    font-size: 24px;
}
.movieDetail-info {
    font-size: 14px;
    margin-top: 10px;
}
.movieDetail-subheading h3 {
    font-size: 20px;
}
.movieDetail-reservation {
    width: 140px;
    height: 200px;
    margin: 20px auto 0;
    border-radius: 30px;
    overflow: hidden;
}
.slide-enter-active,
.slide-leave-active {
    transition: all .6s;
}
.slide-enter,
.slide-leave-active {
    opacity: 0;
}
.slide-enter {
    transform: translateX(20px);
}
.slide-leave-active {
    transform: translateX(-20px);
}
</style>