<template>
    <div class="py-4 container-fluid">
      <!-- ... other components remain unchanged ... -->
      <div class="row mt-4">
        <div class="col-lg-12 mb-lg-0 mb-4">
          <div class="card">
            <div class="p-3 pb-0 card-header">
              <h6 class="mb-2">设备在线情况</h6>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center">
                <thead>
                  <tr>
                    <th>客户端ID</th>
                    <th>状态</th>
                    <th>IP地址</th>
                    <th>会话到期间隔</th>
                    <th>连接时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="connection in connections" :key="connection.id">
                    <td class="text-sm align-middle">{{ connection.clientId }}</td>
                    <td class="text-sm align-middle">{{ connection.isConnected }}</td>
                    <td class="text-sm align-middle">{{ connection.ipAddress }}</td>
                    <td class="text-sm align-middle"> {{ connection.sessionExpiryInterval }}</td>
                    <td class="text-sm align-middle" >{{ connection.connectedAt }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- The rest of the template remains the same ... -->
      </div>
    </div>
  </template>
  
  <script>
  // Import your components as before, and ensure you import the required dependencies for this page
  
  export default {
    name: "IoTDeviceStatusDashboard",
    data() {
      return {
        // ... other data remains unchanged ...
        connections: [
          // Add your connections data here (The previous mock data entries)
          {
        id: 1,
        clientId: 'bridge:mqtt:egress:1:emqx@127.0.0.1',
        username: 'user1',
        isConnected: true,
        ipAddress: '115.236.21.86:25268',
        keepalive: 60,
        cleanStart: true,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 17:32:31'
      },
      {
        id: 2,
        clientId: 'mqtt_0042bb8e_1',
        username: 'user2',
        isConnected: true,
        ipAddress: '182.245.155.127:5098',
        keepalive: 30,
        cleanStart: true,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 17:36:45'
      }, {
        id: 3,
        clientId: 'mqtt_0042bb8e_2',
        username: 'user3',
        isConnected: true,
        ipAddress: '182.245.155.127:5099',
        keepalive: 30,
        cleanStart: true,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 17:36:45'
      },
      {
        id: 4,
        clientId: 'mqtt_0042bb8e_3',
        username: 'user4',
        isConnected: false,
        ipAddress: '182.245.155.127:5100',
        keepalive: 30,
        cleanStart: false,
        sessionExpiryInterval: 120,
        connectedAt: '2024-4-14 17:40:00'
      },
      {
        id: 5,
        clientId: 'mqtt_0042bb8e_4',
        username: 'user5',
        isConnected: true,
        ipAddress: '182.245.155.127:5101',
        keepalive: 60,
        cleanStart: true,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 17:42:10'
      },
      {
        id: 6,
        clientId: 'mqtt_0042bb8e_5',
        username: 'user6',
        isConnected: false,
        ipAddress: '182.245.155.127:5102',
        keepalive: 15,
        cleanStart: true,
        sessionExpiryInterval: 30,
        connectedAt: '2024-4-14 17:45:23'
      },
      {
        id: 7,
        clientId: 'mqtt_0042bb8e_6',
        username: 'user7',
        isConnected: true,
        ipAddress: '182.245.155.127:5103',
        keepalive: 45,
        cleanStart: false,
        sessionExpiryInterval: 60,
        connectedAt: '2024-4-14 17:50:00'
      },
      {
        id: 8,
        clientId: 'mqtt_0042bb8e_7',
        username: 'user8',
        isConnected: true,
        ipAddress: '182.245.155.127:5104',
        keepalive: 30,
        cleanStart: true,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 17:55:12'
      },
      {
        id: 9,
        clientId: 'mqtt_0042bb8e_8',
        username: 'user9',
        isConnected: false,
        ipAddress: '182.245.155.127:5105',
        keepalive: 30,
        cleanStart: false,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 18:00:00'
      },
      {
        id: 10,
        clientId: 'mqtt_0042bb8e_9',
        username: 'user10',
        isConnected: true,
        ipAddress: '182.245.155.127:5106',
        keepalive: 20,
        cleanStart: true,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 18:05:45'
      },
      {
        id: 11,
        clientId: 'mqtt_0042bb8e_10',
        username: 'user11',
        isConnected: true,
        ipAddress: '182.245.155.127:5107',
        keepalive: 60,
        cleanStart: true,
        sessionExpiryInterval: 0,
        connectedAt: '2024-4-14 18:10:00'
      },
      {
        id: 12,
        clientId: 'mqtt_0042bb8e_11',
        username: 'user12',
        isConnected: false,
        ipAddress: '182.245.155.127:5108',
        keepalive: 30,
        cleanStart: false,
        sessionExpiryInterval: 120,
        connectedAt: '2024-4-14 18:15:33'
      },
        ]
      };
    },
    // ... methods, components, etc., remain unchanged ...
  };
  </script>
  
  <style scoped>
  /* Add any additional styles you need for this page */
  
  .status-connected i {
    color: #4CAF50; /* Green for connected */
  }
  
  .status-disconnected i {
    color: #F44336; /* Red for disconnected */
  }
  
  /* Other scoped styles */
  </style>
  