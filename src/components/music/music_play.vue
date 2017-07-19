<template>
    <div class="music-play">
        <headerBack :title="activeSong.albumName"></headerBack>
        <div class="music-play-wrap">
            <div class="music-play-img">
                <img :src="activeSong.avatarUrl" alt="">
            </div>
            <div class="music-info">
                <h2>{{activeSong.name}}</h2>
                <p>歌手：{{activeSong.singer}}</p>
                <p>长度：{{activeSong.duration}}</p>
                <p>{{activeSong.albumName}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
export default {
    name: 'music-play',
    components: {
        headerBack
    },
    data() {
        return {
            
        }
    },
    computed: {
        activeSong() {
            let song = this.$store.state.music || JSON.parse(window.localStorage.getItem('activeMusic'));
            return {
                id: song.id,
                name: song.name,
                singer: song.singer,
                duration: song.duration,
                avatarUrl: song.avatarUrl,
                albumName: '专辑：' + song.name
            }
        }
    }
}
</script>
<style scoped>
.music-play-img {
    width: 300px;
    height: 300px;
    overflow: hidden;
    border-radius: 20px;
    margin: 0 auto;
}
.music-play-wrap {
    margin-top: 20px;
}
.music-info {
    margin-top: 20px;
    text-align: center;
    line-height: 30px;
}
</style>