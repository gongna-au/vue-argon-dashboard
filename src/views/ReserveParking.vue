<template>
    <div class="reserve-parking">
      <h2>Reserve Parking</h2>
      <form @submit.prevent="submitReservation">
        <!-- 选择停车场 -->
        <div class="form-group">
          <label for="parkingLot">Select Parking Lot:</label>
          <select id="parkingLot" v-model="reservation.parkingLot" required>
            <option disabled value="">Please select one</option>
            <option v-for="lot in parkingLots" :key="lot.id" :value="lot.id">{{ lot.name }} - {{ lot.spots }} spots left</option>
          </select>
        </div>
        
        <!-- 选择预定时间 -->
        <div class="form-group">
          <label for="startTime">Start Time:</label>
          <input type="datetime-local" id="startTime" v-model="reservation.startTime" required>
        </div>
        
        <div class="form-group">
          <label for="endTime">End Time:</label>
          <input type="datetime-local" id="endTime" v-model="reservation.endTime" required>
        </div>
        
        <!-- 用户信息输入 -->
        <div class="form-group">
          <label for="userName">Your Name:</label>
          <input type="text" id="userName" v-model="reservation.userName" required>
        </div>
        
        <div class="form-group">
          <label for="userContact">Contact Number:</label>
          <input type="tel" id="userContact" v-model="reservation.userContact" required>
        </div>
        
        <button type="submit" class="btn btn-primary">Reserve Now</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReserveParking',
    data() {
      return {
        reservation: {
          parkingLot: '',
          startTime: '',
          endTime: '',
          userName: '',
          userContact: ''
        },
        parkingLots: [
          { id: '1', name: 'Lot A', spots: 10 },
          { id: '2', name: 'Lot B', spots: 5 },
          { id: '3', name: 'Lot C', spots: 0 }, // 示例：已满的停车场
        ]
      };
    },
    methods: {
      submitReservation() {
        // 在实际应用中，这里应该是发送预定信息到后端的逻辑
        console.log('Reservation submitted:', this.reservation);
        alert('Reservation submitted successfully!');
      }
    }
  };
  </script>
  
  <style>
  .reserve-parking {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  </style>
  