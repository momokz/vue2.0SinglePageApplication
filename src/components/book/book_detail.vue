<template>
    <div class="book-detail">
        <!-- header_back -->
        <headerBack :title="bookDetail.title"></headerBack>
        <!-- main -->
        <div class="book-detail-wrap">
            <div class="book-detail-img">
                <img :src="bookDetail.images ? bookDetail.images.large: ''" alt="">
            </div>
            <div class="book-detail-info">
                <h2>作者：{{bookDetail.author ? bookDetail.author[0] : ''}}</h2>
                <p><span>作者介绍：</span>{{bookDetail.author_intro}}</p>
                <p><span>摘要：</span>{{bookDetail.summary}}</p>
                <p><span>单价：</span>{{bookDetail.price}}</p>
                <p><span>出版社：</span>{{bookDetail.publisher}}</p>
                <p><span>发行时间：</span>{{bookDetail.pubdate}}</p>
            </div>
        </div>
        <!-- load -->
        <div class="load" v-show="spinnerFlag">book detail 加载中...</div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
export default {
    name: 'book-detail',
    components: {
        headerBack
    },
    data() {
        return {
            id: this.$route.params.id,
            spinnerFlag: true,
            title: '',
            bookDetail: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadMore();
        })
    },
    methods: {
        loadMore() {
            this.$http.get('https://api.douban.com/v2/book/' + this.id)
                .then(response => {
                    console.log(response);
                    this.bookDetail = response.data;
                    this.spinnerFlag = false;
                })
        }
    }
}
</script>
<style scoped>
.book-detail-wrap{
    margin-top: 20px;
}
.load {
    text-align: center;
    margin: 20px 0;
}
.book-detail-img{
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
}
.book-detail-info{
    margin-top: 40px;
    line-height: 30px;
    font-size: 14px;
}
.book-detail-info h2, .book-detail-info p{
    margin-top: 10px;
}
.book-detail-info h2{
    text-align: center;
}
.book-detail-info p span{
    font-weight: bold;
}
</style>
