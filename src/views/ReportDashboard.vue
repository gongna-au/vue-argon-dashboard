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
                          <h6 class="mb-0 text-sm">{{ sale.date }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">TotalRevenue:</p>
                          <h6 class="mb-0 text-sm">{{ sale.totalRevenue }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">TotalParkings:</p>
                          <h6 class="mb-0 text-sm">{{ sale.totalParkings }}</h6>
                        </div>
                      </td>

                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">AverageParkingDuration:</p>
                          <h6 class="mb-0 text-sm">{{ sale.averageParkingDuration }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">PeakHours:</p>
                          <h6 class="mb-0 text-sm">{{ sale.peakHours }}</h6>
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
          title: "This Month's Sales",
          value: "$103,430",
          percentage: "+5%",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "than last month",
        },
        money: {
          title: "Today's Revenue",
          value: "$53,000",
          percentage: "+55%",
          iconClass: "ni ni-money-coins",
          detail: "than yesterday",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Today's Users",
          value: "2,300",
          percentage: "+3%",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: "than yesterday",
        },
        cars: {
          title: "Today's Parked Cars",
          value: "+3,462",
          percentage: "-2%",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "than yesterday",
        },
      },
      sales: [
          { date: "2024-02-20", totalRevenue: "$1200", totalParkings: 300 ,averageParkingDuration: "6h",peakHours:"07:00~12:00"},
          { date: "2024-02-19", totalRevenue: "$1100", totalParkings: 280 ,averageParkingDuration: "7h",peakHours:"07:00~12:00"},
          { date: "2024-02-18", totalRevenue: "$1300", totalParkings: 310 ,averageParkingDuration: "8h",peakHours:"07:00~12:00"},
          { date: "2024-02-17", totalRevenue: "$1250", totalParkings: 305 ,averageParkingDuration: "5h",peakHours:"07:00~12:00"},
          { date: "2024-02-16", totalRevenue: "$1150", totalParkings: 290 ,averageParkingDuration: "9h",peakHours:"07:00~12:00"},
          { date: "2024-02-15", totalRevenue: "$1050", totalParkings: 270 ,averageParkingDuration: "6h",peakHours:"07:00~12:00"},
          { date: "2024-02-14", totalRevenue: "$1350", totalParkings: 320 ,averageParkingDuration: "3h",peakHours:"07:00~12:00"}
      ],
    };
  },
  methods: {
    async fetchSalesData() {
      // 调用后端API获取数据，这里是一个示例，需要根据实际API进行调整
      // 假设API URL为 '/api/sales'，并接受 'date' 作为查询参数
      const response = await fetch(`/api/sales?date=${this.selectedDate}`);
      const data = await response.json();
      // 假设返回的数据结构符合你的 'sales' 数据结构，直接赋值
      this.sales = data;
    }
  },
  components: {
    Card,
    GradientLineChart,
    Carousel,
  },
};
</script>
