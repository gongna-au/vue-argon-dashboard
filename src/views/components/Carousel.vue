<template>
  <div class="card card-carousel overflow-hidden h-100 p-0">
    <div id="carouselExampleCaptions" class="carousel slide h-100" data-bs-ride="carousel">
      <div class="carousel-inner border-radius-lg h-100">
        <div
          class="carousel-item h-100 active"
          :style="{backgroundImage: 'url(' + require('@/assets/img/carousel-1.jpg') + ')',
      backgroundSize: 'cover'}"
        >
          <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
            <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-camera-compact text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1"> 智能预约，一键扣款</h5>
            <p>🚗 欢迎来到停车场！我们的智能停车系统通过实时更新引导您到达最近的停车位，让您的到达就像您开车一样顺利。</p>
          </div>
        </div>
        <div
          class="carousel-item h-100"
          :style="{backgroundImage: 'url(' + require('@/assets/img/carousel-2.jpg') + ')',
      backgroundSize: 'cover'}"
        >
          <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
            <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-bulb-61 text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">最大程度的安全!</h5>
            <p>🔒 智能停车系统配备 24小时即时监控和即时通知，可确保最大程度的安全性和安心。</p>
          </div>
        </div>
        <div
          class="carousel-item h-100"
          :style="{backgroundImage: 'url(' + require('@/assets/img/carousel-3.jpg') + ')',
      backgroundSize: 'cover'}"
        >
          <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
            <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-trophy text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">停车更聪明，而不是更难！</h5>
            <p>📱 可提前预订停车位，并享受为您的便利度身定制的无缝停车体验。</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "carousel",
};
</script>
