<template>
  <div class="card bg-transparent shadow-xl">
    <div
      class="overflow-hidden position-relative border-radius-xl"
      :style="{backgroundImage: 'url(' + require('../../assets/img/card-visa.jpg') + ')'}"
    >
      <span class="mask bg-gradient-dark"></span>
      <div class="card-body position-relative z-index-1 p-3">
        <i class="fas fa-wifi text-white p-2" aria-hidden="true"></i>
        <h5
          class="text-white mt-4 mb-5 pb-2"
        ></h5>
        <div class="d-flex">
          <div class="d-flex">
            <div :class="this.$store.state.isRTL ? 'ms-4' : 'me-4'">
              <p class="text-white text-sm opacity-8 mb-0">{{ cardHolderText }}</p>
              <h6 class="text-white mb-0">{{ UserName }}</h6>
            </div>
            <div>
              <p class="text-white text-sm opacity-8 mb-0">{{ cardExpirationText }}</p>
              <h6 class="text-white mb-0">11/22</h6>
            </div>
          </div>
          <div
            class="w-20 d-flex align-items-end justify-content-end"
            :class="this.$store.state.isRTL ? 'me-auto' : 'ms-auto'"
          >
            <argon-avatar class="w-60 mt-2" :img="img1" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import img from "../../assets/img/card-visa.jpg";
import img1 from "../../assets/img/logos/mastercard.png";

export default {
  name: "master-card",
  components: {
    ArgonAvatar,
  },
  props: {
    cardHolderText: {
      type: String,
      default: "Card Holder",
    },
    cardExpirationText: {
      type: String,
      default: "Expires",
    },
  },
  data() {
    return {
      img,
      img1,
      UserName :"",
    };
  },
  async created() {
    if ( this.$store.state.userId) {
       await this.fetchUserName( this.$store.state.userId);
    }
  },
  methods: {
    async fetchUserName(userId) {
      try {
        const response = await fetch(`http://localhost:8083/api/v1/user/name?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        this.UserName = res.data; // 假设后端返回的数据结构中包含用户的名字在name字段中
      } catch (error) {
        console.error("Failed to fetch user name:", error);
        // 处理错误情况，例如回退到默认名字或者显示错误信息
        this.name = "Unknown"; // 或者保持原有的默认名字，或者设为其他错误提示
      }
    },
  },
};
</script>
