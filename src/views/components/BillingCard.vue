<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Detail Billing Information 详细的停车信息</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Pike Place Market Parking Garage</h6>
            <span class="mb-2 text-xs">
              Address:
              <span class="text-dark font-weight-bold ms-sm-2">1531 Western Ave, Seattle, WA 98101 US</span>
            </span>
            <span class="mb-2 text-xs">
              Remaining Parking Spaces:
              <span class="text-dark ms-sm-2 font-weight-bold">90</span>
            </span>
            <span class="text-xs">
              Standard Charge:
              <span class="text-dark ms-sm-2 font-weight-bold">8$/h</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
            </a>
          </div>
        </li>
        <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Millennium Park Garage</h6>
            <span class="mb-2 text-xs">
              Address:
              <span class="text-dark font-weight-bold ms-sm-2">5 S Columbus Dr, Chicago, IL 60603, US</span>
            </span>
            <span class="mb-2 text-xs">
              Remaining Parking Spaces:
              <span class="text-dark ms-sm-2 font-weight-bold">20</span>
            </span>
            <span class="text-xs">
              Standard Charge:
              <span class="text-dark ms-sm-2 font-weight-bold">4$/h</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
            </a>
          </div>
        </li>
        <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Embarcadero Center Parking</h6>
            <span class="mb-2 text-xs">
              Address:
              <span class="text-dark font-weight-bold ms-sm-2">3 Embarcadero Center, San Francisco, US</span>
            </span>
            <span class="mb-2 text-xs">
              Remaining Parking Spaces:
              <span class="text-dark ms-sm-2 font-weight-bold">10</span>
            </span>
            <span class="text-xs">
              Standard Charge:
              <span class="text-dark ms-sm-2 font-weight-bold">3$/h</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "billing-card",
};
</script>
