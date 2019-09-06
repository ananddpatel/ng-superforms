export interface Option {key: string; value: string; }

export interface BaseQuestionOptions<T> {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: string;
}

export interface DropdownQuestionOptions<T> extends BaseQuestionOptions<T> {
  options: Option[];
}
export interface TextboxQuestionOptions<T> extends BaseQuestionOptions<T> {
  type: string;
}

export class QuestionBase<T> implements BaseQuestionOptions<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: BaseQuestionOptions<T>  = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: TextboxQuestionOptions<string> = {type: ''}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: Option[] = [];

  constructor(options: DropdownQuestionOptions<string> = {options: []}) {
    super(options);
    this.options = options['options'] || [];
  }
}
