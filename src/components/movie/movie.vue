<template>
    <div class="movie">
        <ul class="movie-nav clearfix">
            <li :class="{'active': isActive==0}" @click="doActive(0)">top</li>
            <li :class="{'active': isActive==1}" @click="doActive(1)">上映</li>
            <li :class="{'active': isActive==2}" @click="doActive(2)">即将上映</li>
        </ul>
        <div class="movie-wrap">
            <div class="movie-container">
                <movieListTop></movieListTop>
                <movieListHot></movieListHot>
                <movieListComing></movieListComing>
            </div>
        </div>
        <!-- return top -->
        <topBack @clickBack="backToTop"></topBack>
    </div>
</template>
<script>
import movieListTop from '@/components/movie/movie_top';
import movieListHot from '@/components/movie/movie_hot';
import movieListComing from '@/components/movie/movie_coming';
import topBack from '@/components/common/top_back';
export default {
    name: 'movie',
    data() {
        return {
            isActive: 0,
            container: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.container = this.$el.querySelector('.movie-container');
            this.container.style.width = 3 * 800 + 'px';
        })
    },
    methods: {
        doActive(index) {
            this.isActive = index;
            this.container.style.transform = 'translateX(' + -index * 800 + 'px)';
        },
        backToTop() {
            this.$el.querySelectorAll('.movie-scroll')[this.isActive].scrollTop = 0;
        }
    },
    components: {
        movieListComing,
        movieListHot,
        movieListTop,
        topBack
    }
}
</script>
<style scoped>
.movie {
    margin-top: 20px;
}
.movie-nav li {
    float: left;
    width: 33%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
}
.movie-nav li:last-child {
    width: 34%;
}
.movie-nav li.active {
    border-bottom: 2px solid #f00;
}
.movie-wrap {
    position: relative;
    box-sizing: border-box;
    overflow-x: hidden;
    margin-top: 20px;
    padding-bottom: 20px;
}
.movie-container {
    transition: all .5s;
    height: auto;
}
</style>