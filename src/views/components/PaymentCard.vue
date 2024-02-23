<template>
  <div class="card mt-4">
    <div class="card-header pb-0 p-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">Payment Method 付款方式</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button color="dark" variant="gradient" @click="showAddCardForm = true">
          <i class="fas fa-plus me-2"></i>
            Add New Card
          </argon-button>
        </div>

        <!-- 添加银行卡的表单 -->
        <div v-if="showAddCardForm" class="mt-3">
          <div class="input-group mb-3">
            <input type="text" v-model="newCard.cardNumber" placeholder="Card Number" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="newCard.expiryDate" placeholder="Expiry Date (YYYY-MM)" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="password" v-model="newCard.cardPassword" placeholder="Password" class="form-control">
          </div>
          <argon-button color="success" variant="gradient" @click="submitNewCard">
            Submit
          </argon-button>
          <argon-button color="danger" variant="gradient" @click="showAddCardForm = false">
            Cancel
          </argon-button>
        </div>
      
      </div>
    </div>
    <div class="card-body p-3">
      <div class="row">
        <div class="col-md-6 mb-md-0 mb-4">
          <div
            class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row"
          >
            <img class="w-10 me-3 mb-0" src="@/assets/img/logos/mastercard.png" alt="logo" />
            <h6 class="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852</h6>
            <i
              class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title
              aria-hidden="true"
              data-bs-original-title="Edit Card"
              aria-label="Edit Card"
            ></i>
            <span class="sr-only">Edit Card</span>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row"
          >
            <img class="w-10 me-3 mb-0" src="@/assets/img/logos/visa.png" alt="logo" />
            <h6 class="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248</h6>
            <i
              class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title
              aria-hidden="true"
              data-bs-original-title="Edit Card"
              aria-label="Edit Card"
            ></i>
            <span class="sr-only">Edit Card</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import img1 from "@/assets/img/logos/mastercard.png";
import img2 from "@/assets/img/logos/visa.png";

export default {
  name: "payment-card",
  components: {
    ArgonButton,
  },
  data() {
    return {
      img1,
      img2,
      showAddCardForm: false, // 控制添加新卡表单的显示
      newCard: { // 新银行卡信息
        cardNumber: '',
        cardPassword: '',
        expiryDate: '',
      },
      cards: [], // 用于存储用户的银行卡信息
    };
  },
  methods: {
    async submitNewCard() {
      try {
        const response = await this.$http.post('/api/bank_cards', this.newCard);
        if (response.status === 200) {
          // 假设后端返回新添加的银行卡信息
          this.cards.push(response.data);
          this.showAddCardForm = false;
          this.newCard = { cardNumber: '', cardPassword: '', expiryDate: '' }; // 重置表单
        } else {
          alert('Failed to add the card.');
        }
      } catch (error) {
        console.error('Error adding new card:', error);
      }
    },
  },
};
</script>
