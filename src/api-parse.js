import { Doctor } from './doctor.js';

export class ApiParse {
  
  getConditions(response) {
    let body = JSON.parse(response);
    let allConditions = [];
    body.data.forEach(function(condition) {
      allConditions.push(condition);
    });
    return allConditions;
  }

  // getDoctor(response) {
  //   let body = JSON.parse(response);
  //   let allDoctors = [];
  //   body.data.forEach(function(doctor) {
  //     let foundDoctor = new Doctor(doctor.profile.first_name, doctor.profile.last_name, doctor)
  //   })
  // }
}

