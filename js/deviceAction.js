function onNextPage(){
  if(page == responseList.totalPages - 1){
    return;
  }
  console.log("onNextPage"+page);
  page++;
  console.log("onNextPage2"+page);
  getDevices();
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
  getDevices();
  if(!page){
    disablePreButton();
  }
  enableNextButton();
}

function onDelete(element){
  console.log("onDelete");

  var r = confirm("Có chắc chắn muốn xóa?");
  if (r == true) {
    var deviceId = element.value;
    const url = domain+'device/delete?deviceId='+deviceId;
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
    getDevices();

  }

}

function onOpenUseHistory(element){
  console.log('onOpenUseHistory');
  $('.add-use-history-button').show();
  $('.save-use-history-button').hide();
  var deviceId = element;
  console.log("onOpenUseHistory: ", deviceId);
  $('#use-history-table').val(deviceId);
  const url = domain+'useHistory/getByDevice?page=0&size=100&deviceId='+deviceId;
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(onOpenUseHistory)ERROR')
  }).then(function (json) {
    if(json.content){
      showUseHistory(json.content);
    }

  })
}

function showUseHistory(data){
  $(".use-history-content").empty();
  data.forEach(item =>{
    $(".use-history-content").append(USE_HISTORY_ITEM.replace('%DAY%',convertTimestampToDate(item.dateTime))
                                                   .replace('%CONTENT%', item.content)
                                                   .replace('%FOLLOWER%', item.follower));
  });
}

function onAddUseHistory(){
  console.log('onAddUseHistory');
  $('.add-use-history-button').hide();
  $('.save-use-history-button').show();
  $(".use-history-content").append(ADD_USE_HISTORY);
  $('#datePickerDateUseHistory').datepicker({
    autoclose: true
  })

}

$('.use-history-form').submit(()=>{
  console.log('onSubmitUseHistory');
  var deviceId = $('#use-history-table').val();
  var dateTime = convertDateToTimestamp($('.use-history-date').val());
  var content = $('.use-historycontent').val()
  console.log("dateTime "+ dateTime)
  var useHistory = JSON.stringify({
    'deviceId' : deviceId,
    'dateTime' : dateTime,
    'content' : content,
    'follower' : $('.use-history-follower').val()
  });

  var settings = {
    "crossDomain": true,
    "url": domain+"/useHistory/save",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "data": useHistory
  }

  $.ajax(settings).done(function (response) {
    console.log("ajax");
    console.log(response);
    if(response.toUpperCase() == 'SUCCESS'){
      alert('Lưu thành công!');
      onOpenUseHistory(deviceId);

    }else{
      alert('Có lỗi trong quá trình thêm. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
    }
  }).fail((response)=>{
    alert('Có lỗi trong quá trình thêm. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
  });


});


function onOpenRepairHistory(element){
  $('.add-repair-history-button').show();
  var deviceId = element;
  console.log("onOpenRepairHistory: ", deviceId);
  $('.save-repair-history').hide();
  $('#repair-history-table').val(deviceId);
  const url = domain+'repairHistory/getByDevice?page=0&size=20&deviceId='+deviceId;
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(onOpenRepairHistory)ERROR')
  }).then(function (json) {
    console.log("onOpenRepairHistory data");
    console.log(json.content)
    if(json.content){
      showRepairHistory(json.content);
    }
  })
}

function showRepairHistory(data){
  $(".repair-history-content").empty();
  data.forEach(item =>{
    $(".repair-history-content").append(REPAIR_HISTORY_ITEM.replace('%DAY%',convertTimestampToDate(item.dateTime))
                                                   .replace('%CONTENT%', item.content)
                                                   .replace('%LEVEL%', item.level)
                                                   .replace('%FOLLOWER%', item.follower));
  });
}

function onAddRepairHistory(){
  console.log('onAddRepairHistory');
  $('.save-repair-history').show();
  $('.repair-history-content').append(ADD_REPAIR_HISTORY);
  $('#datePickerDateRepair').datepicker({
    autoclose: true
  })
  $('.add-repair-history-button').hide();
}

$('.add-repair-form').submit(()=>{
  console.log('submit repair history');

  var deviceId = $('#repair-history-table').val();
  var dateTime = convertDateToTimestamp($('.repair-history-date').val());
  var content = $('.repair-content').val();
  var level = $('.repair-level').val();

  console.log("dateTime "+ dateTime)
  var useHistory = JSON.stringify({
    'deviceId' : deviceId,
    'dateTime' : dateTime,
    'content' : content,
    'level': level,
    'follower' : $('.repair-follower').val()
  });

  var settings = {
    "crossDomain": true,
    "url": domain+"/repairHistory/save",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "data": useHistory
  }

  $.ajax(settings).done(function (response) {
    console.log("ajax");
    console.log(response);
    if(response.toUpperCase() == 'SUCCESS'){
      alert('Lưu thành công!');
      onOpenRepairHistory(deviceId);

    }else{
      alert('Có lỗi trong quá trình lưu. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
    }
  }).fail((response)=>{
    alert('Có lỗi trong quá trình lưu. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
  });

});

function onOpenDeviceDetail(element){
  $('.device-info').prop("disabled", true);
  $('.device-info').val('');
  console.log("onOpenDeviceDetail");
  var deviceId = element.value;

  const url = domain+'device/getById?id='+deviceId;
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
      showDeviceInfo(json);
    }

  })


}

function showDeviceInfo(device){
  $('.device-id').val(device.id);
  $('.device-code').val(device.code);
  $('.device-name').val(device.name);
  $('.device-number').val(device.number);
  $('.device-madeIn').val(device.madeIn);
  $('.device-madeYear').val(device.madeYear);
  $('.device-department').val(device.department);
  $('.device-dateReceived').val(convertTimestampToDate(device.dateReceived));
  $('.device-dateUse').val(convertTimestampToDate(device.dateUse));
  $('.device-dateIn').val(convertTimestampToDate(device.dateIn));
  $('.device-price').val(toSeparatedNumber(device.price));
  $('.device-description').val(toSeparatedNumber(device.description));
  $('.device-voltageFrom').val(device.voltageFrom);
  $('.device-voltageTo').val(device.voltageTo);
  $('.device-ampe').val(device.ampe);
  $('.device-capacity').val(device.capacity);
  $('.device-accessory').val(device.accessory);
  $('.device-receiver').val(device.receiver);
  $('.device-moneySource').val(device.moneySource);
  $('.device-statusReceipt').val(device.statusReceipt);
  $('.device-levelQuality').val(device.levelQuality);
}

function onOpenAdd(){
  $('.device-info').prop("disabled", false);
  $('.device-info').val("");
  $('.save-device-button').show();

}

function onSearch(){
  console.log('onSearch');
  var searchValue = $(".search-device").val();
  if(!searchValue){
    getDevices();
  }
  var searchType = $(".search-type option:selected").val();

  const url = domain+'/device/search?page=0&size=15&'+searchType+'='+searchValue;
  console.log(url);
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(onOpenUseHistory)ERROR')
  }).then(function (json) {
    if(json.content){
      console.log(json.content);
      loadDevice(json.content);
    }

  })
}


function onSubmitAddDevice() {
  console.log("onSubmitAddDevice");
}

$('.device-form').submit(()=>{
  console.log("onSubmit");

  var device = JSON.stringify({
    'id' : $('.device-id').val(),
    'code' : $('.device-code').val(),
    'name' : $('.device-name').val(),
    'number' : $('.device-number').val(),
    'madeIn' : $('.device-madeIn').val(),
    'madeYear':$('.device-madeYear').val(),
    'department' : $('.device-department').val(),
    'dateReceived' : convertDateToTimestamp($('.device-dateReceived').val()),
    'dateUse' : convertDateToTimestamp($('.device-dateUse').val()),
    'dateIn' : convertDateToTimestamp($('.device-dateIn').val()),
    'price' : $('.device-price').val(),
    'description':$('.device-description').val(),
    'voltageFrom':$('.device-voltageFrom').val(),
    'voltageTo':$('.device-voltageTo').val(),
    'ampe':$('.device-ampe').val(),
    'capacity':$('.device-capacity').val(),
    'accessory':$('.device-accessory').val(),
    'receiver':$('.device-receiver').val(),
    'moneySource':$('.device-moneySource').val(),
    'statusReceipt':$('.device-statusReceipt').val(),
    'levelQuality':$('.device-levelQuality').val()
  });
  console.log(device);


  var settings = {
    "crossDomain": true,
    "url": domain+"/device/save",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "data": device
  }

  $.ajax(settings).done(function (response) {
    console.log("ajax");
    console.log(response);
    if(response.toUpperCase() == 'SUCCESS'){
      alert('Lưu thành công!');
      $('.btn-close-detail').click();
      getDevices();
    }else{
      alert('Có lỗi trong quá trình thêm. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
    }
  }).fail((response)=>{
    alert('Có lỗi trong quá trình thêm. Vui lòng liên hệ kỹ thuật để được hỗ trợ!');
  });

})

function onEdit(input){
  console.log("onEdit: "+input);
  $('.'+input).prop("disabled", false);
  $('.save-device-button').show();
}

