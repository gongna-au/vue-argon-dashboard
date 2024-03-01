<template>
  <div class="container mt-5">
    <div id="faqAccordion">
      <div class="card shadow mb-2" v-for="(faq, index) in faqs" :key="index">
        <div class="card-header bg-primary text-white" :id="'heading' + index">
          <h5 class="mb-0">
            <button class="btn btn-link text-white text-left p-0" @click="toggle(index)" :aria-expanded="faq.show.toString()" :aria-controls="'collapse' + index" style="text-align: left; display: block;">
              {{ faq.question }}
            </button>
            <button class="btn btn-link text-white text-left p-0" @click="toggle(index)" :aria-expanded="faq.show.toString()" :aria-controls="'collapse' + index" style="text-align: left; display: block; margin-top: 10px;">
              {{ faq.chineseQuestion }}
            </button>
          </h5>
        </div>

        <div :id="'collapse' + index" class="collapse" :class="{ show: faq.show }" aria-labelledby="'heading' + index" data-parent="#faqAccordion">
          <div class="card-body text-left">
            <div>{{ faq.answer }}</div>
            <div style="margin-top: 10px;">{{ faq.chineseAnswer }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQPage",
  data() {
    return {
      faqs: [
        {
          question: "How can I reset my password?",
          chineseQuestion:"如何重置我的密码？",
          answer: "You can reset your password by clicking on 'Forgot password?' at the login page.",
          chineseAnswer: "在登录界面点击忘记密码进行重置",
          show: true  // 设置为 true 以默认展开
        },
        {
          question: "How to view my reservation information and bind bank card?",
          chineseQuestion:"如何查看我的预定信息和绑定银行卡?",
          answer: "You can click the Add New Card button on the Billing page under USER PAGES to bind it.",
          chineseAnswer: "可以在USER PAGES下的Billing页面点击Add New Card按钮进行绑定",
          show: true  // 设置为 true 以默认展开
        },
        {
          question: "How do I top up my account for automatic deduction?",
          chineseQuestion:"如何给我的账户充值用来自动扣款?",
          answer: "You can select the bound bank card under Billing under USER PAGES to recharge the change in your account.",
          chineseAnswer: "可以在USER PAGES下的Billing下选择已经绑定的银行卡往账户零钱进行充值",
          show: true  // 设置为 true 以默认展开
        }
        // Add more FAQs as needed
      ]
    };
  },
  methods: {
    toggle(index) {
      this.faqs[index].show = !this.faqs[index].show;
    }
  }
};
</script>
