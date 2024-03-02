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
            <div class="card-body">
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                 <!-- Example for editable Username -->
                 <div class="col-md-6">
                  <label for="username" class="form-control-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="profile.name" />
                </div>

                <div class="col-md-6">
                  <label for="username" class="form-control-label">Phone Number</label>
                  <input type="tel" class="form-control" id="username" v-model="profile.phone" />
                </div>

                <div class="col-md-6">
                  <label for="username" class="form-control-label">Email</label>
                  <input type="text" class="form-control" id="username" v-model="profile.email" />
                </div>

                

              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Contact Information</p>
              <div class="row">
                
                <div class="col-md-12">
                  <label for="username" class="form-control-label">Address</label>
                  <input type="text" class="form-control" id="username" v-model="profile.address" />
                </div>

                <div class="col-md-12">
                  <label for="username" class="form-control-label">City</label>
                  <input type="text" class="form-control" id="username" v-model="profile.city" />
                </div>

                <div class="col-md-12">
                  <label for="username" class="form-control-label">Country</label>
                  <input type="text" class="form-control" id="username" v-model="profile.country" />
                </div>

                <div class="col-md-12">
                  <label for="username" class="form-control-label">Postal Code</label>
                  <input type="text" class="form-control" id="username" v-model="profile.postal_code" />
                </div>

              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">About me</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="username" class="form-control-label">About Me</label>
                  <input type="text" class="form-control" id="username" v-model="profile.about_me" />
                </div>
              </div>

              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Security and privacy</p>
              <div class="row"> 
                <div class="col-md-6">
                  <label for="username" class="form-control-label">Old Password</label>
                  <input type="text" class="form-control" id="old_password" v-model="old_password" />
                </div>
                <div class="col-md-6">
                  <label for="username" class="form-control-label">New Password</label>
                  <input type="text" class="form-control" id="new_password" v-model="new_password" />
                </div>
                <div class="card-footer text-center d-flex justify-content-center">
                  <argon-button color="success" @click="resetPassword()">Update Password</argon-button>
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
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "profile",
  components: { ProfileCard,  ArgonButton },
  data() {
    return {
      old_password:'',
      new_password:'',
      profile: {
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        aboutMe: '',
        password:"*******"
      },
      editMode: {
        username: false,
        email: false,
        address: false,
        // Add more fields as needed
      },
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/signin');
      });
    },
    async fetchUserProfile() {
      try {
        const userId = this.$store.state.userId; // 从store获取userId
        const response = await fetch(`http://localhost:8083/api/v1/user/profile?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        this.profile = res.data;
        this.profile.password='********'
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        // Optionally, refetch the profile or handle the response
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
      // Fetch user profile logic...
    },
    async resetPassword() {
      try {
        const userId = this.$store.state.userId; // 从store获取userId
        // 构建要发送的数据对象，排除phoneNumber
        const userData = {
          user_id:userId,
          old_password:this.old_password,
          new_password:this.new_password,
        };
        const response = await fetch(`http://localhost:8083/api/v1/user/profile/password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 如果需要，添加其他必要的头部，如认证信息
          },
          body: JSON.stringify(userData)
        });
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        // 更新成功，可以选择重新获取用户信息或直接更新视图
        this.fetchUserProfile(); // 如果你希望重新从后端获取全部最新数据
        alert("更新密码成功")

      } catch (error) {
        console.error("Error saving user profile:", error);
        alert('Failed to update profile'); // 提示用户更新失败
      }
    },
  },
  mounted() {
    this.fetchUserProfile();
    setNavPills();
    setTooltip();
  },
};
</script>
