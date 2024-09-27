// CALENDAR 
// retrieved from github
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
    try{
        selected.time = document.getElementById('dr-month1').childNodes[0].value
        console.log("SET INITIAL SELECTED TIME TO:", selected.time)
    }catch(e){

    }
   
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
    
    // global variables
    selected.month = month
    selected.day = day
    selected.year = year
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
//*

/**
 * MODAL Calendar
 */
// GLOBALS
export let selected = {month: null, date: null, year: null, time:null, monthName:null, timeName:null}
let btn = null
let dialogChat = null
let purposeClass = null
//

/**
 * shows calendar
 */
function onClickShowCal(){
    const calendar = document.getElementById('calendar')
    const dimmer = document.getElementById('dr-dimmer')
    calendar.style.display = "block"
    dimmer.style.display = "block"
    calendar.classList.add('active');
    document.addEventListener('click', outsideClickListener);
}

/***
 * Closes when pressed x button
 */
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

/**
 * Closes when pressed outside
 * @param {*} event 
 */
function outsideClickListener(event) {
    const calendar = document.getElementById('calendar');
    const modalContent = document.querySelector('.dr-body');
    //const btn = document.getElementById('dr-modal-btn')
   
    console.log('button',btn)
    // Close the modal if click is outside the modal content
    if (calendar.style.display === "block" && !calendar.contains(event.target) && !btn.contains(event.target)) {
        console.log("TRIGGERING")
        onClickCloseCal();
    }
}

/**
 * Runs when changing time
 * @param {*} event 
 */
function onChangeTime(event){
    console.log("Changed to value:",event.target.value)
    selected.time = event.target.value
    console.log('SET TIME TO:', selected.time)
}

/**
 * calculate the day between selected date and todays date
 * @returns 
 */
function getDaysUntilAppointment() {
    // Get today's date
    const selectedDate = selected
    const today = new Date();
    
    // Set the appointment date
    const appointmentDate = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    
    // Calculate the difference in milliseconds
    const timeDifference = appointmentDate - today;
    
    // Convert milliseconds to days (1 day = 1000ms * 60s * 60m * 24h)
    const daysUntilAppointment = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysUntilAppointment;
}

/**
 * store session; 
 */
async function storeAppointmentSession() {
    const res = await fetch(`/api/session/storeAppointmentDate?month=${selected.month}&day=${selected.day}&year=${selected.year}&time=${selected.time}&timeName=${selected.timeName}&monthName=${selected.monthName}`)
    const resJson = await res.json()
    console.log(resJson)
    
}

/**
 * gets session saved
 * @returns 
 */
async function getAppointmentSession() {
    const res = await fetch(`/api/session/getAppointmentDate`)

    const resJson = await res.json()
    console.log(resJson)
    return resJson
}


/**
 * Function when clicking main button
 */
function onSetFunction(){
    // get date
    // get time
    // get Month Name
    // sets if PM or AM
    const getTimeName = (time) =>{
        if (time<8){
            return `${time}:00 PM`
        }else{
            return `${time}:00 AM`
        }
    }
    // selected comes from global variable object {}
    let month = selected.month
    let day = selected.day
    let year = selected.year
    let time = selected.time
    let monthName = months[month]
    let timeName = getTimeName(time)
    selected.monthName = monthName
    selected.timeName = timeName
    purposeClass.onSetAdditionalFunction()

}



/**
 * PURPOSE SPECIFIC, ex. for patient set appointment/ rescheduling
 */

class Purpose{ // blueprint/class
    constructor(){

    }
    // Script to run initially, differs based on purpose
    initialRun(){
        
    }
    // This will run after clicking the main button (onSetFunction); differes based on purpose
    onSetAdditionalFunction(){

    }
}


const cbpAppointment = new Purpose()
cbpAppointment.initialRun = () => {
    const recoverSession = async () => {
        const session = await getAppointmentSession()
        console.log(session)
        const keys = Object.keys(session)
        console.log('keys',keys)
        let key = null
        for (key in keys){
            console.log(key)
            selected[keys[key]] = session[keys[key]]
        }
        console.log(selected)
        const allowance = getDaysUntilAppointment()
        console.log(allowance)
        if (allowance > 0){onSetFunction()}
    }
    recoverSession()
}
cbpAppointment.onSetAdditionalFunction = () => {
    const month = selected.month
    const day = selected.day
    const year = selected.year
    const time = selected.time
    const monthName = selected.monthName
    const timeName = selected.timeName
    if (!(month || day || year || time)){
        alert("Error: You need to set the time and date to make an appointment!")
    } else{
        onClickCloseCal()
        const daysLeft = getDaysUntilAppointment()
        
        const msg = `Would you like to schedule an appointment on <b>${monthName} ${day}, ${year}</b> at <b>${timeName}</b> ? <i style="color: gray">(${daysLeft} day/s from now)</i>`
        dialogChat.innerHTML = msg
        storeAppointmentSession()

        return selected
    }
    
}

//*


// Component
import { Component } from "/static/components/script.js";

// create component
const _calendarSelectionObj = new Component('/static/components/calendarSelection/layout.html', '/static/components/calendarSelection/styling.css')
//*

export async function CalendarSelection(element, elementButton, elementDialog, headerName=null, warningName=null, buttonName=null, purpose='cbp-appointment'){
    if (warningName == null){
        warningName = '* This will reset the appointment status to <b>pending</b> and remove the previous appointment date.'
    }

    // wait for element to be added to document
    await _calendarSelectionObj.setToElement(element)
    document.getElementById('dr-footer-msg').innerHTML = warningName
    document.getElementById('modal-top-name').innerHTML = headerName
    document.getElementById('dr-confirm-button').innerHTML = buttonName
    
    selectYear = document.getElementById("dr-year");
    selectMonth = document.getElementById("dr-month");
    monthAndYear = document.getElementById("dr-monthAndYear");
    

    // set global variables
    btn = elementButton // btn for opening the modal
    dialogChat = elementDialog // a custom dialog
    //*

    // initial runs and `on set` varies by purpose
    // cbp means for chatbot appointment
    const classObjs = {
        'cbp-appointment': cbpAppointment
    }

    purposeClass = classObjs[purpose]
    purposeClass.initialRun() 

    preShowCalendar(currentMonth, currentYear); // show Calendar outisde
    

    // allow functions to be accessed to document html
    window.onClickCloseCal = onClickCloseCal
    window.onSetFunction = onSetFunction
    window.outsideClickListener = outsideClickListener
    window.onClickShowCal = onClickShowCal
    window.showCalendar = showCalendar
    window.next = next
    window.previous = previous
    window.onChangeTime = onChangeTime
    window.jump = jump
  }
  window.CalendarSelection = CalendarSelection