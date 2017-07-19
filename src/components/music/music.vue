<template>
    <div id="music">
        <div class="music-wrap">
            <ul>
                <li v-for="(album, index) of albums" @click="showList(index)" :key="album">
                    <img :src="album.bg" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'music',
    data() {
        return {
            albums: [{
                name: "飙升榜",
                id: 19723756,
                bg: require("./images/soar_music.jpg")
            }, {
                name: "新歌榜",
                id: 3779629,
                bg: require("./images/new_music.jpg")
            }, {
                name: "原创榜",
                id: 2884035,
                bg: require("./images/original_music.jpg")
            }, {
                name: "KTV麦榜",
                id: 21845217,
                bg: require("./images/ktv_music.jpg")
            }, {
                name: "华语金曲榜",
                id: 4395559,
                bg: require("./images/chinese_music.jpg")
            }, {
                name: "我的专辑",
                id: 98833242,
                bg: require("./images/my_music.jpg")
            }]
        }
    },
    methods: {
        showList(index) {
            this.$router.push({
                name: 'music-list',
                params: {
                    listId: this.albums[index].id
                }
            })
        }
    }
}
</script>
<style scoped>
.music-wrap li {
    float: left;
    width: 150px;
    height: 150px;
    margin: 0 20px 20px 0;
    cursor: pointer;
}
.top-enter-active,
.top-leave-active {
    transition: all 1s
}
.top-enter,
.top-leave-active {
    opacity: 0;
}
.top-enter {
    transform: translateY(-50px)
}
.top-leave-active {
    transform: translateY(-50px);
}
</style>