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
    <!-- 显示OCR识别结果 -->
    <div v-if="ocrResult.length > 0" class="mb-3">
      <h5>OCR识别结果：</h5>
      <ul>
        <li v-for="(text, index) in ocrResult" :key="index">{{ text }}</li>
      </ul>
    </div>
    <button class="btn btn-primary" @click="submitImage">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      ocrResult: [],
    };
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.file = file; // 保存文件以便后续上传
    },
    async submitImage() {
        if (!this.file) {
          alert("请先选择一张图片");
          return;
        }
        const formData = new FormData();
        formData.append('file', this.file);
        try {
          const response = await fetch('http://localhost:8084/ocr', {
            method: 'POST',
            body: formData,
            // 不需要手动设置Content-Type，使用FormData时浏览器会自动处理
          });
          
          const data = await response.json();
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }else{
            this.ocrResult = data.texts;
          }
        } catch (error) {
          console.error("OCR请求失败:", error);
          alert("OCR识别请求异常",error);
        }
    },
    
  },
};
</script>

<style scoped>
img {
  max-height: 300px;
}
</style>
