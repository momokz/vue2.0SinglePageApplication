<template>
    <div class="movie-content">
        <transition-group name="list" tab="ul">
            <li v-for="(movie, index) in movieList" :key="index" @click="getMovieDetail(movie.id)">
                <div class="movie-content-img">
                    <img :src="movie.images.large" alt="">
                </div>
                <div class="movie-content-info">
                    <div class="movie-content-name">{{movie.title}}</div>
                    <div class="movie-content-describe">
                        <span v-for="genre in movie.genres">{{genre}}</span>({{movie.year}})(平均{{movie.rating.average}}分)
                    </div>
                </div>
            </li>
        </transition-group>
    </div>
</template>
<script>
export default {
    name: 'movieTop',
    data() {
        return {
            movieList: [],
            busy: false,
            container: null,
            content: null,
            eleH: 0
        }
    },
    props: ['dataUrl', 'elem'],
    watch: {
        movieList() {
            setTimeout(() => {
                this.eleH = this.content.offsetHeight;
            }, 1000);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadMore();
            this.container = document.querySelector('.' + this.elem);
            this.content = this.$el;
            this.eleH = this.content.offsetHeight;
            this.container.addEventListener('scroll', e => {
                if (this.isscrollBottom()) {
                    this.loadMore();
                }
            }, false);
        })
    },
    methods: {
        isscrollBottom() {
            let winH = window.innerHeight || document.documentElement.clientHeight;
            let navH = document.querySelector('.nav-bar').offsetHeight * 2 + 20;
            let scrT = this.container.scrollTop;
            let innerWinH = winH - navH;
            let eleH = this.eleH;
            if (scrT >= eleH - innerWinH) {
                return true;
            } else {
                return false;
            }
        },
        loadMore() {
            if (this.busy) {
                return;
            }
            this.busy = true;
            this.$emit('loadFlag', true);
            const start = this.movieList.length;
            this.$http.get(this.dataUrl + start)
                .then(response => {
                    response.data.subjects.forEach(item => {
                        this.movieList.push(item);
                    })
                    this.$emit('loadFlag', false);
                    this.busy = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getMovieDetail(id) {
            this.$router.push({
                name: 'movie-detail',
                params: {
                    id: id
                }
            })
        }
    }
}
</script>
<style scoped>
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
