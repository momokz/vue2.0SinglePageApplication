<template>
    <div class="music-search">
        <div class="music-input">
            <input type="text" v-model="searchQuery" @keyup.enter="search" placeholder="搜索音乐，确定按enter">
        </div>
    </div>
</template>
<script>
export default {
    name: 'music-search',
    data() {
        return {
            searchQuery: '',
            searchList: []
        }
    },
    methods: {
        search() {
            this.$http.get('http://s.music.163.com/search/get?type=1&s=' + this.searchQuery)
                .then(response => {
                    // console.log(response);
                    if (response.data.result && response.data.result.songs) {
                        this.searchList = response.data.result.songs;
                        this.$emit('searchSong', this.searchList);
                    } else if (typeof response.data.result == 'undefined') {
                        this.$emit('searchSong', '');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped>
.music-search {
    border-bottom: 2px solid #2196f3;
}
.music-input {
    height: 50px;
    line-height: 50px;
}
.music-input input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
}
</style>