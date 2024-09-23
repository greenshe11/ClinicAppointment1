
function getAppointments(month, year, day) {
    return fetch(`http://localhost:5000/api/appointments/forPatient?Appointment_Month=${month}&Appointment_Day=${day}&Appointment_Year=${year}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            return [];
        });
}

function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

// Initialize date-related variables
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = null
let selectMonth = null

let createYear = generate_year_range(1970, 2050);

let calendar = document.getElementById("dr-calendar");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


let monthAndYear = null


function next() {
    timeChooser([])
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    preShowCalendar(currentMonth, currentYear);
}

function previous() {
    timeChooser([])
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    preShowCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    preShowCalendar(currentMonth, currentYear);
}

function resetClassName(newClass, oldClass) {
    const elements = document.getElementsByClassName(oldClass);
    const elementsArray = Array.from(elements);
    elementsArray.forEach(element => {
        element.className = newClass;
    });
}

function getAvailableTime(data){
    let hoursAll = [8,9,10,11,1,2,3,4];
    for (let i=0; i<data.length; i++){
        const valueToRemove = data[i].Appointment_Time;
        const index = hoursAll.indexOf(valueToRemove);
        if (index !== -1) {
            hoursAll.splice(index, 1);
        }
    }
    return hoursAll;
}

function fetchAppointments(month, year, day, callback){
    getAppointments(month, year, day).then(times => {
        callback(times);
    });
}

function timeChooser(hours) {
    const dropDowns = document.getElementsByClassName("dr-hoursChoices");
    if (dropDowns.length > 0) {
        const dropDown = dropDowns[0];
        dropDown.innerHTML = '';
        let initial = '';
        const createChoice = (time) => {
            let value = time;
            if (time >= 8) {
                return `<option value="${value}">${value}:00 AM</option>`;
            } else {
                return `<option value="${value}">${value}:00 PM</option>`;
            }
        };
        for (let i = 0; i < hours.length; i++) {
            initial += createChoice(hours[i]);
        }
        dropDown.innerHTML = initial;
    } else {
        console.error('No elements found with the class name "dr-hoursChoices".');
    }
}

function sendFullDate(event){
    resetClassName('dr-date-picker', 'dr-date-picker dr-date-active');
    const element = event.target.closest('td.dr-date-picker');
    const month = element.getAttribute('data-month');
    const day = element.getAttribute('data-day');
    const year = element.getAttribute('data-year');
    let preReturn = false;
    if (month == null || month == 'null'){
        preReturn = true;
    }
    if (element.className != "dr-date-picker"){
        preReturn = true;
    }
    if (preReturn) {return timeChooser([])}
    element.className = element == `${element.className} dr-date-active`? element.className : `${element.className} dr-date-active`;
    fetchAppointments(month, year, day, (data) => {timeChooser(getAvailableTime(data))});
    console.log(month, day, year);
}

function isDateLessThanCurrent(year, month, day) {
    const currentDate = new Date();
    const givenDate = new Date(year, month - 1, day);
    return givenDate < currentDate;
}

function preShowCalendar(month, year){
    fetchAppointments(month+1, year, "null", (data)=>{showCalendar(month, year, data)});
}

function showCalendar(month, year, monthData) {
    let firstDay = new Date(year, month, 1).getDay();
    let tbl = document.getElementById("dr-calendar-body");
    tbl.innerHTML = "";

    let newRow = document.createElement('tr')
    for (let i = 0; i < days.length; i++) {
        const newCell = document.createElement('td');
        newCell.textContent = `${days[i]}`;
        newCell.classList.add('dr-day-header')
        newRow.appendChild(newCell); // Append the td to the tr
    }
    tbl.appendChild(newRow)
    
    monthAndYear.innerHTML = months[month] + " " + year;
    console.log(monthData);

    const getFilledCount = (day, year) =>{
        let count = 0;
        for (let i=0; i<monthData.length; i++){
            if (monthData[i].Appointment_Day == day && monthData[i].Appointment_Year == year){
                count = count + 1;
            }
        }
        return count;
    }

    const evaluateCount = () =>{
        if (getFilledCount(date, year)>8){
            cell.className = `${cell.className} dr-filled`;
            return true;
        }
        return false;
    }

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                let cell = document.createElement("td");
                cell.className = "dr-date-picker";
                cell.innerHTML = "<a>" + date + "</a>";
                cell.onclick = (event) => {sendFullDate(event)}

                if (j==6 || j==0 || evaluateCount()){
                    cell.setAttribute("data-day", null);
                    cell.setAttribute("data-month", null);
                    cell.setAttribute("data-year", null);
                    cell.setAttribute("data-month_name", months[month]);
                }
                else if(date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.setAttribute("data-day", null);
                    cell.setAttribute("data-month", null);
                    cell.setAttribute("data-year", null);
                    cell.setAttribute("data-month_name", months[month]);
                    cell.className = `${cell.className} dr-today`;
                } else {
                    cell.setAttribute("data-day", date);
                    cell.setAttribute("data-month", month + 1);
                    cell.setAttribute("data-year", year);
                    cell.setAttribute("data-month_name", months[month]);
                }
                if (isDateLessThanCurrent(year, month+1, date)){
                    cell.className = `${cell.className} dr-done`;
                }
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

// MODAL

function onClickShowCal(){
    const calendar = document.getElementById('calendar')
    const dimmer = document.getElementById('dr-dimmer')
    calendar.style.display = "block"
    dimmer.style.display = "block"
    calendar.classList.add('active');
    document.addEventListener('click', outsideClickListener);
}

function onClickCloseCal(){
    const calendar = document.getElementById('calendar')
    const dimmer = document.getElementById('dr-dimmer')
    calendar.classList.remove('active')
    calendar.classList.add('inactive')

    setTimeout(() => {
        calendar.style.display = "none";
        dimmer.style.display = "none";
        calendar.classList.remove('inactive')
    }, 400); // Wait for animation to finish before hiding
}

function outsideClickListener(event) {
    const calendar = document.getElementById('calendar');
    const modalContent = document.querySelector('.dr-body');
    const btn = document.getElementById('dr-modal-btn')


    // Close the modal if click is outside the modal content
    if (calendar.style.display === "block" && !calendar.contains(event.target) && !btn.contains(event.target)) {
        console.log("TRIGGERING")
        onClickCloseCal();
    }
}


import { Component } from "/static/components/script.js";

// create component
const _calendarSelectionObj = new Component('/static/components/calendarSelection/layout.html', '/static/components/calendarSelection/styling.css')


export async function CalendarSelection(element){
    
    // wait for element to be added to document
    await _calendarSelectionObj.setToElement(element)
    selectYear = document.getElementById("dr-year");
    selectMonth = document.getElementById("dr-month");
    monthAndYear = document.getElementById("dr-monthAndYear");
        
 
    preShowCalendar(currentMonth, currentYear);

    // allow functions to be accessed to document, bind object to to method
    window.onClickCloseCal = onClickCloseCal
    window.outsideClickListener = outsideClickListener
    window.onClickShowCal = onClickShowCal
    window.showCalendar = showCalendar
    window.next = next
    window.previous = previous
    window.jump = jump
  }
  window.CalendarSelection = CalendarSelection