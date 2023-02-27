<template>
    <div>


        <footer class="footer-area section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="footer-text text-center">
                            <ul class="social-icon">
                                <li>
                                    <a class="facebook" href="#"><i class="icon-social-facebook"></i></a>
                                </li>
                                <li>
                                    <a class="twitter" href="#"><i class="icon-social-twitter"></i></a>
                                </li>
                                <li>
                                    <a class="instagram" href="#"><i class="icon-social-instagram"></i></a>
                                </li>
                                <li>
                                    <a class="instagram" href="#"><i class="icon-social-linkedin"></i></a>
                                </li>
                                <li>
                                    <a class="instagram" href="#"><i class="icon-social-google"></i></a>
                                </li>
                            </ul>
                            <p>Copyright © 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <a class="back-to-top" :style="styles" @click="__navClick">
            <i class="icon-arrow-up"></i>
        </a>
    </div>
</template>

<script>
import { scrollInto } from '../../../assets/js/scrollTo';
export default {
    data() {
        return {

        }
    },
    computed: {
        styles() {
            return {
                display: 'none'
            }
        }
    },
    methods: {
        __navClick() {
            scrollInto('body', 0);
        },
    },
    mounted() {
        // 监听页面滚动事件
        window.addEventListener("scroll", () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop ) {
                this.styles.display = 'true';
            } else {
                this.styles.display = 'false';
            }
        });

    },
}
</script>

<style></style>