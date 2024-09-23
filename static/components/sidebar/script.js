
function getName() {
    return fetch(`api/patient?for=session`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const LastName = data[0].PatientLastName;
            const firstName = data[0].PatientName;
            const userNameDiv = document.getElementById('userName');
            userNameDiv.innerHTML = `${LastName}, ${firstName}`;
            return data; // Return the data to the caller
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array on error
        });
}

async function logout() {
    try {
        const response = await fetch('/api/patient?for=logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.hasOwnProperty('customError')) {
            alert(result.customError);
            return;
        }

        window.location.href = '/login';
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/home';
    }
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

const closeExpansion = () => {
    document.getElementById('main').style.opacity = '1'
    closeNav();
}

const expand = () => {
    openNav();
    document.getElementById('main').style.opacity = '0'
}

import { Component } from "/static/components/script.js";

// create component
const _sidebarObj = new Component('/static/components/sidebar/layout.html', '/static/components/sidebar/styling.css')


export async function sidebar(element){
    
    // wait for element to be added to document
    await _sidebarObj.setToElement(element)

    getName()

    // allow functions to be accessed to document, bind object to to method
    window.getName = getName
    window.logout = logout
    window.closeNav = closeNav
    window.openNav = openNav
    window.expand = expand    
    window.closeExpansion = closeExpansion
  }
  window.Sidebar = sidebar