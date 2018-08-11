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
    })
  });

  $('#findDrByCondition').click(function() {
    //get condition and clear results area
    let condition = $('#conditionSelector').val();
    $('#drListGroup').text("");

    //make new API Call
    let newApiCall = new ApiCall();
    let drByConditionPromise = newApiCall.drByConditionPromise(condition);

    //execute promise
    drByConditionPromise.then(function(response) {
      let newParse = new ApiParse();
      let foundDoctors = newParse.getDoctors(response);
      console.log(foundDoctors);
      //appends doctor info to doctor list
      foundDoctors.forEach(function(doctor) {
        //to display site URL if one is retrieved from database
        let siteUrl = "";
        if (doctor.website !== "")
        {
          siteUrl += `<a href="${doctor.website}" class="info-link"><i class="fas fa-external-link-alt"></i> Go To Site</a>`;
        }

        //append found doctors to results page
        $('#drListGroup').append(`
        <li class="list-group-item">
          <div class="row">
            <div class="col">
              <h4 class="doctor-name"> ${doctor.lastName}, ${doctor.firstName}</h4><i class="fas fa-info-circle"></i>
              <h6>${doctor.practiceName}</h6>
              ${doctor.specialties.map(function(specialty){
                return "<p>" + specialty.name + "</p>"
              }).join('')}
            </div>
            <div class="col">
              ${doctor.phoneNumber.map(function(number){
                if (number.type === "landline") {
                  return `<a href="tel:${number.number}" class="info-link"><i class="fas fa-phone"></i> Call ${number.number}<a>`
                }
              }).join('')}
              <div>
                <i class="fas fa-map-marked-alt"></i><a href="http://maps.google.com/?q=${doctor.address.street}, ${doctor.address.city}, ${doctor.address.state} ${doctor.address.zip}" class="info-link"> Address</a>
              </div>
              <div>
                ${siteUrl}
              </div>
            </div>
          </div>
        </li>`)
      })
    }, function(error) {
      $('.results').hide();
      $('.error').show();
      $('.error').text(`There was an error: ${error.message}`);      
    });
  });  
});
