const domain = "http://171.244.4.48:6969/api/device/";
var responseList = null;
var page = 0;
$( document ).ready(function() {

  console.log( "ready!" );
  getDevices();

});


function getDevices(){
  const url = domain+'list?page='+page+'&size=10'
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
    emptyFooterTable();
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

function emptyFooterTable(){
  $(".dataTables_info").parent().parent().empty();
  console.log("emptyFooterTable"+responseList.pageable.pageNumber)
  if(!responseList.totalPages){
    disableNextButton();
  }

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

function toSeparatedNumber (value) {
  if(!value){
    return "";
  }
  return (value && Math.floor(value).toLocaleString());
}

function convertTimestampToDate(timestamp){
  if(!timestamp){
    return "";
  }
  var date = new Date(timestamp);
  return date.toLocaleDateString();
}

const DEVICE_ITEM = "<tr>"
    + "                  <td>%NAME%</td>"
    + "                  <td>%CODE%</td>"
    + "                  <td>%PRICE%</td>"
    + "                  <td>%DATEIN%</td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-default\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-history\">"
    + "                      Xem"
    + "                    </button>"
    + "                  </td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-default\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-repair\">"
    + "                      Xem"
    + "                    </button>"
    + "                  </td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-default\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-detail\">"
    + "                      Xem"
    + "                    </button>"
    + "                  </td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-danger\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-delete\" onclick='onDelete(this)'>"
    + "                      Xóa"
    + "                    </button>"
    + "                  </td>"
    + "              </tr>"


