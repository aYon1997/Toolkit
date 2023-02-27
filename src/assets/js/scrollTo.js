export const scrollInto = (tragetEl, compensateHeight) => {
    const targetDom = document.querySelector(tragetEl);

    // 目标高度 = 目标真实高度 - 补偿高度
    const tragetElPostition = targetDom.offsetTop - compensateHeight;

    // 当前滚动高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // 滚动step方法
    const step = () => {
        // 距离目标滚动距离
        let distance = tragetElPostition - scrollTop;

        // 目标需要滚动的距离，也就是只走全部距离的五分之一
        scrollTop = scrollTop + distance / 5;

        // 到达目标或超过目标距离，取目标距离
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, tragetElPostition);
        } else {

            // 未到达目标，递归滚动
            window.scrollTo(0, scrollTop);
            setTimeout(step, 30);
        }
    };
    step();
}