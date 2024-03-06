<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.sales.title"
              :value="stats.sales.value"
              :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass"
              :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.money.title"
              :value="stats.money.value"
              :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.users.title"
              :value="stats.users.value"
              :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.cars.title"
              :value="stats.cars.value"
              :percentage="stats.cars.percentage"
              :iconClass="stats.cars.iconClass"
              :iconBackground="stats.cars.iconBackground"
              :percentageColor="stats.cars.percentageColor"
              :detail="stats.cars.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-12 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Sales Report</h6>
                  <div>
                    <input type="date" v-model="selectedDate" />
                    <button @click="fetchSalesData">Select Date</button>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Date:</p>
                          <h6 class="mb-0 text-sm">{{ sale.Date }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">TotalRevenue:</p>
                          <h6 class="mb-0 text-sm">{{ sale.TotalRevenue }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">TotalParkings:</p>
                          <h6 class="mb-0 text-sm">{{ sale.TotalParkings }}</h6>
                        </div>
                      </td>

                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">MinDuration:</p>
                          <h6 class="mb-0 text-sm">{{ sale.MinDuration }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">MaxDuration:</p>
                          <h6 class="mb-0 text-sm">{{ sale.MaxDuration }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";


export default {
  name: "report-dashboard",
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10), // 默认今天的日期，你可以根据需要调整为最近一周的逻辑
      stats: {
        sales: {
          title: "本月收入",
          value: "$103,430",
          percentage: "+5%",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "较上月",
        },
        money: {
          title: "今日收入",
          value: "$53,000",
          percentage: "+55%",
          iconClass: "ni ni-money-coins",
          detail: "较昨日",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "用户量/日",
          value: "2,300",
          percentage: "+3%",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: "较昨日",
        },
        cars: {
          title: "车辆数/日",
          value: "3,462",
          percentage: "-2%",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "较昨日",
        },
      },
      sales: [
          { Date: "2024-02-28", TotalRevenue: "102", TotalParkings: 300 ,MinDuration: "0 days 0 hours 45 minutes 0 seconds",MaxDuration:"1 days 0 hours 45 minutes 0 seconds"},
          { Date: "2024-02-27", TotalRevenue: "870", TotalParkings: 764 ,MinDuration: "1 days 0 hours 45 minutes 0 seconds",MaxDuration:"1 days 0 hours 34 minutes 0 seconds"},
          { Date: "2024-02-26", TotalRevenue: "100", TotalParkings: 50 ,MinDuration: "1 days 0 hours 45 minutes 0 seconds",MaxDuration:"1 days 5 hours 0 minutes 0 seconds"},
          { Date: "2024-02-25", TotalRevenue: "324", TotalParkings: 453 ,MinDuration: "3 days 0 hours 45 minutes 0 seconds",MaxDuration:"1 days 2 hours 0 minutes 0 seconds"},
      ],
    };
  },
  methods: {
    async fetchSalesData() {
      // 调用后端API获取数据，这里是一个示例，需要根据实际API进行调整
      // 假设API URL为 '/api/sales'，并接受 'date' 作为查询参数
      const response = await fetch(`http://localhost:8083/api/v1/parking/sales?endTime=${this.selectedDate}`);
      const res = await response.json();
      // 假设返回的数据结构符合你的 'sales' 数据结构，直接赋值
      this.sales = [res.data];
      if (res.code!=200) {        
        alert('获取停车收入失败,响应状态: ' + res.message);
      }

    }
  },
  components: {
    Card,
    GradientLineChart,
    Carousel,
  },
};
</script>
