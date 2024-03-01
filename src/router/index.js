import { createRouter, createWebHistory } from "vue-router";
import ReportDashboard from "../views/ReportDashboard.vue";
import ParkingHistory from "../views/ParkingHistory.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import FindParking from "../views/FindParking.vue";
import NavigationPage from "../views/NavigationPage.vue";
import MapWithOpenRouteService from "../views/MapWithOpenRouteService.vue";
import RealTimeParking from "../views/RealTimeParking.vue";
import LicensePlateRecognition from "../views/LicensePlateRecognition.vue";
import FAQ from '../views/FAQ.vue'

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signup",
  },
  {
    path: "/report-dashboard",
    name: "ReportDashboard",
    component: ReportDashboard,
  },
  {
    path: "/parking-history",
    name: "ParkingHistory",
    component: ParkingHistory,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/find-parking",
    name: "FindParking",
    component: FindParking,
  },
  {
    path: '/navigation-page',
    name: 'NavigationPage',
    component: NavigationPage,
    props: true, // 确保已经设置
  },
  {
    path: '/map-with-open-route-service',
    name: 'MapWithOpenRouteService',
    component: MapWithOpenRouteService,
    props: true, // 确保已经设置
  },
  {
    path: '/real-time-parking',
    name: 'RealTimeParking',
    component: RealTimeParking,
    props: true, // 确保已经设置
  },
  {
    path: '/license-plate-recognition',
    name: 'LicensePlateRecognition',
    component: LicensePlateRecognition,
    props: true, // 确保已经设置
  },
  {
    path: '/faq',
    name: 'FAQ',
    component:FAQ,
    props: true, // 确保已经设置
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
