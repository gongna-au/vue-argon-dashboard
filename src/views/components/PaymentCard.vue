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
            <input type="text" v-model="newCard.bankName" placeholder="Bank Name" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="newCard.cardNumber" placeholder="Card Number" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="password" v-model="newCard.cardPassword" placeholder="Password" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="newCard.expiryDate" placeholder="Expiry Date (YYYY-MM-DD)" class="form-control">
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
        <div class="col-md-6 mb-md-0 mb-4" v-for="(card, index) in cards" :key="index" >
          <div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
            <img class="w-10 me-3 mb-0" src="@/assets/img/logos/mastercard.png" alt="logo" />
            <h6 class="mb-0"> ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;{{ card.card_number.slice(-4) }}</h6>
            <div class="col-6 text-end">
              <argon-button color="success" variant="gradient" class="me-3" @click="card.showRechargeForm = true">
                <i class="fas fa-wallet me-2"></i>充值
              </argon-button>
              <argon-button color="danger" variant="gradient" @click="unbindCard(card)">
                <i class="fas fa-unlink me-2"></i>解绑
              </argon-button>
            </div> 
          </div>
                <!-- 添加充值的表单 -->
                <div v-if=card.showRechargeForm class="mt-3">
                    <div class="input-group mb-3">
                      <input type="password" v-model="chargeDetails.password" placeholder="银行卡密码" class="form-control">
                    </div>
                    <div class="input-group mb-3">
                      <input type="number" v-model="chargeDetails.recharge_amount" placeholder="充值金额" class="form-control">
                    </div>
                    <argon-button color="success" variant="gradient" class="me-3" @click="submitPayment(card)">
                        支付
                    </argon-button>
                    <argon-button color="danger" variant="gradient" @click="cancelPayment(card)">
                      取消
                    </argon-button>
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
      chargeDetails: {
        user_id:'',
        card_number:'',
        password: '', // 银行卡密码
        recharge_amount: 0, // 充值金额
      },
      showAddCardForm: false, // 控制添加新卡表单的显示
      newCard: { // 新银行卡信息
        userId:0,
        bankName: '', // 确保添加了bankName字段
        cardNumber: '',
        cardPassword: '',
        expiryDate: '',
      },
      unBindRequest:{
        user_id: "16",
        card_number: "2222333344445556",
      },
      cards: [],
    };
  },
  async mounted() {
    await this.fetchCards();
  },
  methods: {
      async submitPayment(card) {
        card.showRechargeForm = false; // 关闭充值表单
        // 假设这里执行一些支付逻辑
        // 这里只是直接显示"支付成功"，实际应用中应当在支付逻辑成功后显示
        try {
          this.chargeDetails.user_id=this.$store.state.userId;
          this.chargeDetails.card_number = card.card_number
          const apiUrl = 'http://localhost:8083/api/v1/user/recharge';
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            },
            body: JSON.stringify(this.chargeDetails)
          });
          const res = await response.json();
          if (!response.ok) {
            alert("充值失败",res.message)
          }else{
            this.$emit('recharge-success',res.data);
            //alert('充值成功',res.message)
          }
        } catch (error) {
          alert(`Error fetching directions: ${error}`); // Alert the error
        }
      },
      cancelPayment(card) {
        // 取消支付逻辑，这里只是简单地显示"取消成功"
        //alert("取消成功");
        card.showRechargeForm = false; // 关闭充值表单
      },
      
    // 其他方法保持不变...
    async fetchCards() {
      const userId = this.$store.state.userId;
      try {
        const response = await fetch(`http://localhost:8083/api/v1/user/cards?userId=${userId}`);
        const res = await response.json();
        if (res.code==200) {
          this.cards = res.data.map(cardName => ({
            card_number: cardName,
            showRechargeForm: false
          }));
        } else {
          alert('获取绑定的银行卡信息失败')
        }
      } catch (error) {
        alert('获取绑定的银行卡信息异常')
        console.error('Error fetching cards:', error);
      }
    },
    async unbindCard(card) {
      this.unBindRequest.card_number=card.card_number
      this.unBindRequest.user_id=this.$store.state.userId
      const index = this.cards.indexOf(card);
      if (index > -1) {
        try {
          const response = await fetch("http://localhost:8083/api/v1/user/unbind", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.unBindRequest),
          });
          const res = await response.json();
          if (res.code == 200) {
            this.cards.splice(index, 1);
            alert('银行卡解绑成功');
          } else {
            alert('解绑银行卡失败: ' + res.message);
          }
        } catch (error) {
          console.error('解绑过程中发生错误:', error);
          alert('解绑失败，请稍后再试');
        }
      }
    },
    async submitNewCard() {
      this.showAddCardForm = false
      this.newCard.userId = this.$store.state.userId; // 从全局store获取userId
      const cardData = {
        user_id:  this.newCard.userId,
        card_number: this.newCard.cardNumber,
        card_password: this.newCard.cardPassword,
        bank_name: this.newCard.bankName,
        expiry_date: this.newCard.expiryDate,
      };
      try {
        const response = await fetch("http://localhost:8083/api/v1/user/card", { // 替换为你的后端接口地址
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardData), // 使用用户填写的表单数据
          });
          const res = await response.json();
          if (res.code == 200) {
            alert('绑定银行卡成功 ' + res.code);
            this.cards.push(
              {
                card_number: res.data,
                showRechargeForm: false
              });
            this.showAddCardForm = false;
            // 重置表单，包括移除用户ID
            this.newCard = { bankName: '', cardNumber: '', cardPassword: '', expiryDate: '' };
          } else {
            // 登录失败的处理逻辑，比如显示错误消息
            alert('绑定银行卡失败,响应状态: ' + res.message);
          }
      }catch (error) {
        // 网络或其他错误的处理逻辑
        alert('登录过程中发生错误：' + error.message);
      }
    },
  },
};
</script>
