export class Doctor {
  constructor(doctorId, firstName, lastName, bio, image, specialties = "", practiceName, website = "", address, phoneNumber, newPatients) {
    this.doctorId = doctorId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = bio;
    this.image = image;
    this.specialties = specialties;
    this.practiceName = practiceName;
    this.website = website;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.newPatients = newPatients;
  }
}