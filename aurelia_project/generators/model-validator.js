import { inject } from 'aurelia-dependency-injection';
import { _ } from 'lodash';
import { Project, ProjectItem, CLIOptions, UI } from 'aurelia-cli';
import models from './models.json';
let path = require('path');

@inject(Project, CLIOptions, UI)
export default class ModelValidatorGenerator {
  constructor(project, options, ui) {
    this.project = project;
    this.options = options;
    this.ui = ui;
    this.modelsDefinition = models;
  }

  execute() {
    let self = this;

    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the model?')
      .then(name => {
        return self.ui.ensureAnswer(this.options.args[1],
          'What sub-folder would you like to add it to?\nIf it doesn\'t exist it will be created for you.\n\nDefault folder is the source folder (src).', '.')
          .then(subFolders => {
            this.modelsDefinition.forEach(item => {
              let fileName = this.project.makeFileName(item.className);
              self.project.root.add(
                ProjectItem.text(path.join(subFolders, fileName + '.js'), this.generateJSSource(item)),
                ProjectItem.text(path.join(subFolders, fileName + '.cs'), this.generateCSSource(item))
              );
            });

            return this.project.commitChanges()
              .then(() => this.ui.log(`Created ${name} in the '${path.join(self.project.root.name, subFolders)}' folder`));
          });
      });
  }

  getPropertiesNames = (props, sep = ';\n  ') => {
    return props.map(prop => _.camelCase(prop.name)).join(sep);
  }

  getPropertiesNamesTor = (props, sep = ';\n    ') => {
    return props.map(prop => 'this.' + _.camelCase(prop.name) + ' = ' + _.camelCase(prop.name)).join(sep);
  }

  getValidationRulesJs = (props) => {
    return props.map(prop => this.getPropertyRulesJs(prop).join('\n    ')).join('\n    ');
  }

  getPropertyRulesJs = (prop) => {
    let result = [];
    let ensure = `.ensure('${_.camelCase(prop.name)}').displayName('${prop.displayName}')`;
    Object.entries(prop).forEach(([key, value]) => {
      switch (key) {
        case 'required':
          ensure = value ? ensure + '.required()' : ensure;
          break;
        case 'minLength':
          ensure = ensure + `.minLength(${value})`;
          break;
        case 'maxLength':
          ensure = ensure + `.maxLength(${value})`;
          break;
        case 'min':
          ensure = ensure + `.min(${value})`;
          break;
        case 'max':
          ensure = ensure + `.max(${value})`;
          break;
        case 'format':
          ensure = ensure + `.satisfiesRule(${value})`;
          break;
        case 'name':
        case 'displayName':
          break;
        default:
          console.log('Sorry, we are out of ' + key + '.');
      }
    });
    result.push(ensure);

    return result;
  }


  getValidationRulesCs = (props) => {
    return props.map(prop => this.getPropertyRulesCs(prop).join('\n            ')).join(';\n            ');
  }

  getPropertyRulesCs = (prop) => {
    let result = [];
    let ensure = `RuleFor(x => x.${prop.name})`;
    Object.entries(prop).forEach(([key, value]) => {
      switch (key) {
        case 'required':
          ensure = value ? ensure + '.NotEmpty()' : ensure;
          break;
        case 'minLength':
          ensure = ensure + `.MinimumLength(${value})`;
          break;
        case 'maxLength':
          ensure = ensure + `.MaximumLength(${value})`;
          break;
        case 'min':
          ensure = ensure + `.GreaterThan(${value})`;
          break;
        case 'max':
          ensure = ensure + `.LessThan(${value})`;
          break;
         case 'format':
        //   ensure = ensure + `.Must(${value})`;
        //   break;
        case 'name':
        case 'displayName':
          break;
        default:
          console.log('Sorry, we are out of ' + key + '.');
      }
    });
    ensure= ensure + `.WithName("${prop.displayName}")`;
    result.push(ensure);

    return result;
  }

  generateJSSource(data) {
    return `/* --------------------------------------
 * AUTO-GENERATED FILE.  DO NOT MODIFY.
 * --------------------------------------
 * This class was automatically generated by the
 * aapt tool from the resource data it found.  It
 * should not be modified by hand.
 */
import { ValidationRules } from 'aurelia-validation';
export class ${data.className}Generated {
  ${this.getPropertiesNames(data.properties)};

  constructor(${this.getPropertiesNames(data.properties, ', ')}) {
    ${this.getPropertiesNamesTor(data.properties)};
  }

  static fromObject(srcObj) {
		return Object.assign(new ${data.className}Generated(), ...srcObj);
	}
}
export const ${_.camelCase(data.className)}GeneratedValidationRules = () =>
  ValidationRules
    ${this.getValidationRulesJs(data.properties)};

${_.camelCase(data.className)}ValidationRules().on(${data.className}Generated);
`;
  }

  generateCSSource(data) {
    return `using FluentValidation;

    namespace FValidation
    {
        public class ${data.className}Validator : AbstractValidator<${data.className}>
        {
            public ${data.className}Validator()
            {
              ${this.getValidationRulesCs(data.properties)};
            }
    
        }
    }    
`;
  }
}
