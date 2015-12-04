var curDate = new Date();
var curYear = curDate.getFullYear();
var curMonth = curDate.getMonth();
var day = curDate.getDay();
var curDateValue = curDate.getDate();
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var noofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthNamesFormat = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];//using to display in dtae format
// displaying days in calender with change of month and year
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
    if (rows === (rowsCount - 2)) {
        rows = rows;
    } else {
          rows = rows + 1;
    }
    for (var m = 0; m < rows; m++) {
        var row = document.getElementById('row'+(m+1) +'');
        row.border = 1;
        for (var j = 0; j < 7; j++) {
            var td = document.getElementById('cell'+ digit +'');
            if ((startDay === 5) && (days === 31) && (rows === (rowsCount - 2))){
                var t = document.getElementById('cell1');
                t.innerHTML = '<span onclick="getDateValue('+ days +')">'+ days + '</span>';
                t.className = 'date';
            }
            if ((startDay === 6) && (days === 31) && (rows === (rowsCount - 2))){
                var newValue = document.getElementById('cell1');
                newValue.innerHTML = '<span onclick="getDateValue('+ (days - 1) +')">'+ (days - 1) + '</span>';
                newValue.className = 'date';
                var newVal = document.getElementById('cell2');
                newVal.innerHTML = '<span onclick="getDateValue('+ days +')">'+ days + '</span>';
                newVal.className = 'date';
            }
            if ((startDay === 6) && (days === 30) && (rows === (rowsCount - 2))){
                var tValue = document.getElementById('cell1');
                tValue.innerHTML = '<span onclick="getDateValue('+ days +')">'+ days + '</span>';
                tValue.className = 'date';
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
                        td.innerHTML = '<span onclick="getDateValue(' + dayValue +')">'+ dayValue + '</span>';
                     } else { if (dayValue === days) {
                                  td.innerHTML = '<span onclick="getDateValue(' + dayValue +')">'+ dayValue + '</span>';
                                  td.className = "date";
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
};
// go to the previous month in calender
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
// next month selection in the calender
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
                        td.innerHTML = '<span onclick="getDateValue(' + dayValue +')">'+ dayValue + '</span>';
                      } else { if (dayValue === days) {
                                  td.innerHTML = '<span onclick="getDateValue(' + dayValue +')">'+ dayValue + '</span>';
                                  td.className = "date";
                               } else {
                                    td.innerHTML = "";
                                    td.className = "";
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
};
//show calender
var showCalender = function(month, year, days, date){
    var monthName = document.getElementById('monthName');
    monthName.innerHTML = monthNames[month];
    var y = document.getElementById('yearName');
    y.innerHTML = " " + year;
    displayDays(month, year, days, date);
};
//getting days in month to display in calender
var getDays = function(month, year) {
    var days = 0;
    if (month === 1) {
        if (((((year % 4) === 0) || ((year % 400) === 0))) && ((year % 100) !== 0)){
            days = 29;
        } else {
              days = 28;
          }
    } else {
        days = noofDays[month];
      }
    return days;
};
//getting the date value from calender
var getDateValue = function(value) {console.log(value);
    clear('datepickertxt');
    var date = value;console.log(date);
    var month = document.getElementById('monthName').innerHTML;
    monthId = monthNames.indexOf(month);
    var year = document.getElementById('yearName').innerHTML;
    var dateValue = document.getElementById('datepickertxt');
    dateValue.value = (monthId + 1) + " / " + date + " / " + year;
};
//set the date in calender
var setDateValue = function() {
    var dateValue = document.getElementById('datepickertxt');
    var date = new Date(dateValue.value);
    var month = date.getMonth();
    var year = date.getFullYear();
    document.getElementById('calenderIcon').click();
    displayCalender(date);
    clear('datepickertxt');
};
// displaying the calender after setting date
var displayCalender = function(date) {
    var month = date.getMonth();
    var year = date.getFullYear();
    var days = getDays(month, year);
    showCalender(month, year, days, date);
};
//disable the onclick event
var disableOnclick = function(id){
    document.getElementById(id).removeAttribute('onclick');
};
//clearing the data in html
var clear = function(id) {
    document.getElementById(id).value ="";
};
