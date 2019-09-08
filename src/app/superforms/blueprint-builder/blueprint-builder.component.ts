import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionControlService } from '../services/question-control.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

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
}

export class SuperFormItem implements ISuperFormItem {
  placeholder = '';
  type: Types = Types.STRING;
  children: ISuperFormItem[] = [];
  name: any = '';
  id: any = '';
  _helptext: string;

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

@Component({
  selector: 'app-blueprint-builder',
  templateUrl: './blueprint-builder.component.html',
  styleUrls: ['./blueprint-builder.component.css']
})
export class BlueprintBuilderComponent implements OnInit {
  @ViewChild('content') content;
  formTypes = Types;
  schema: ISuperFormItem = new SuperFormItem({
    name: 'My Demo Form',
    id: 'demoForm',
    type: Types.PARENT,
    children: [
      new SuperFormItem({
        id: 'email',
        name: 'Email',
        // tslint:disable-next-line:max-line-length
        helptext: `In 1966, Frank Morneau founded W. F. Morneau & Associates, an actuarial and benefit consulting firm.[6] The firm expanded to open its first U.S. office in 1987 and it launched its administrative outsourcing practice in 1996.[7]

        W.F. Morneau & Associates merged with Sobeco in 1997 to establish Morneau Sobeco, led by Bill Morneau as president and chief executive officer.[8] Morneau Shepell, as it is known today, was formed in May 2008 through Morneau Sobeco's acquisition of Shepell-fgi – Canada's largest provider of employee health management and workplace training and education services – from Clairvest Group Inc. for $321.9 million.[9]

        In the years since, Morneau Shepell has made a number of acquisitions, including SBC Systems Company Inc. (U.S. provider of employee benefits administration systems) in January 2012,[10] Mercer Canada's pension and benefits outsourcing business in November 2012,[11] Ceridian's U.S. health and welfare benefits administration business in August 2015,[12] Montreal-based Solareh (national health and wellness services provider that offers employee assistance programs) in December 2016[13] and Montreal-based Longpré (employee assistance and wellness program provider) in January 2017.[14]`
      }),
      new SuperFormItem({
        id: 'name',
        name: 'Name',
        type: Types.CHILD,
        children: [
          new SuperFormItem({
            name: 'First Name',
            id: 'first'
          }),
          new SuperFormItem({
            id: 'last',
            name: 'Last Name'
          })
        ]
      })
    ]
  });
  jsonSchemaHidden = true;
  myForm: FormGroup;

  constructor(private modalService: NgbModal, private qcs: QuestionControlService, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group(this.qcs.generateFormGroup(this.schema));
    this.myForm.valueChanges.pipe(debounceTime(500)).subscribe(console.log);
  }

  open() {
    const modalRef = this.modalService.open(this.content);
    // modalRef.componentInstance.name = 'World';
  }

  addToSchema(i) {
    if (i !== undefined) {
      this.schema.children[i].children.push(new SuperFormItem());
    } else {
      this.schema.children.push(new SuperFormItem({ id: Math.floor(Math.random() * 10) }));
    }
  }

  generateForm() {
    // this.myForm = null;
  }

  toggleJson() {
    this.jsonSchemaHidden = !this.jsonSchemaHidden;
  }
}
