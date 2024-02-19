<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/team-1.jpg"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">Sayo Kravits</h5>
                <p class="mb-0 font-weight-bold text-sm">Public Information</p>
              </div>
            </div>
            

            
           

            <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0" >
              <!-- 新增的退出登录按钮列 -->
              <div class="col d-flex justify-content-end">
                <argon-button color="danger" @click="logout">Logout</argon-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Edit Profile</p>
                <argon-button color="success" size="sm" class="ms-auto"
                  >Settings</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Username</label
                  >
                  <argon-input type="text" value="Sayo Kravits" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Phone Number</label
                  >
                  <argon-input type="tel" value="15102768544" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Email</label
                  >
                  <input class="form-control" type="text" value="sayokravits@gmail" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Password</label
                  >
                  <argon-input type="text" value="***********" />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Contact Information</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >Address</label
                  >
                  <argon-input
                    type="text"
                    value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >City</label
                  >
                  <argon-input type="text" value="New York" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Country</label
                  >
                  <argon-input type="text" value="United States" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Postal code</label
                  >
                  <argon-input type="text" value="437300" />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">About me</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >About me</label
                  >
                  <argon-input
                    type="text"
                    value="A beautiful Dashboard for Bootstrap 5. It is Free and Open Source."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <profile-card />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "./components/ProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  data() {
    return {
      showMenu: false
    };
  },
  components: { ProfileCard, ArgonInput, ArgonButton },
  methods: {
      logout() {
        // 清除本地存储或 Vuex 状态中的用户认证信息
        // 例如，如果你使用 localStorage:
        // localStorage.removeItem('userToken');
        // 重定向到登录页面
        this.$router.push('/signin');
      },
  },
  // mounted, beforeMount 等生命周期钩子
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  }
};
</script>
