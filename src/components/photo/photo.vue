<template>
    <div class="photo book-scroll">
        <!-- main -->
        <div class="photo-wrap">
            <transition-group name="opactiy" tag="div">
                <div v-for="(photo,index) in photoLists" :key="index" class="item" @click="getPhotoDetail(index)">
                    <img class="animated bounceIn" :src="photo.url">
                </div>
            </transition-group>
        </div>
        <!-- load -->
        <div class="load" v-show="spinnerFlag">photo 加载中...</div>
    </div>
</template>
<script>
export default {
    name: 'photo',
    data() {
        return {
            photoLists: [],
            page: 1,
            spinnerFlag: true,
            buys: false,
            container: null,
            content: null,
            eleH: 0
        }
    },
    watch: {
        photoLists() {
            setTimeout(() => {
                this.eleH = this.container.offsetHeight;
            }, 1000)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadMore();
            this.container = this.$el;
            this.content = this.$el.querySelector('.photo-wrap');
            this.eleH = this.content.offsetHeight;
            this.container.addEventListener('scroll', e => {
                if (this.isToucScrllBottom()) {
                    this.loadMore();
                }
            })
        })
    },
    methods: {
        isToucScrllBottom() {
            let winH = window.innerHeight || document.documentElement.clientHeight;
            let navH = document.querySelector('.nav-bar').offsetHeight * 2 + 20;
            let innerWinH = winH - navH;
            let scrT = this.container.scrollTop;
            let eleH = this.eleH;
            if (scrT >= eleH - innerWinH) {
                return true;
            } else {
                return false;
            }
        },
        loadMore() {
            if (this.buys) {
                return;
            }
            this.buys = true;
            this.spinnerFlag = true;
            this.$http.get('https://gank.io/api/data/福利/20/' + this.page)
                .then(response => {
                    // console.log(response);
                    response.data.results.forEach(photo => {
                        this.photoLists.push(photo);
                    });
                    this.spinnerFlag = false;
                    this.buys = false;
                    this.page++;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getPhotoDetail(index) {
            let photoData = {
                'index': index,
                'photoList': this.photoLists
            };
            window.localStorage.setItem('photoInfo', JSON.stringify(photoData));
            this.$router.push({
                name: 'photo-detail',
                params: {
                    id: this.photoLists[index]._id
                }
            })
        }
    }
}
</script>
<style scoped>
.load {
    margin: 20px 0;
    text-align: center;
}

.book-scroll {
    height: 80vh;
    overflow-y: scroll;
}

.photo-wrap {
    min-height: 85vh;
    height: auto;
}

.photo-wrap > div {
    display: flex;
    flex-wrap: wrap;
}

.photo-wrap .item {
    width: 100px;
    height: 100px;
    flex-grow: 1;
    margin: 2px;
    cursor: pointer;
}

.photo-wrap img {
    height: 100px;
    object-fit: cover;
    vertical-align: bottom;
}

.opactiy-enter-active,
.opactiy-leave-active {
    transition: all .6s;
}

.opactiy-enter,
.opacity-leave-active {
    opacity: 0;
}
</style>
