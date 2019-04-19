import { inject, NewInstance } from 'aurelia-dependency-injection';
import { ValidationController, validateTrigger } from 'aurelia-validation';
import { Person } from "./vehicle";
import { Service } from './service';






@inject(NewInstance.of(ValidationController), Service)
export class VehicleVm {
  constructor(controller, service) {
    this.controller = controller;
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    // this.car = new Car();
    // this.vehicle = new Vehicle();
    this.person = new Person();
    this.label = (item) => item && item.label;
    this.resource = (str) => service.getAdresse(str);
    this.acresult;
  }

  valider() {
    console.log(this.acresult);
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




