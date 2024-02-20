<template>
    <div>
      <div class="container-fluid py-4">
        <!-- 搜索框 -->
        <div class="mb-4">
          <input type="text" class="form-control" placeholder="搜索附近的停车场..." />
        </div>
        <div class="card">
          <div class="card-header pb-0 px-3">
            <h6 class="mb-0">附近停车场信息</h6>
          </div>
          <div class="card-body pt-4 p-3">
            <ul class="list-group">
              <!-- 动态生成的停车场列表 -->
              <li v-for="parking in filteredParkingList" :key="parking.name" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">{{ parking.name }}</h6>
                  <span class="mb-2 text-xs">
                    地址: <span class="text-dark font-weight-bold ms-sm-2">{{ parking.address }}</span>
                  </span>
                  <span class="mb-2 text-xs">
                    剩余停车位: <span class="text-dark ms-sm-2 font-weight-bold">{{ parking.spaces }}</span>
                  </span>
                  <span class="text-xs">
                    标准收费: <span class="text-dark ms-sm-2 font-weight-bold">{{ parking.charge }}</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "find-parking",
    data() {
      return {
        searchQuery: '',
        parkingList: [
          {
            name: "Pike Place Market Parking Garage",
            address: "1531 Western Ave, Seattle, WA 98101 US",
            spaces: "90",
            charge: "$8/h",
          },
          {
            name: "South Place Market Parking Garage",
            address: "3231 Western Ave, Seattle, WA 98198 US",
            spaces: "100",
            charge: "$7/h",
          },
          {
            name: "West Place Market Parking Garage",
            address: "1356 Western Ave, Seattle, WA 12101 US",
            spaces: "80",
            charge: "$6/h",
          },
          // 其他停车场信息...
        ],
      };
    },
    computed: {
      filteredParkingList() {
        if (this.searchQuery) {
          return this.parkingList.filter(parking =>
            parking.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            parking.address.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        return this.parkingList;
      },
    },
  };
  </script>
  