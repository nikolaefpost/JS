window.onload = function () {


  function outInfo(formSelector, out_block) {
    let str='';
    console.log(formSelector.elements);
    for (var i = 0; i < formSelector.elements.length; i++) {
      if (formSelector.elements[i].value) str+=`${formSelector.elements[i].name} = ${formSelector.elements[i].value} <br>`;
    }
    out_block.innerHTML=str;
  }


  class Rule {
    constructor(input_name) {
      this._name = input_name;
      this.errorText;
      this.element = document.forms[0].elements[this._name];
    }
    isValid(){}
  }

  class RuleName extends Rule {
    isValid(){
      if (/^[а-яa-zА-ЯA-Z]{5,15}$/.test(this.element.value)) return true;
      else {
        this.errorText = (this.element.value.length<5) ? 'name cannot be less than 5 letters!' :'the name cannot be more than 15 letters!';
        return false;
      }
    }
  }

  class RuleYear extends Rule {
    isValid(){
      if (+this.element.value>1900 && +this.element.value<2021) return true;
      else {
        this.errorText =  'enter correct age!';
        return false;
      }
    }
  }

  class RuleHeight extends Rule {
    isValid(){
      if (+this.element.value>0 && +this.element.value<2.6) return true;
      else {
        this.errorText =  'enter the correct height in meters!';
        return false;
      }
    }
  }

  class RuleWeight extends Rule {
    isValid(){
      if (+this.element.value>0 && +this.element.value<300) return true;
      else {
        this.errorText =  'enter the correct weight in kilograms!';
        return false;
      }
    }
  }

  class Logger {
    constructor(rule_obj) {
      this.rule = rule_obj;
    }
    log(){}
  }

  class ConsoleLogger extends Logger {
    log(){
    if (!this.rule.isValid())  console.log(this.rule.errorText);
    }
  }

  class AlertLogger extends Logger {
    log(){
    if (!this.rule.isValid())  alert(this.rule.errorText);
    }
  }

  class DomLogger extends Logger {
    constructor(rule_obj, id_out){
      super(rule_obj);
      this.id_out = id_out;
    }
    log(){
    if (!this.rule.isValid()) { this.id_out.innerHTML = this.rule.errorText; return false;}
    else return true;
    }
  }

  class Validator {
    constructor(logger, arrRules, form) {
      this.logger = logger;
      this.arrRules = arrRules;
      this.form = form;
    }
    validate(out_block){


      for (var i = 0; i < this.form.elements.length; i++) {
        let name_input = this.form.elements[i].name
        if (name_input=='_name'){
          let rule = new this.arrRules[0]('_name');
          if (!rule.isValid()) { new this.logger(rule, out_block).log(); return false;}
        }
        if (name_input=='year'){
          let rule = new this.arrRules[1]('year');
          if (!rule.isValid()) { new this.logger(rule, out_block).log(); return false;}
        }
        if (name_input=='height'){
          let rule = new this.arrRules[2]('height');
          if (!rule.isValid()) { new this.logger(rule, out_block).log(); return false;}
        }
        if (name_input=='weight'){
          let rule = new this.arrRules[3]('weight');
          if (!rule.isValid()) { new this.logger(rule, out_block).log(); return false;}
        }
      }
      return true;
    }
  }

  class Processor  {
    constructor(validator, success) {
      this.validator = validator;
      this.success = success;
    }

    attach(formSelector, out_block){
      let validator = this.validator;
      console.log(validator);
      formSelector.onsubmit = function(){
        event.preventDefault();
        if (validator.validate(out_block)) outInfo(formSelector, out_block);
       };
    }
  }

  let domValidator = new Validator (DomLogger, [RuleName, RuleYear, RuleHeight, RuleWeight], form)
  let processor = new Processor(domValidator, 0).attach(form, out);

}
