<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row mt-4">
          <div class="col-xl-6 mb-xl-0 mb-4">
            <master-card />
          </div>
          <div class="col-xl-6">
            <div class="row">
              <div class="col-md-6">
                <default-info-card
                  :classIcon="salary.classIcon"
                  :title="salary.title"
                  :desc="salary.desc"
                  :price="salary.price"
                />
              </div>
              <div class="col-md-6">
                <default-info-card
                  :classIcon="paypal.classIcon"
                  :title="paypal.title"
                  :desc="paypal.desc"
                  :price="paypal.price"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <payment-card @recharge-success="handleRechargeSuccess" />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <invoice-card class="mt-4" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <billing-card />
      </div>
      <div class="col-md-6">
        <transaction-card />
      </div>
    </div>
  </div>
</template>

<script>
import MasterCard from "@/examples/Cards/MasterCard.vue";
import DefaultInfoCard from "@/examples/Cards/DefaultInfoCard.vue";
import PaymentCard from "./components/PaymentCard.vue";
import BillingCard from "./components/BillingCard.vue";
import TransactionCard from "./components/TransactionCard.vue";

export default {
  name: "Billing",
  components: {
    MasterCard,
    DefaultInfoCard,
    PaymentCard,
    BillingCard,
    TransactionCard,
  },
  mounted() {
    this.fetchAccountBalance(); // 组件加载时获取账户余额
  },
  data() {
    return {
      salary: {
        classIcon: "text-white fas fa-landmark",
        title: "Overage",
        desc: "账户余额",
        price: "2000.00",
      },
      paypal: {
        classIcon: "text-white fab fa-paypal",
        title: "Expenses",
        desc: "所有支出",
        price: "455.00",
      },
    };
  },
  methods: {
    handleRechargeSuccess(updatedBalance) {
      // 使用事件传递的新余额更新数据
      this.salary.price = `${updatedBalance}`;
    },
    async fetchAccountBalance() {
      const userId = this.$store.state.userId;
      try {
        const response = await fetch(`http://localhost:8083/api/v1/user/overage?userId=${userId}`);
        const res = await response.json();
        if (response.ok) {
          // 假设后端返回的数据中有一个字段叫 balance 表示余额
          this.salary.price = res.data.overage
          this.paypal.price= res.data.expenses
        } else {
          console.error('获取账户余额和支出失败:', res.message);
        }
      } catch (error) {
        console.error('请求账户余额时发生错误:', error);
      }
    },
  }
};
</script>
