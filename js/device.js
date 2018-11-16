// const domain = "http://171.244.4.48:6969/api/";
const domain = "http://localhost:6969/api/";
var responseList = null;
var page = 0;

$( document ).ready(function() {

  console.log( "ready!" );
  getDevices();
  showListDepartment();
});


function getDevices(){
  const url = domain+'device/list?page='+page+'&size=15'
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(getDevice)ERROR')
  }).then(function (json) {
    responseList = json;
    console.log(json.content);
    loadDevice(json.content);
    if(page == responseList.totalPages - 1){
      disableNextButton();
    }
  })
}

function loadDevice(listDevice){
  $(".list-device").empty();
  listDevice.forEach(device =>{
    $(".list-device").append(DEVICE_ITEM.replace("%NAME%", device.name)
                                        .replace("%CODE%", device.code)
                                        .replace("%PRICE%", toSeparatedNumber(device.price))
                                        .replace("%DATEIN%", convertTimestampToDate(device.dateIn))
                                        .replace(/%ID%/g,device.id))
  });
}

function disableNextButton(){
  $(".next-page-device").addClass("disabled");
}

function enableNextButton(){
  $(".next-page-device").removeClass("disabled");
}

function disablePreButton(){
  $(".pre-page-device").addClass("disabled");
}

function enablePreButton(){
  $(".pre-page-device").removeClass("disabled");
}

function showListDepartment(){
  const url = domain+'department/list?page=0&size=200';
  console.log(url);
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(getListDepartment)ERROR')
  }).then(function (json) {
    if(json.content){
      console.log("getListDepartment");
      console.log(json.content);
      var listDepartment = _.map(json.content, 'name');
      console.log(listDepartment);
      loadDepartment(listDepartment);
    }
  })
}

function loadDepartment(listDepartment){
  $('.device-department').empty();
  console.log('loadDepartment');
  console.log(listDepartment);
  if(listDepartment){
    listDepartment.forEach(department=>{
      $('.device-department').append(DEPARTMENT_OPTION_ITEM.replace(/%NAME%/g,department));
    })
  }
}

const DEVICE_ITEM = "<tr>"
    + "                  <td>%NAME%</td>"
    + "                  <td>%CODE%</td>"
    + "                  <td>%PRICE%</td>"
    + "                  <td>%DATEIN%</td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-default\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-history\" onclick='onOpenUseHistory(%ID%)'>"
    + "                      Xem"
    + "                    </button>"
    + "                  </td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-default\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-repair\" onclick='onOpenRepairHistory(%ID%)'>"
    + "                      Xem"
    + "                    </button>"
    + "                  </td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-default\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-detail\" onclick='onOpenDeviceDetail(this)' >"
    + "                      Xem"
    + "                    </button>"
    + "                  </td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-danger\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-delete\" onclick='onDelete(this)'>"
    + "                      Xóa"
    + "                    </button>"
    + "                  </td>"
    + "              </tr>"

const USE_HISTORY_ITEM ="<tr>"
    + "                  <td>%DAY%</td>"
    + "                  <td>%CONTENT%</td>"
    + "                  <td>%FOLLOWER%</td>"
    + "                 </tr>"

const REPAIR_HISTORY_ITEM = "<tr>"
    + "                  <td>%DAY%</td>"
    + "                  <td>%CONTENT%</td>"
    + "                  <td>%LEVEL%</td>"
    + "                  <td>%FOLLOWER%</td>"
    + "                      </tr>";

const DEPARTMENT_OPTION_ITEM = '<option value="%NAME%">%NAME%</option>';

const ADD_USE_HISTORY = "<tr>"
    + "                  <td>"
    + "                    <div class=\"input-group date\">"
    + "                      <div class=\"input-group-addon\">"
    + "                        <i class=\"fa fa-calendar\"></i>"
    + "                      </div>"
    + "                      <input type=\"text\" class=\"form-control pull-right use-history-date\" id=\"datePickerDateUseHistory\" required>"
    + "                    </div>"
    + "                  </td>"
    + "                  <td>"
    + "                    <input type=\"text\" class=\"form-control use-historycontent\" required>"
    + "                  </td>"
    + "                  <td>"
    + "                    <input type=\"text\" class=\"form-control use-history-follower\" required>"
    + "                  </td>"
    + "                </tr>"

const ADD_REPAIR_HISTORY = "<tr>"
    + "                  <td>"
    + "                    <div class=\"input-group date\">"
    + "                      <div class=\"input-group-addon\">"
    + "                        <i class=\"fa fa-calendar\"></i>"
    + "                      </div>"
    + "                      <input type=\"text\" class=\"form-control pull-right repair-history-date\" id=\"datePickerDateRepair\" required>"
    + "                    </div>"
    + "                  </td>"
    + "                  <td>"
    + "                    <input type=\"text\" class=\"form-control repair-content\" required>"
    + "                  </td>"
    + "                  <td>"
    + "                    <input type=\"number\" class=\"form-control repair-level\" required>"
    + "                  </td>"
    + "                  <td>"
    + "                    <input type=\"text\" class=\"form-control repair-follower\" required>"
    + "                  </td>"
    + "                </tr>"