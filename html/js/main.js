function ajaxCall() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "api", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(xhttp.responseText);
       var table = document.getElementById("tbl");
       table.innerHTML = ""; //Clear the table before creating it
       for (var j = 0; j < 4; j++) {
         var th = document.createElement('th'); //column
         switch(j) {
           case 0:
             th.innerHTML = "Name";
             break;
           case 1:
             th.innerHTML = "Country";
             break;
           case 2:
             th.innerHTML = "Message";
             break;
           case 3:
             th.innerHTML = "Date";
             break;
         }
         table.appendChild(th);
     }
       for(var i = 0; i < data.length; i++) {
         var table = document.getElementById("tbl");
         var row = table.insertRow(i);
         var cell = row.insertCell(0);
         var cell1 = row.insertCell(1);
         var cell2 = row.insertCell(2);
         var cell3 = row.insertCell(3);
         cell.innerHTML = data[i].Name;
         cell1.innerHTML = data[i].Country;
         cell2.innerHTML = data[i].Message;
         cell3.innerHTML = data[i].Date;
       }
    }
  };
}

function sendData() {
  var $name = $('#name');
  var $country = $('#country');
  var $message = $('#message');

  var object = {
    Name: $name.val(),
    Country: $country.val(),
    Message: $message.val(),
    Date: new Date()
  };
  var jsonObject = JSON.stringify(object);

  const xhr = new XMLHttpRequest();
  xhr.open("POST","api");
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(jsonObject);
  ajaxCall();
}
