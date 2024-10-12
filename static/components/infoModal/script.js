

import { getAppointmentsFilter, months, getTimeName} from "/static/components/calendarSelection/script.js";
import { getSymptomsFromDb } from "/static/components/symptomsSelection/script.js"
import { createRecommendationSent, getSymptomsFromCodeArray} from "/static/pageScripts/utils.js";
// GLOBALS
let btn = null
let dialogChat = null
//

export async function getUserData(userId){
    const res = await fetch(`/api/patient?Patient_ID=${userId}`)
    return await res.json()
}

/**
 * @description shows calendar
 */
export async function showModal(event){

    console.log(event.srcElement)   
    const month = event.srcElement.getAttribute('data-month') 
    const year = event.srcElement.getAttribute('data-year')
    const day = event.srcElement.getAttribute('data-day')
    const userId = event.srcElement.getAttribute('data-userId')
    const time = event.srcElement.getAttribute('data-time')
    const status = event.srcElement.getAttribute('data-status')
    const appointmentId = event.srcElement.getAttribute('data-appointmentId')
    const userInfo = await getUserData(userId)
    const symptomData = await getSymptomsFromDb(appointmentId)
    const symptomCodes = []
    for (let i=0; i<symptomData.length; i++){
        symptomCodes.push(symptomData[i].Symptoms_Code)
    }
    const symptomNames = getSymptomsFromCodeArray(symptomCodes)
    console.log(symptomNames)
    const symptomResponse = createRecommendationSent(symptomNames)
    console.log(symptomResponse)
    console.log(symptomCodes)
    console.log('symptom_CODES', symptomCodes)
    console.log("USER INFO", userInfo)
    const getStatusDisplay = (statusCode) =>{ 
        const color = ['black','green','red']
        const name = ['Pending','Confirmed','Rejected']
        return `<span style="color: ${color[statusCode]}">${name[statusCode]}</span>`
    }

    document.getElementById('im-first-name').innerHTML = userInfo[0].PatientName
    document.getElementById('im-last-name').innerHTML = userInfo[0].PatientLastName
    document.getElementById('im-email').innerHTML = userInfo[0].PatientEmail
    document.getElementById('im-contact-no').innerHTML = userInfo[0].PatientContactNo
    document.getElementById('im-sched-date').innerHTML = `${months[month-1]} ${day}, ${year}`
    document.getElementById('im-time').innerHTML = getTimeName(time)
    document.getElementById('im-status').innerHTML = getStatusDisplay(status)
    document.getElementById('im-sched-response').innerHTML = symptomResponse
    

    

    
    const calendar = document.getElementById('im-modal')
    calendar.classList.add('active');
    
    const dimmer = document.getElementById('im-dimmer')
    calendar.style.display = "block"
    dimmer.style.display = "block"
    
    document.addEventListener('click', outsideClickListener);



    
}

/**
 * @description Closes when pressed x button
 */
function onClickCloseCal(){
    console.log("CLOSING")
    const calendar = document.getElementById('im-modal')
    const dimmer = document.getElementById('im-dimmer')
    calendar.classList.remove('active')
    calendar.classList.add('inactive')

    setTimeout(() => {
        calendar.style.display = "none";
        dimmer.style.display = "none";
        calendar.classList.remove('inactive')
    }, 400); // Wait for animation to finish before hiding
}

/**
 * @description Closes when pressed outside
 * @param {*} event 
 */
function outsideClickListener(event) {
    const calendar = document.getElementById('im-modal');
    const modalContent = document.querySelector('.dr-body');
    //const btn = document.getElementById('im-modal-btn')
   
    // Close the modal if click is outside the modal content
    if (calendar.style.display === "block" && !calendar.contains(event.target)) {
        let proceed = true
        for (let i=0; i<btn.length; i++){
            console.log(i)
            console.log(btn[i])
            if (btn[i].contains(event.target)){
                proceed = false
                console.log('true')
            }
            console.log(proceed)
        }
        
        if (proceed){
            onClickCloseCal();
        }
        
    }
}

/**
 * @description Runs when changing time
 * @param {*} event 
 */

// Component
import { Component } from "/static/components/script.js";
// create component
const _infoModalObj = new Component('/static/components/infoModal/layout.html', '/static/components/infoModal/styling.css')
//*


export async function InfoModal(element, elementButtons){
   
    // wait for element to be added to document
    await _infoModalObj.setToElement(element)
    btn = elementButtons
    document.getElementById('im-close-btn').onclick = onClickCloseCal
  }