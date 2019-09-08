import { Option } from '../models/questions';
export enum Types {
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  TEXTAREA = 'TEXTAREA',
  DROPDOWN = 'DROPDOWN',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX'
}
export interface ISuperFormItem {
  id: any;
  type: Types;
  name: any;
  children: ISuperFormItem[];
  helptext: string;
  placeholder: string;
  options: Option[];
}
export class SuperFormItem implements ISuperFormItem {
  placeholder = '';
  type: Types = Types.STRING;
  children: ISuperFormItem[] = [];
  name: any = '';
  id: any = '';
  _helptext: string;
  options: Option[] = [];
  constructor(formItem: Partial<ISuperFormItem> = {}) {
    Object.assign(this, formItem);
  }
  set helptext(value: string) {
    this._helptext = value
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(item => `<p class="my-1">${item}</p>`)
      .join('\n');
  }
  get helptext() {
    return this._helptext;
  }
}
