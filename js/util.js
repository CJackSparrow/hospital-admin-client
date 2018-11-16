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

function convertDateToTimestamp(date){
  if(!date){
    return null;
  }

  return Date.parse(date);
}