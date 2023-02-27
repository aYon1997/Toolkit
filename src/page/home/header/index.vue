<template>
    <header id="header-wrap">

        <nav class="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
            <div class="container">
                
                <div class="navbar-header">
                    <a href="index.html" class="navbar-brand"><img src="../../../assets/img/logo.png" alt=""></a>
                </div>
                <div class="collapse navbar-collapse" id="main-navbar">
                    <ul class="onepage-nev navbar-nav mr-auto w-100 justify-content-end clearfix">
                        <li class="nav-item"
                        v-for="(item, index) in navList" :key="index"
                        :class="[{'active': !index}]">
                            <a class="nav-link" @click="__navClick(item)">
                                {{ item.pageName }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div id="hero-area" class="hero-area-bg">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 text-center">
                        <div class="contents">
                            <h5 class="script-font wow fadeInUp">Hi This is</h5>
                            <h2 class="head-title wow fadeInUp">Tom Simple</h2>
                            <p class="script-font wow fadeInUp">前端Web开发人员</p>
                            <ul class="social-icon wow fadeInUp">
                                <li>
                                    <a class="facebook" href="https://github.com/Caterpillarflys/ours.git"><i class="icon-social-facebook"></i></a>
                                </li>
                                <li>
                                    <a class="twitter" href="#"><i class="icon-social-twitter"></i></a>
                                </li>
                                <li>
                                    <a class="instagram" href="#"><i class="icon-social-instagram"></i></a>
                                </li>
                                <li>
                                    <a class="linkedin" href="#"><i class="icon-social-linkedin"></i></a>
                                </li>
                                <li>
                                    <a class="google" href="#"><i class="icon-social-google"></i></a>
                                </li>
                            </ul>
                            <div class="header-button wow fadeInUp"> <a href="#" class="btn btn-common">Get a Free
                                    Quote</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </header>
</template>

<script>

import { scrollInto } from '../../../assets/js/scrollTo';

export default {
    name: 'page-header',
    data() {
        return {
            navList: [
                {
                    pageName: '首页',
                    pageUrl: '#hero-area',
                },
                {
                    pageName: '关于',
                    pageUrl: '#about',
                },
                {
                    pageName: '服务',
                    pageUrl: '#services',
                },
                {
                    pageName: '工作',
                    pageUrl: '#portfolios',
                },
                {
                    pageName: '联系',
                    pageUrl: '#contact',
                },
            ],
            timer: null
        }
    },
    methods: {
        __navClick(data) {

            scrollInto(data.pageUrl, 60);
        },

        

    
    }
}
</script>

<style></style>