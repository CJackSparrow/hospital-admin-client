const domain = "http://171.244.4.48:6969/api/";
var responseList = null;
var page = 0;

$( document ).ready(function() {

  console.log( "ready!" );
  getDepartment();
});


function getDepartment(){
  const url = domain+'department/list?page='+page+'&size=15'
  var request = new Request(url, {
    method: 'GET',
    headers: new Headers()
  })

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    throw new Error('(getDepartment)ERROR')
  }).then(function (json) {
    responseList = json;
    console.log(json.content);
    loadListDepartment(json.content);
    if(page == responseList.totalPages - 1){
      disableNextButton();
    }
  })
}

function loadListDepartment(departments){
  $(".list-department").empty();
  departments.forEach(department =>{
    $(".list-department").append(DEPARTMENT_ITEM.replace("%NAME%", department.name)
    .replace("%CODE%", department.code)
    .replace("%PRICE%", toSeparatedNumber(department.price))
    .replace("%MANAGER%", department.manager)
    .replace(/%ID%/g,department.id))
  });
}

function disableNextButton(){
  $(".next-page-department").addClass("disabled");
}

function enableNextButton(){
  $(".next-page-department").removeClass("disabled");
}

function disablePreButton(){
  $(".pre-page-department").addClass("disabled");
}

function enablePreButton(){
  $(".pre-page-department").removeClass("disabled");
}

const DEPARTMENT_ITEM = "<tr>"
    + "                  <td>%NAME%</td>"
    + "                  <td>%CODE%</td>"
    + "                  <td>%MANAGER%</td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-default\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-detail\" onclick='onOpenDepartmentDetail(this)' >"
    + "                      Xem"
    + "                    </button>"
    + "                  </td>"
    + "                  <td>"
    + "                    <button type=\"button\" class=\"btn btn-danger\" value='%ID%' data-toggle=\"modal\" data-target=\"#modal-delete\" onclick='onDeleteDepartment(this)'>"
    + "                      Xóa"
    + "                    </button>"
    + "                  </td>"
    + "              </tr>"