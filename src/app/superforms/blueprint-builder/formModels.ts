import { Option } from '../models/questions';
export enum SupportedTypes {
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  STRING = 'STRING',
  // NUMBER = 'NUMBER',
  TEXTAREA = 'TEXTAREA',
  DROPDOWN = 'DROPDOWN',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX'
}
export interface ISuperFormItem {
  id: any;
  type: SupportedTypes;
  name: any;
  children: ISuperFormItem[];
  helptext: string;
  placeholder: string;
  options: Option[];

  // addChild(child: ISuperFormItem): void;
}
export class SuperFormItem implements ISuperFormItem {
  placeholder = '';
  type: SupportedTypes = SupportedTypes.STRING;
  children: ISuperFormItem[];
  name: any = '';
  id: any = '';
  _helptext: string;
  options: Option[] = [];
  constructor(formItem: Partial<ISuperFormItem> = {}) {
    Object.assign(this, formItem);
    if (!formItem.children && (this.type === SupportedTypes.PARENT || this.type === SupportedTypes.CHILD)) {
      this.children = [];
    }
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

  // addChild(child: ISuperFormItem) {
  //   if (this.children) {
  //     this.children.push(child);
  //   } else {
  //     this.children = [child];
  //   }
  // }
}
