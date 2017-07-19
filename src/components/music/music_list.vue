<template>
    <div class="music-list">
        <!-- header -->
        <headerBack :title="albumName"></headerBack>
        <backToTop @clickBack="backToTop"></backToTop>
        <!-- music-search -->
        <musicSearch @searchSong="showResults"></musicSearch>
        <!-- active list main -->
        <div class="music-wrap" v-if="flag" v-show="!spinnerFlag">
            <transition-group name="slider" tag="ul">
                <li v-for="(music, index) in musicList" @click="goPlay(index)" :key="music">
                    <div class="music-img">
                        <img :src="music.album.picUrl" alt="">
                    </div>
                    <div class="music-info">
                        <span>{{music.name | getShortName}}</span> / <span>{{music.duration | formatTime}}</span>
                    </div>
                </li>
            </transition-group>
        </div>
        <!-- search list main -->
        <div class="music-wrap" v-if="!flag" v-show="!spinnerFlag">
            <transition-group name="slider" tag="ul">
                <li v-for="(music, index) in searchList" @click="goPlay(index)" :key="music">
                    <div class="music-img">
                        <img :src="music.album.picUrl" alt="">
                    </div>
                    <div class="music-info">
                        <span>{{music.name | getShortName}}</span> / <span>{{music.duration | formatTime}}</span>
                    </div>
                </li>
            </transition-group>
        </div>
        <!-- load -->
        <div class="music-load" v-if="spinnerFlag">music list 记载中...</div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
import backToTop from '@/components/common/top_back';
import musicSearch from '@/components/music/music_search';
export default {
    name: 'mosic-list',
    components: {
        headerBack,
        backToTop,
        musicSearch
    },
    data() {
        return {
            spinnerFlag: true,
            flag: true,
            musicList: [],
            id: this.$route.params.listId,
            albumName: '',
            searchList: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getList();
        })
    },
    methods: {
        showResults(songs) {
            if (songs) {
                this.searchList = songs;
                this.flag = false;
            } else {
                this.flag = true;
                this.getList();
            }
        },
        getList() {
            this.spinnerFlag = true;
            this.$http.get('http://music.163.com/api/playlist/detail?id=' + this.id)
                .then(response => {
                    this.musicList = response.data.result.tracks;
                    this.albumName = response.data.result.name;
                    this.spinnerFlag = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        backToTop() {
            document.body.scrollTop = 0;
        },
        formatTime(val) {
            if (typeof val === 'undefined') {
                return '未知长度';
            }
            let m = Math.floor(val / 1000 / 60).toString();
            let s = Math.floor(val / 1000 % 60).toString();
            m = (m.length == 1) ? 0 + m : m;
            s = (s.length == 1) ? 0 + s : s;
            return m + ':' + s;
        },
        goPlay(index) {
            // 如果为搜索列表
            if (!this.flag) {
                let song = {
                    id: this.searchList[index].id,
                    albumName: this.searchList[index].album.name,
                    avatarUrl: this.searchList[index].album.picUrl,
                    name: this.searchList[index].name,
                    singer: this.searchList[index].artists[0].name,
                    duration: this.formatTime(this.searchList[index].duration),
                    activeIndex: index
                };
                // 本地储存
                window.localStorage.setItem('activeMusic', JSON.stringify(song));
                // store
                this.$store.dispatch('activeMusic', song);
            } else {
                let song = {
                    id: this.musicList[index].id,
                    albumName: this.musicList[index].album.name,
                    avatarUrl: this.musicList[index].album.picUrl,
                    name: this.musicList[index].name,
                    singer: this.musicList[index].artists[0].name,
                    duration: this.formatTime(this.musicList[index].duration),
                    activeIndex: index
                };
                // 本地储存
                window.localStorage.setItem('activeMusic', JSON.stringify(song))
                // store
                this.$store.dispatch('activeMusic', song);
            }
            this.$router.push({
                name: 'music-play',
                params: {
                    songId: this.musicList[index].id
                }
            })
        }
    },
    filters: {
        getShortName(val) {
            if (val.length > 10) {
                return val.slice(0, 10) + '...';
            }
            return val;
        },
        formatTime(val) {
            if (typeof val === 'undefined') {
                return '未知长度';
            }
            let m = Math.floor(val / 1000 / 60).toString();
            let s = Math.round(val / 1000 % 60).toString();
            m = (m.length == 1) ? 0 + m : m;
            s = (s.length == 1) ? 0 + s : s;
            return m + ':' + s;
        }
    }
}
</script>
<style scoped>
.music-load {
    text-align: center;
    margin: 20px 0;
}
.music-wrap li {
    box-sizing: border-box;
    height: 100px;
    padding: 25px 0;
    overflow: hidden;
    border-bottom: 1px dashed #ccc;
    cursor: pointer;
}
.music-img {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
}
.music-info {
    float: left;
    width: 300px;
    height: 50px;
    line-height: 50px;
}
.slider-enter-active,
.slider-leave-active {
    transition: all .6s;
}
.slider-enter,
.slider-leave-active {
    opacity: 0;
}
.slider-enter {
    transform: translateX(20px);
}
.slider-leave-active {
    transform: translateX(-20px);
}
</style>