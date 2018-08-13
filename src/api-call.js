export class ApiCall {
  conditionsPromise() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/conditions?user_key=${process.env.exports.apiKey}`;
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusTest));
        }
      };
      request.open("GET", url, true);
      request.send();   
    });
  }
  
  drByConditionPromise(condition, city) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${condition}&location=${city}&sort=last-name-asc&fields=practices%2Cprofile%2Cspecialties%2Cuid&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusTest));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  drByLastNamePromimse(lastName, city)  {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?last_name=${lastName}&location=${city}&sort=last-name-asc&fields=practices%2Cprofile%2Cspecialties%2Cuid&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusTest));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}