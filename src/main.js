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
    $('.drListGroup').text("");

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
        console.log(doctor.firstName);
        $('#drListGroup').append(`
        <li class="list-group-item">
          <p><i class="fas fa-user"></i> ${doctor.lastName}, ${doctor.firstName}</p>
        </li>`)
      })
    }, function(error) {
      $('.showError').text(`There was an error: ${error.message}`);      
    });
  });  
});
