//generated class : Adress
import { ValidationRules } from 'aurelia-validation';
export const AdressValidationRules = () => ValidationRules
  .ensure('state').required()
	.ensure('city').required()
	.ensure('zip').required();

export class Adress {
  state;
	city;
	zip;

  constructor(state, city, zip) {
    this.state = state;
		this.city = city;
		this.zip = zip;

  }
}
AdressValidationRules().on(Adress);
    