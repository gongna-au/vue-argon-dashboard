<template>
  <div class="container mt-5">
    <div id="faqAccordion">
      <div class="card shadow mb-2" v-for="(faq, index) in faqs" :key="index">
        <div class="card-header bg-primary text-white" :id="'heading' + index">
          <h5 class="mb-0">
            <button class="btn btn-link text-white" @click="toggle(index)" :aria-expanded="faq.show.toString()" :aria-controls="'collapse' + index">
              {{ faq.question }}
            </button>
          </h5>
        </div>

        <div :id="'collapse' + index" class="collapse" :class="{ show: faq.show }" aria-labelledby="'heading' + index" data-parent="#faqAccordion">
          <div class="card-body">
            {{ faq.answer }}
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
          answer: "You can reset your password by clicking on 'Forgot password?' at the login page.",
          show: true  // 设置为 true 以默认展开
        },
        {
          question: "Where can I check my subscription status?",
          answer: "Your subscription status can be found in the 'Account' section under 'Subscription'.",
          show: true  // 设置为 true 以默认展开
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can change your email address from your account settings page.",
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
