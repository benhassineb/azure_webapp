import { inject, NewInstance } from 'aurelia-dependency-injection';
import { ValidationController, validateTrigger } from 'aurelia-validation';
import { Car, Vehicle, Person } from "./vehicle";
import { computedFrom } from 'aurelia-framework';


@inject(NewInstance.of(ValidationController))
export class VehicleVm {
  constructor(controller) {
    this.controller = controller;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;

    this.car = new Car();
    this.vehicle = new Vehicle();
    this.person = new Person();
  }

  valider() {
    console.log(this.controller.errors);
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          // validation succeeded
          console.log('validation succeeded');
        } else {
          // validation failed
          console.log('validation failed');
        }
      });
  }

}




