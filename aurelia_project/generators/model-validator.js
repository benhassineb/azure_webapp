import { inject } from 'aurelia-dependency-injection';
import { Project, ProjectItem, CLIOptions, UI } from 'aurelia-cli';

@inject(Project, CLIOptions, UI)
export default class ModelValidatorGenerator {
  constructor(project, options, ui) {
    this.project = project;
    this.options = options;
    this.ui = ui;
  }

  execute() {
    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the model?')
      .then(name => {
        let fileName = this.project.makeFileName(name);
        let className = this.project.makeClassName(name);

        this.project.root.add(
          ProjectItem.text(`${fileName}.js`, this.generateSource(className))
        );

        return this.project.commitChanges()
          .then(() => this.ui.log(`Created ${fileName}.`));
      });
  }

  getPropeties(cls, sep = ';\n\t') {
    return cls.properties.map(item => item.name).join(sep);
  }
  getPropetiesTor(cls, sep = ';\n\t\t') {
    return cls.properties.map(item => 'this.' + item.name + ' ' + '=' + ' ' + item.name).join(sep);
  }

  getPropetiesRules(cls,sep) {
    return cls.properties.map(item => item.rules.map(
      r => `.ensure('${item.name}').${r.name}()`
    )).join(sep);

  }
  generateSource() {
 
    let json = [{
      className: 'Adress',
      properties: [
        {
          name: 'state',
          rules: [
            { name: 'required' }
          ]
        },
        {
          name: 'city',
          rules: [
            { name: 'required' }
          ]
        },
        {
          name: 'zip',
          rules: [
            { name: 'required' }
          ]
        }
      ]
    }];




    let param = json[0];

    return `//generated class : ${param.className}
import { ValidationRules } from 'aurelia-validation';
export const ${param.className}ValidationRules = () => ValidationRules
  ${this.getPropetiesRules(param, '\n\t')};\n
export class ${param.className} {
  ${this.getPropeties(param)};\n
  constructor(${this.getPropeties(param, ', ')}) {
    ${this.getPropetiesTor(param, ';\n\t\t')};\n
  }
}
${param.className}ValidationRules().on(${param.className});
    `;
  }
}
