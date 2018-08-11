import { Doctor } from './doctor.js';

export class ApiParse {
  
  getConditions(response) {
    let body = JSON.parse(response);
    let allConditions = [];
    body.data.forEach(function(condition) {
      allConditions.push(condition.name);
    });
    return allConditions.sort();
  }

  getDoctors(response) {
    let body = JSON.parse(response);
    let allDoctors = [];
    //  constructor(doctorId, firstName, lastName, bio, specialties, practiceName, website, address, phoneNumber, newPatients) {
    body.data.forEach(function(doctor) {
      let foundDoctor = new Doctor(doctor.uid, doctor.profile.first_name, doctor.profile.last_name, doctor.profile.bio, doctor.specialties, doctor.practices[0].name, doctor.practices[0].website, doctor.practices[0].visit_address, doctor.practices[0].phones, doctor.practices[0].accepts_new_patients);
      allDoctors.push(foundDoctor);
    });
    return allDoctors;
  }
}
