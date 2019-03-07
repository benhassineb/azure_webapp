import { ValidationRules } from 'aurelia-validation';
import { Adress } from './adress';

const VehicleValidationRules = () => ValidationRules
  .ensure('name').required()
  .ensure('type').required();

const CarValidationRules = () => VehicleValidationRules()
  .ensure('vin').required();


const PersonValidationRules = () => ValidationRules
  .ensure('firstName').required()
  .ensure('firstName').minLength(3)
  .ensure('firstName').maxLength(10)
  .ensure('lastName').required()
  .ensure('userName').required()
  .ensure('adress').required()
  .ensure('car').required();


// const AdressValidationRules = () => ValidationRules
//   .ensure('state').required()
//   .ensure('city').required()
//   .ensure('zip').required();


export class Vehicle {
  name;
  type;
  constructor(name, type) {
    this.name;
    this.type;
  }

}
export class Car extends Vehicle {
  vin;
  constructor(name, vin) {
    super(name, 'Car');
    this.vin = vin;
  }

}

// export class Adress {
//   state;
//   city;
//   zip;
//   constructor(city, state, zip) {
//     this.city = city;
//     this.state = state;
//     this.zip = zip;
//   }
// }
export class Person {
  firstName;
  lastName;
  userName;
  car;
  adress;
  constructor(firstName, lastName, userName, adress, car) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.adress = adress ? adress : new Adress();
    this.car = car ? car : new Car();
  }

}


VehicleValidationRules().on(Vehicle)
CarValidationRules().on(Car)
PersonValidationRules().on(Person)
// AdressValidationRules().on(Adress)