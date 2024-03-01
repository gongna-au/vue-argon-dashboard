<template>
  <div class="card h-100 mb-4">
    <div class="card-header pb-0 px-3">
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0">Transaction's 账户自动扣款信息</h6>
        </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
          <small>23 - 30 March 2020</small>
        </div>
      </div>
    </div>
    <div class="card-body pt-4 p-3">
      <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Newest</h6>
      <ul class="list-group">
            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                  v-for="(transaction, index) in Ttransactions"
                  :key="index"
                >
                  <div class="d-flex align-items-center">
                    <argon-button
                      :color="transaction.status === 'success' ? 'success' : 'dark'"
                      variant="outline"
                      size="sm"
                      class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
                    >
                      <i :class="transaction.status === 'success' ? 'fas fa-arrow-up' : 'fas fa-exclamation'" aria-hidden="true"></i>
                    </argon-button>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">{{ transaction.date }}</h6>
                      <span v-if="transaction.cardNumber" class="text-xs">{{ transaction.cardNumber }}</span>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-center"
                    :class="transaction.status === 'success' ? 'text-success text-gradient' : 'text-dark'"
                    text-sm font-weight-bold
                  >-${{ transaction.amount  }}</div>
            </li>
      </ul>
     
      <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">Yesterday</h6>
      <ul class="list-group">
            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                  v-for="(transaction, index) in Ytransactions"
                  :key="index"
                >
                  <div class="d-flex align-items-center">
                    <argon-button
                      :color="transaction.status === 'success' ? 'success' : 'dark'"
                      variant="outline"
                      size="sm"
                      class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
                    >
                      <i :class="transaction.status === 'success' ? 'fas fa-arrow-up' : 'fas fa-exclamation'" aria-hidden="true"></i>
                    </argon-button>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">{{ transaction.date }}</h6>
                      <span v-if="transaction.cardNumber" class="text-xs">{{ transaction.cardNumber }}</span>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-center"
                    :class="transaction.status === 'success' ? 'text-success text-gradient' : 'text-dark'"
                    text-sm font-weight-bold
                  >-${{ transaction.amount  }}</div>
            </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "transaction-card",
  components: {
    ArgonButton,
  },
  data() {
  return {
    Ttransactions: [
          {
            date: "28 March 2024, at 04:30 AM",
            amount: 2000,
            status: "success", // 可以是 'success', 'pending', 等
          },
          {
            date: "28 March 2024, at 13:45 PM",
            amount: 750,
            status: "success",
          },
          {
            date: "28 March 2024, at 12:30 PM",
            amount: 1000,
            status: "success",
          },
      // 其他交易记录...
      ],
    Ytransactions: [
          {
            date: "27 March 2024, at 04:30 AM",
            amount: 2000,
            status: "success", // 可以是 'success', 'pending', 等
          },
          {
            date: "27 March 2024, at 13:45 PM",
            amount: 750,
            status: "success",
          },
          {
            date: "27 March 2024, at 12:30 PM",
            amount: 1000,
            status: "success",
          },
      // 其他交易记录...
      ],
    };
  },

};

</script>
