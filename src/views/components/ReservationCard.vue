<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Reservation Information 预定信息</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <!-- 你可以根据需要添加预定信息 -->
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Parking Lot Name</h6>
            <span class="mb-2 text-xs">Address: <span class="text-dark font-weight-bold ms-sm-2">Your Address Here</span></span>
            <!-- 更多信息 -->
          </div>
          <!-- 操作按钮，如取消预定等 -->
          <div class="ms-auto text-end">
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
              <i class="fas fa-times-circle me-2" aria-hidden="true"></i>Cancel Reservation
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "reservation-card",
  // Props, data, methods等可以根据需要添加
};
</script>
