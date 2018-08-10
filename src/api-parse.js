import { Doctor } from './doctor.js';

export class ApiParse {
  
  getConditions(response) {
    let body = JSON.parse(response);
    console.log(body.data.profile);
    let allConditions = [];
    body.data.forEach(function(condition) {
      allConditions.push(condition.name);
    });
    return allConditions;
  }

  getDoctors(response) {
    let body = JSON.parse(response);
    let allDoctors = [];
    //constructor(doctorId, firstName, lastName, bio, specialties, practiceName, address, phoneNumber, newPatients)
    body.data.forEach(function(doctor) {
      let foundDoctor = new Doctor(doctor.uid, doctor.profile.first_name, doctor.profile.last_name, doctor.profile.bio, doctor.specialties.name, doctor.practices.name, doctor.practices.visit_address, doctor.practices.phones, doctor.practices.accepts_new_patients);
      allDoctors.push(foundDoctor);
    });
    return allDoctors;
  }
}
