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

        /*

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        */

        //append found doctors to results page
        $('#drListGroup').append(`
        <div class="modal fade" id="${doctor.doctorId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">${doctor.firstName} ${doctor.lastName}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h4>Specialties</h4>
                ${doctor.bio}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <li class="list-group-item">
          <div class="row">
            <div class="col">
              <h4 class="doctor-name"> ${doctor.lastName}, ${doctor.firstName}</h4><a href="#" data-toggle="modal" data-target="#${doctor.doctorId}"><i class="fas fa-info-circle"></i></a>
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
