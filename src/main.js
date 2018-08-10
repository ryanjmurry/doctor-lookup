import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { ApiCall } from './api-call.js';
import { ApiParse } from './api-parse.js';

$(document).ready(function() {
  //populates conditions drop down list
  let newApiCall = new ApiCall();
  let conditionsPromise = newApiCall.ConditionsPromise();

  conditionsPromise.then(function(response) {
    let newParse = new ApiParse();
    let allConditions = newParse.getConditions(response);
    allConditions.forEach(function(condition) {
      $('#conditionSelector').append(`<option>${condition}</option>`);
    })
  });

  
  
});
