function onNextPage(){
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
  var deviceId = element.value;
  const url = domain+'delete?deviceId='+deviceId;
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

  getDevices();
}