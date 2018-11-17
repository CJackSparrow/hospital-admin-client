function onNextPage(){
  if(page == responseList.totalPages - 1){
    return;
  }
  console.log("onNextPage"+page);
  page++;
  console.log("onNextPage2"+page);
  getDepartment();
  if(page == responseList.totalPages - 1){
    disableNextButton();
  }
  enablePreButton();
}

function onPrePage(){
  if(!page){
    return;
  }
  console.log("onPrePage");
  page = page - 1;
  getDepartment();
  if(!page){
    disablePreButton();
  }
  enableNextButton();
}

function onOpenDepartmentDetail(element){
  var departmentId = element.value;
  $('.department-info').prop("disabled", true);
  $('.department-info').val('');

  const url = domain+'department/getById?id='+departmentId;
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(onOpenDeviceDetail)ERROR')
  }).then(function (json) {
    if(json){
      console.log(json);
      showDepartmentInfo(json);
    }

  })
}

function showDepartmentInfo(department){
  $('.department-id').val(department.id);
  $('.department-code').val(department.code);
  $('.department-manager').val(department.manager);
  $('.department-name').val(department.name);

}

function onDeleteDepartment(element){

    console.log("onDelete");

    var r = confirm("Có chắc chắn muốn xóa?");
    if (r == true) {
      var departmentId = element.value;
      const url = domain+'department/delete?id='+departmentId;
      var request = new Request(url, {
        method: 'GET',
        headers: new Headers()
      })

      fetch(request).then(function (response) {
        if (response.ok) {
          return response.json()
        }
        throw new Error('(onDelete)ERROR')
      }).then(function (json) {
        console.log("delete done");
        console.log(json);
      })
      alert("Xóa thành công!")
      getDepartment();

    }

}

function onOpenAddDepartment() {
  $('.department-info').prop("disabled", false);
  $('.department-info').val("");
  $('.save-department-button').show();
}

$('#save-department-form').submit((e)=>{
  e.preventDefault();
  console.log("onSubmit");

  var department = JSON.stringify({
    'id' : $('.department-id').val(),
    'code' : $('.department-code').val(),
    'name' : $('.department-name').val(),
    'manager' : $('.department-manager').val(),

  });
  console.log(department);


  var settings = {
    "crossDomain": true,
    "url": domain+"/department/save",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "data": department
  }

  $.ajax(settings).done(function (response) {
    console.log("ajax");
    console.log(response);
    if(response.toUpperCase() == 'SUCCESS'){
      alert('Lưu thành công!');
      $('.btn-close-detail').click();
      getDepartment();
    }else{
      alert('Có lỗi trong quá trình thêm. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
    }
  }).fail((response)=>{
    alert('Có lỗi trong quá trình thêm. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
  });
});

function onSearchDepartment(){
  console.log('onSearch');
  var searchValue = $(".search-department").val();
  if(!searchValue){
    getDepartment();
  }
  var searchType = $(".search-type option:selected").val();

  const url = domain+'/department/search?page=0&size=15&'+searchType+'='+searchValue;
  console.log(url);
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(onSearchDepartment)ERROR')
  }).then(function (json) {
    if(json.content){
      console.log(json.content);
      loadListDepartment(json.content);
    }

  })
}

function onEdit(input) {
  console.log("onEdit: "+input);
  $('.'+input).prop("disabled", false);
  $('.save-department-button').show();
}