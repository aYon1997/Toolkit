<template>
    <div>
        <section id="about" class="section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="img-thumb wow fadeInLeft">
                            <img class="img-fluid" src="../../../assets/img/about/about-1.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="profile-wrapper wow fadeInRight">
                            <h3>Hi Guys!</h3>
                            <p>Est diam venenatis arcu lacus ad. Duis quis eros. Cursus et rutrum eleifend sollicitudin
                                lacinia justo id turpis. Nec convallis integer. Odio eget duis. Nulla aenean et. Blandit
                                varius sollicitudin. Pellentesque leo primis neque urna magnis. Elit ut sollicitudin. Et est
                                a nam dolores eget itaque sagittis et parturient duis est eleifend sociis rutrum odio
                                viverra integer.</p>
                            <div class="about-profile">
                                <ul class="admin-profile">
                                    <li v-for="(item, index) in adminProfile" :key="index">
                                        <span class="pro-title">
                                            {{ title }}
                                        </span>
                                        <span class="pro-detail">
                                            {{ detail }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <a href="#" class="btn btn-common"><i class="icon-paper-clip"></i> Download Resume</a>
                            <a href="#" class="btn btn-danger"><i class="icon-speech"></i> Contact Me</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="services" class="services section-padding">
            <h2 class="section-title wow flipInX">What I do</h2>
            <div class="container">
                <div class="row">

                    <div class="col-md-6 col-lg-3 col-xs-12" v-for="(item, index) in services" :key="index">
                        <div class="services-item">
                            <div class="icon">
                                <i class="icon-grid"></i>
                            </div>
                            <div class="services-content">
                                <h3><a href="#">{{ item.title }}</a></h3>
                                <p>{{ item.detail }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="portfolios" class="section-padding">

            <div class="container">
                <h2 class="section-title wow flipInX">My Remarkable Works</h2>
                <div class="row">
                    <div class="col-md-12">
                        <div class="controls text-center">
                            <span v-for="(item, index) in navTextList" :key="index" class="filter btn btn-common"
                                :class="!index ? 'active' : ''">
                                {{ item }}
                            </span>
                        </div>
                    </div>

                    <div id="portfolio" class="row">
                        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix" v-for="(item, index) in portfolio"
                            :key="index">
                            <div class="portfolio-item">
                                <div class="shot-item">
                                    <img :src="item.img" alt="" />
                                    <div class="overlay">
                                        <div class="icons">
                                            <a class="lightbox preview" :href="item.img">
                                                <i class="icon-eye"></i>
                                            </a>
                                            <a class="link" href="#">
                                                <i class="icon-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <section class="counter-section section-padding">
            <div class="container">
                <div class="row">

                    <div class="col-md-3 col-sm-6 work-counter-widget text-center" v-for="(item, index) in worksList"
                        :key="index">
                        <div class="counter">
                            <div class="icon"><i class="icon-briefcase"></i></div>
                            <div class="counterUp">{{ item.num }}</div>
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" class="section-padding">
            <div class="contact-form">
                <div class="container">
                    <div class="row contact-form-area wow fadeInUp">
                        <div class="col-md-12">
                            <object style="border:0; height: 450px; width: 100%;" data="https://www.amap.com/"></object>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'EF',
    data() {
        return {

            worksList: [
                {
                    name: 'Name',
                    num: '10'
                },
                {
                    name: 'Age',
                    num: '25'
                },
                {
                    name: 'Experience',
                    num: '4'
                },

                {
                    name: 'Country',
                    num: 'USA'
                },
            ],
            services: [
                {
                    title: 'Name',
                    detail: 'Tom Saulnier'
                },
                {
                    title: 'Age',
                    detail: '25 Years'
                },
                {
                    title: 'Experience',
                    detail: '4 Years'
                },

                {
                    title: 'Country',
                    detail: 'USA'
                },
            ],
            adminProfile: [
                {
                    title: 'Name',
                    detail: 'Tom Saulnier'
                },
                {
                    title: 'Age',
                    detail: '25 Years'
                },
                {
                    title: 'Experience',
                    detail: '4 Years'
                },

                {
                    title: 'Country',
                    detail: 'USA'
                },
                {
                    title: 'Location',
                    detail: 'San Francisco'
                },
                {
                    title: 'e-mail',
                    detail: '100'
                },
                {
                    title: 'Phone',
                    detail: 'Saulnier'
                },
                {
                    title: 'Name',
                    detail: 'Freelance'
                },
            ],

            navTextList: [
                'All', 'Design', 'Development', 'Print'
            ],

            portfolio: [
                {
                    imgUrl: require('../../../assets/img/gallery/img-1.jpg')
                },
                {
                    imgUrl: require('../../../assets/img/gallery/img-2.jpg')
                },
                {
                    imgUrl: require('../../../assets/img/gallery/img-3.jpg')
                },
                {
                    imgUrl: require('../../../assets/img/gallery/img-4.jpg')
                },
                {
                    imgUrl: require('../../../assets/img/gallery/img-5.jpg')
                },
                {
                    imgUrl: require('../../../assets/img/gallery/img-6.jpg')
                },
            ]
        }
    }
}
</script>

<style></style>