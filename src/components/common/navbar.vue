<template>
    <div class="nav-bar clearfix">
        <ul>
            <li :class="{'active': isActive[0]}" @click="doActive(0)">电影</li>
            <li :class="{'active': isActive[1]}" @click="doActive(1)">音乐</li>
            <li :class="{'active': isActive[2]}" @click="doActive(2)">书籍</li>
            <li :class="{'active': isActive[3]}" @click="doActive(3)">图片</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'navbar',
    data() {
        return {
            isActive: [true, false, false, false],
            activeRoute: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setNavActive();
        })
    },
    methods: {
        doActive(index) {
            this.go(index);
            this.setNavActive();
        },
        go(index) {
            switch (index) {
                case 0:
                    this.$router.push({
                        name: 'movie'
                    })
                    break;
                case 1:
                    this.$router.push({
                        name: 'music'
                    })
                    break;
                case 2:
                    this.$router.push({
                        name: 'book'
                    })
                    break;
                case 3:
                    this.$router.push({
                        name: 'photo'
                    })
                    break;
            }
        },
        setNavActive() {
            const mapActive = {
                'movie': 0,
                'music': 1,
                'book': 2,
                'photo': 3
            };
            this.activeRoute = this.$route.name;
            this.isActive = [false, false, false, false];
            this.isActive[mapActive[this.activeRoute]] = true;
        }
    }
}
</script>
<style scoped>
.nav-bar li {
    float: left;
    width: 25%;
    height: 36px;
    line-height: 36px;
    background: #2196f2 3px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    opacity: .8;
}
.nav-bar li.active{
    opacity: 1;
}
</style>