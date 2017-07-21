<template>
    <div id="book">
        <swipe class="my-swipe">
            <swipe-item class="slide1"></swipe-item>
            <swipe-item class="slide2"></swipe-item>
            <swipe-item class="slide3"></swipe-item>
        </swipe>
        <!-- main -->
        <div class="book-wrap">
            <transition-group name="slide" tag="ul">
                <li v-for="(book, index) in bookList" :key="index" @click="goBookDetail(index)">
                    <div class="book-img">
                        <img :src="book.book.image" alt="">
                    </div>
                    <div class="book-info">
                        <p>{{book.book.title}}</p>
                        <p>{{book.book.author_intro | captureAuthor}}</p>
                    </div>
                </li>
            </transition-group>
        </div>
        <!-- loader -->
        <div class="load" v-show="spinnerFlag">book 加载中...</div>
    </div>
</template>
<script>
import {
    Swipe,
    SwipeItem
} from 'vue-swipe';
export default {
    name: 'book',
    components: {
        Swipe,
        SwipeItem
    },
    data() {
        return {
            bookList: [],
            spinnerFlag: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadMore();
        })
    },
    methods: {
        loadMore() {
            this.$http.get('https://api.douban.com/v2/book/user/alex1504/collections')
                .then(response => {
                    // console.log(response);
                    this.bookList = response.data.collections;
                    this.spinnerFlag = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        goBookDetail(index) {
            this.$router.push({
                name: 'book-detail',
                params: {
                    id: this.bookList[index].book_id
                }
            })
        }
    },
    filters: {
        captureAuthor(val) {
            return val ? val.slice(0, 50) + '...' : '未知';
        }
    }
}
</script>
<style scoped>
#book{
    margin-top: 20px;
}
.my-swipe {
    width: 100%;
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}
.slide1 {
    background: url('https://img3.doubanio.com/lpic/s27102925.jpg');
    color: #fff;
}
.slide2 {
    background: url('https://img3.doubanio.com/lpic/s6989253.jpg');
    color: #000;
}
.slide3 {
    background: url('https://img3.doubanio.com/lpic/s24468373.jpg');
    color: #fff;
}
.load {
    margin-top: 20px;
    text-align: center;
}
.book-wrap li {
    box-sizing: border-box;
    overflow: hidden;
    height: 100px;
    padding: 25px 0;
    border-bottom: 1px dashed #ccc;
    cursor: pointer;
}
.book-img {
    float: left;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 15px;
}
.book-info {
    float: left;
    width: 700px;
    line-height: 25px;
}
</style>