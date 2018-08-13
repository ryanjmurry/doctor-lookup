import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { ApiCall } from './api-call.js';
import { ApiParse } from './api-parse.js';



$(document).ready(function() {
  //populates conditions drop down list
  let newApiCall = new ApiCall();
  let conditionsPromise = newApiCall.conditionsPromise();

  conditionsPromise.then(function(response) {
    let newParse = new ApiParse();
    let allConditions = newParse.getConditions(response);
    allConditions.forEach(function(condition) {
      $('#conditionSelector').append(`<option>${condition}</option>`);
    });
  });

  $('#findDrByCondition').click(function() {
    let condition = getUserInput();

    //make new API Call
    let newApiCall = new ApiCall();
    let drByConditionPromise = newApiCall.drByConditionPromise(condition);

    //execute promise
    drByConditionPromise.then(function(response) {
      let newParse = new ApiParse();
      let foundDoctors = newParse.getDoctors(response);
      if (foundDoctors.length === 0) {
        noDoctors();
      }
      
      //appends doctor info to doctor list
      foundDoctors.forEach(function(doctor) {
        console.log(doctor);
        let siteUrl = conditionalWebsite(doctor);
        let newPatient = conditionalNewPatient(doctor);

        //append found doctors to results page
        $('#drListGroup').append(`
          ${modalDisplay(doctor)}
          <li class="list-group-item">
          ${doctorInfo(doctor, newPatient)}
          ${doctorContacts(doctor, siteUrl)}
        </li>`);
      });
    }, function(error) {
      showErrors(error);      
    });
  });
  
  $('#findDrByLastName').click(function() {
    let lastName = getUserInput();

    //make new API Call
    let newApiCall = new ApiCall();
    let drByLastNamePromise = newApiCall.drByLastNamePromimse(lastName);

    //execute promise
    drByLastNamePromise.then(function(response) {
      let newParse = new ApiParse();
      let foundDoctors = newParse.getDoctors(response);
      
      //appends doctor info to doctor list
      foundDoctors.forEach(function(doctor) {
        let siteUrl = conditionalWebsite(doctor);
        let newPatient = conditionalNewPatient(doctor);

        //append found doctors to results page
        $('#drListGroup').append(`
          ${modalDisplay(doctor)}
          <li class="list-group-item">
          ${doctorInfo(doctor, newPatient)}
          ${doctorContacts(doctor, siteUrl)}
        </li>`);
      });
    }, function(error) {
      showErrors(error);      
    });
  });
});

function getUserInput() {
  $('.results').show();
  //get condition and clear results area
  let input = $('#conditionSelector').val();
  $('#drListGroup').text("");
  return input;
}

function noDoctors() {
  $('#drListGroup').append(`<li class="list-group-item"><p>Unfortunately no doctors matched your search. Please try again</p></li>`);
}

function conditionalWebsite(doctor) {
  //to display site URL if one is retrieved from database
  let siteUrl = "";
  if (doctor.website !== "") {
    siteUrl += `<a href="${doctor.website}" class="info-link"><i class="fas fa-external-link-alt"></i> Go To Site</a>`;
  }
  return siteUrl;
}

function conditionalNewPatient(doctor) {
  //to display icon if practice is not accepting new patients
  let newPatient = "";
  if (doctor.newPatients === false) {
    newPatient += `<i class="fas fa-user-alt-slash"></i>`;
  }
  return newPatient;
}

function modalDisplay(doctor) {
  return `<div class="modal fade" id="a${doctor.doctorId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <img class="doctor-image" src="${doctor.image}" alt="doctor thumbnail">
                <h2 class="modal-title" id="exampleModalLongTitle">${doctor.firstName} ${doctor.lastName}</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h4>Bio</h4>
                ${doctor.bio}
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>`;
}

function doctorInfo(doctor, newPatient) {
  return `<div class="row">
    <div class="col">
      <h4 class="doctor-name"> ${doctor.lastName}, ${doctor.firstName}</h4><a href="#" data-toggle="modal" data-target="#a${doctor.doctorId}"><i class="fas fa-info-circle"></i></a>
      <h5 class="practice-name">${doctor.practiceName}</h5>${newPatient}
      <h6 class="specialties">Specialties</h6>
      ${doctor.specialties.map(function(specialty) {
        return "<p>" + specialty.name + "</p>";
      }).join('')}
    </div>`;
}

function doctorContacts(doctor, siteUrl) {
  return `<div class="col">
  ${doctor.phoneNumber.map(function(number){
    if (number.type === "landline") {
      return `<a href="tel:${number.number}" class="info-link"><i class="fas fa-phone"></i> Call ${number.number}<a>`;
    }
  }).join('')}
  <div>
    <i class="fas fa-map-marked-alt"></i><a href="http://maps.google.com/?q=${doctor.address.street}, ${doctor.address.city}, ${doctor.address.state} ${doctor.address.zip}" class="info-link"> Address</a>
  </div>
  <div>
    ${siteUrl}
  </div>
</div>
</div>`;
}

function showErrors(error) {
  $('.results').hide();
  $('.error').show();
  $('.error').text(`There was an error: ${error.message}`); 
}

