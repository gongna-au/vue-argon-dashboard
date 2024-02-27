<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">

      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 me-4'">
          Manager PAGES
        </h6>
      </li>
      
      <li class="nav-item">
        <sidenav-item url="report-dashboard" :class="getRoute() === 'report-dashboard' ? 'active' : ''" :navText="'Report Dashboard'">
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item url="license-plate-recognition" :class="getRoute() === 'license-plate-recognition' ? 'active' : ''" :navText="'Plate Recognition'">
          <template v-slot:icon>
            <!-- 使用 FontAwesome 的汽车图标 -->
            <i class="fas fa-car text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>


      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 me-4'">
          User PAGES
        </h6>
      </li>

      <li class="nav-item">
        <sidenav-item url="/profile" :class="getRoute() === 'profile' ? 'active' : ''" :navText="'Profile'">
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
            
      <li class="nav-item">
        <sidenav-item url="/billing" :class="getRoute() === 'billing' ? 'active' : ''" :navText="'Billing'">
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item url="/find-parking" :class="getRoute() === 'find-parking' ? 'active' : ''" :navText="'Find Parking'">
          <template v-slot:icon>
            <i class="ni ni-map-big text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item url="/real-time-parking" :class="getRoute() === 'real-time-parking' ? 'active' : ''" :navText="'Real-Time Parking'">
          <template v-slot:icon>
            <i class="ni ni-pin-3 text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item url="/parking-history" :class="getRoute() === 'parking-history' ? 'active' : ''" :navText="'Parking History'">
          <template v-slot:icon>
            <i class="ni ni-books text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item url="/faq" :class="getRoute() === 'faq' ? 'active' : ''" :navText="'FAQ'">
          <template v-slot:icon>
            <i class="ni ni-send text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
    />
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
    SidenavCard
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
