<template>
    <div class="photo-detail">
        <!-- headerBack -->
        <headerBack title="photo"></headerBack>
        <!-- tip -->
        <transition name="slideTop">
            <div class="login-tip" v-show="tipFlag" v-text="tip"></div>
        </transition>
        <!-- touch main -->
        <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight" v-if="isTouch">
            <img :src="photoList[index].url" alt="">
        </v-touch>
        <!-- pc main -->
        <div class="photo-pc-show" v-if="isPc">
            <img :src="photoList[index].url" alt="" v-show="imgFlag">
            <div class="left-btn" @click="goLeft">left</div>
            <div class="right-btn" @click="goRight">right</div>
        </div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
export default {
    name: 'photo-detail',
    components: {
        headerBack
    },
    data() {
        return {
            localData: JSON.parse(window.localStorage.getItem('photoInfo')),
            tipFlag: false,
            tip: '',
            isTouch: false,
            isPc: true,
            imgFlag: true,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.imgLoad();
        })
    },
    computed: {
        index() {
            return this.localData.index;
        },
        photoList() {
            return this.localData.photoList;
        }
    },
    methods: {
        onSwipeLeft() {
            if (this.localData.index === this.photoList.length - 1) {
                this.tip = "这是最后一张图";
                this.tipFlag = true;
                setTimeout(() => {
                    this.tipFlag = false;
                }, 2000)
                return;
            }
            this.localData.index++;
        },
        onSwipeRight() {
            if (this.localData.index === 0) {
                this.tip = "这是第一张图";
                this.tipFlag = true;
                setTimeout(() => {
                    this.tipFlag = false;
                }, 2000)
                return;
            }
            this.localData.index--;
        },
        goLeft() {
            if (this.localData.index === this.photoList.length - 1) {
                this.tip = "这是最后一张图";
                this.tipFlag = true;
                setTimeout(() => {
                    this.tipFlag = false;
                }, 2000)
                return;
            }
            this.localData.index++;
            this.imgLoad();
        },
        goRight() {
            if (this.localData.index === 0) {
                this.tip = "这是第一张图";
                this.tipFlag = true;
                setTimeout(() => {
                    this.tipFlag = false;
                }, 2000)
                return;
            }
            this.localData.index--;
            this.imgLoad();
        },
        imgLoad() {
            let ele = this.$el.querySelector('.photo-pc-show');
            let img = ele.querySelector('img');
            img.onload = () => {
                let imgH = img.offsetHeight;
                ele.style.height = imgH + 'px';
            }
        }
    }
}
</script>
<style scoped>
.load {
    margin: 20px 0;
    text-align: center;
}
.login-tip {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 300px;
    line-height: 300px;
    margin: -150px 0 0 -150px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: rgba(255, 255, 255, .8);
    z-index: 100;
    font-size: 30px;
    text-align: center;
}
.photo-pc-show {
    position: relative;
    width: 800px;
    height: 800px;
    margin: 20px auto 0;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid #ccc;
}
.left-btn,
.right-btn {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    margin-top: -25px;
    background: #2196f3;
    border-radius: 50%;
    cursor: pointer;
}
.left-btn {
    left: 10px;
}
.right-btn {
    right: 10px;
}
</style>