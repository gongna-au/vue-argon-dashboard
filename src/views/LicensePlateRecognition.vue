<template>
    <div class="container py-5">
      <div class="mb-3">
        <label for="imageUpload" class="form-label">上传车辆图片</label>
        <input class="form-control" type="file" id="imageUpload" @change="previewImage" accept="image/*">
      </div>
      <div v-if="imageUrl" class="mb-3">
        <h5>预览：</h5>
        <img :src="imageUrl" class="img-fluid" alt="车辆图片预览">
      </div>
      <div class="mb-3">
        <label for="licensePlate" class="form-label">车牌号</label>
        <input type="text" class="form-control" id="licensePlate" v-model="licensePlate" placeholder="请输入车牌号">
      </div>
      <button class="btn btn-primary" @click="submitLicensePlate">提交</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageUrl: null,
        licensePlate: '',
      };
    },
    methods: {
      previewImage(event) {
        const file = event.target.files[0];
        this.imageUrl = URL.createObjectURL(file);
      },
      submitLicensePlate() {
        console.log("提交的车牌号:", this.licensePlate);
        // 这里可以添加代码，如使用axios发送车牌号和图片到后端服务器等
      },
    },
  };
  </script>
  
  <style scoped>
  img {
    max-height: 300px;
  }
  </style>
  