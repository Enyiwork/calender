var curDate = new Date();
var curYear = curDate.getFullYear();
var curMonth = curDate.getMonth();
var day = curDate.getDay();
var curDateValue = curDate.getDate();
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var noofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthNamesFormat = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];

var displayDays = function(month, year, days, date) {
    clear('datepickertxt');
    var firstDay = new Date(year, month, 1);//starting day of month
    var startDay = firstDay.getDay();
    var table = document.getElementById('calenderTable'); // week id for staring day
    var rows = Math.ceil(days/7);
    var digit = 1;
    var dayValue = 1;
    var dateValue = date.getDate();
    var rowsCount = table.rows.length;
    for (var m = 0; m < rows; m++) {
        var row = document.getElementById('row'+(m+1) +'');
        row.border = 1;
        for (var j = 0; j < 7; j++) {
            var td = document.getElementById('cell'+ digit +'');
            if ((startDay === 5) && (days === 31) && (rows === (rowsCount - 2))){
                var t = document.getElementById('cell1');
                t.innerHTML = days;
                t.addEventListener('click', function(){getDateValue('cell1');});
                t.className = 'date';
            }
            if ((startDay === 6) && (days === 31) && (rows === (rowsCount - 2))){
                var newValue = document.getElementById('cell1');
                newValue.addEventListener('click', function(){getDateValue('cell1');});
                newValue.innerHTML = days - 1;
                newValue.className = 'date';
                var newVal = document.getElementById('cell2');
                newVal.innerHTML = days;
                newVal.className = 'date';
                newVal.addEventListener('click', function(){getDateValue('cell2');});
            }
            if ((startDay === 6) && (days === 30) && (rows === (rowsCount - 2))){
                var tValue = document.getElementById('cell1');
                tValue.innerHTML = days;
                tValue.className = 'date';
                tValue.addEventListener('click', function(){getDateValue('cell1');});
            }
            if (digit <= startDay) {
                td.innerHTML = "";
                td.className = "";
                digit++;
            } else { if ((dayValue < days) && (digit > startDay)) {
                        if ((curDateValue === dayValue) && (dateValue === curDateValue)) {
                              td.className = "currentDate";
                        } else { if(dateValue === dayValue) {
                                    td.className = "selectedDate";
                                 } else {
                                      td.className = "date";
                                   }
                          }
                        td.innerHTML = dayValue;
                        td.addEventListener('click', function(){getDateValue('cell'+ digit +'');});
                     } else { if (dayValue === days) {
                                  td.innerHTML = dayValue;
                                  td.className = "date";
                                  td.addEventListener('click', function(){getDateValue('cell'+ digit +'');});
                              } else {
                                    td.innerHTML = "";
                                    td.className = "";
                                }
                       }
                     dayValue++;
                     digit++;
              }
        }
    }
    digit = 1;
    dayValue = 1;
  /*for (var k = 1; k <= 35; k++) {
      var tdf = document.getElementById('cell'+ k +'');
      tdf.addEventListener('click', function(){getDateValue('cell'+ k +'');});console.log("cell"+ k);
  }*/
};

var prevMonth = function(){
    var getMonthName = document.getElementById('monthName').innerHTML;
    var monthId = monthNames.indexOf(getMonthName);
    var year = parseInt(document.getElementById('yearName').innerHTML);
    var days = 0;
    if ((monthId > 0) && (monthId <= 11)) {
        monthId = monthId - 1;
    }
    else {
        monthId = 11;
        if (year === curYear) {
            year = curYear - 1;
        } else {
            year = year - 1;
          }
    }
    days = getDays(monthId, year);
    showCalender(monthId, year, days, curDate);
};

var nextMonth = function(){
    var getMonthName = document.getElementById('monthName').innerHTML;
    var monthId = monthNames.indexOf(getMonthName);
    var year = parseInt(document.getElementById('yearName').innerHTML);
    var days = 0;

    if (monthId < 11)
    {
      monthId = monthId + 1;
    } else{
        monthId = 0;
        if (year === curYear) {
            year = curYear + 1;
        } else {
            year = year + 1;
          }
      }
    days = getDays(monthId, year);
    showCalender(monthId, year, days,curDate);
};
//build calender

var buildCalender = function() {
    clear('datepickertxt');
    var curDateValue = curDate.getDate();
    var calenderDiv = document.getElementById('calenderDiv');
    var table = document.createElement('table');
    table.id = 'calenderTable';
    table.border = 1;
    var tr = document.createElement('tr');
    tr.border = 1;
    for ( var i = 0; i < monthNames.length; i++) {
      if (curMonth === i)
      {
          thead = document.createElement('th');
          thead.border = 1;
          thead.id = "calenderName";
          thead.setAttribute('colspan', 7);
          thead.innerHTML = '<button onclick="prevMonth()" > &#8249</button><span id="monthName">'+ monthNames[i] + '</span><span id="yearName"> ' + curYear + '</span><button onclick="nextMonth()" > &#8250</button>';
          tr.appendChild(thead);
          break;
      }
    }
    table.appendChild(tr);
    var t = document.createElement('tr');
    for (var w = 0; w < dayNames.length; w++) {
      var th = document.createElement('th');
      th.innerHTML = dayNames[w];
      t.appendChild(th);
    }
    table.appendChild(t);
    var days = getDays(curMonth, curYear);
    var firstDay = new Date(curYear, curMonth, 1);//starting day of month
    var startDay = firstDay.getDay();// week id for staring day
    var rows = Math.ceil(days/7);
    var digit = 1;
    var dayValue = 1;
    for (var m = 0; m < rows; m++) {
        var row = document.createElement('tr');
        row.id = 'row'+(m+1) +'';
        row.border = 1;
        for (var j = 0; j < 7; j++) {
            var td = document.createElement('td');
            td.border = 1;
            td.id = 'cell'+ digit +'';
            if (digit <= startDay) {
                td.innerHTML = "";
                td.className = "";
                digit++;
            } else {  if ((dayValue < days) && (digit > startDay)) {
                        if (curDateValue === dayValue) {
                          td.className = "currentDate";
                        } else {
                              td.className = "date";
                          }
                        td.innerHTML = dayValue;
                        //td.addEventListener('click', function(){getDateValue('cell'+ digit +'');});
                      } else { if (dayValue === days) {
                                  td.innerHTML = dayValue;
                                  td.className = "date";
                                  //td.addEventListener('click', function(){getDateValue('cell'+ digit +'');});
                               } else {
                                    td.innerHTML = "";
                                    td.className = "";
                                 }
                        }
                        dayValue++;
                        digit++;
                        //td.addEventListener('click', function(){getDateValue('cell'+ digit +'');});
              }
            row.appendChild(td);
        }
        table.appendChild(row);
      }
      calenderDiv.appendChild(table);
      for (var k = 1; k <= 35; k++) {
        var tdf = document.getElementById('cell'+ k +'');
        tdf.addEventListener('click', function(){getDateValue('cell'+ k +'');});
      }
};
//show calender
var showCalender = function(month, year, days, date){
    var monthName = document.getElementById('monthName');
    monthName.innerHTML = monthNames[month];
    var y = document.getElementById('yearName');
    y.innerHTML = " " + year;
    displayDays(month, year, days, date);
};
var getDays = function(month, year) {
    var days = 0;
    if (month === 1) {
        if (((year % 100) !== 0) && ((year % 400) === 0)){
            days = 29;
        } else { if ((year % 4) === 0) {
                    days = 29;
                 } else {
                      days = 28;
                   }
          }
    } else {
        days = noofDays[month];
      }
    return days;
};
var getDateValue = function(id) {console.log(id);
    clear('datepickertxt');
    var date = document.getElementById(id).innerHTML;console.log(date);
    var month = document.getElementById('monthName').innerHTML;
    monthId = monthNames.indexOf(month);
    var year = document.getElementById('yearName').innerHTML;
    var dateValue = document.getElementById('datepickertxt');
    dateValue.value = monthNamesFormat[monthId] + " / " + date + " / " + year;
};
var setDateValue = function() {

    var dateValue = document.getElementById('datepickertxt');
    var date = new Date(dateValue.value);console.log(date);
    var month = date.getMonth();console.log(month);
    var year = date.getFullYear();console.log(year);
    document.getElementById('calenderIcon').click();
    //buildCalender(month, year, date);
    displayCalender(date);
    clear('datepickertxt');
    //disableOnclick('calenderIcon');
    //buildCalender = null;
    //datevalue.disabled = true;
    //document.getElementById('calenderIcon').removeAttribute('onclick');
};
/*var buildCalender = function(month, year, date) {
  var calenderDiv = document.getElementById('calenderDiv');
  var table = document.createElement('table');
  table.id = 'calenderTable';
  table.border = 1;
  var tr = document.createElement('tr');
  tr.border = 1;
  for ( var i = 0; i < monthNames.length; i++)
  {
    if (month === i)
    {
        thead = document.createElement('th');
        thead.border = 1;
        thead.id = "calenderName";
        thead.setAttribute('colspan', 7);
        thead.innerHTML = '<button onclick="prevMonth()" > &#8249</button><span id="monthName">'+ monthNames[i] + '</span><span id="yearName"> ' + year + '</span><button onclick="nextMonth()" > &#8250</button>';
        tr.appendChild(thead);
        break;
    }
  }
  table.appendChild(tr);
  var t = document.createElement('tr');
  for (var w = 0; w < dayNames.length; w++)
  {
    var th = document.createElement('th');
    th.innerHTML = dayNames[w];
    t.appendChild(th);
  }
  table.appendChild(t);
  var days = getDays(month, year);
  var firstDay = new Date(year, month, 1);//starting day of month
  var startDay = firstDay.getDay();// week id for staring day
  var rows = Math.ceil(days/7);
  var digit = 1;
  var dayValue = 1;
  var dateVal = date.getDate();
  for (var m = 0; m <= rows; m++)
  {
      var row = document.createElement('tr');
      row.id = 'row'+(m+1) +'';
      row.border = 1;
      for (var j = 0; j < 7; j++)
      {
          var td = document.createElement('td');
          td.border = 1;
          td.id = 'cell'+ digit +'';
          if (digit <= startDay)
          {
              td.innerHTML = '<span>' + "" + '</span>';
              digit++;
          }
          else {
              if ((dayValue < days) && (digit > startDay)) {
                if ((curDateValue === dayValue) && (dateVal === curDateValue)) {
                    td.className = "currentDate";
                }
                else {
                    if(dateVal === dayValue)
                    {
                        td.className = "selectedDate";
                    }
                    else {
                        td.className = "date";
                    }
                }
                  td.innerHTML = '<span>' + dayValue +'<span>';
                  }
              else {
                  if (dayValue === days) {
                      td.innerHTML = '<span>' + dayValue + '</span>';
                  }
                  else {
                      td.innerHTML = '<span>' + "" + '<span>';
                  }
              }
              dayValue++;
              digit++;
          }
          row.appendChild(td);
      }
      table.appendChild(row);
    }
  calenderDiv.appendChild(table);
};*/
var displayCalender = function(date) {
    var month = date.getMonth();
    var year = date.getFullYear();
    var days = getDays(month, year);
    showCalender(month, year, days, date);
};
var disableOnclick = function(id){
    document.getElementById(id).removeAttribute('onclick');
};
var clear = function(id) {
    document.getElementById(id).value ="";
};
