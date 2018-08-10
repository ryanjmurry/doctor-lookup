export class Doctor {
  constructor(doctorId, firstName, lastName, bio, specialties, practiceName, address, phoneNumber, newPatients) {
    this.doctorId = doctorId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = bio;
    this.specialties = specialties;
    this.practiceName = practiceName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.newPatients = newPatients;
  }
}