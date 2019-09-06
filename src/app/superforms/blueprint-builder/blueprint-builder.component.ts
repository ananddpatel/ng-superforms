import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionControlService } from '../services/question-control.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface ISuperFormItem {
  children: ISuperFormItem[];
  name: any;
  id: any;
}

export class SuperFormItem implements ISuperFormItem {
  children: ISuperFormItem[] = [];
  name: any = '';
  id: any = '';

  constructor(formItem: Partial<ISuperFormItem> = {}) {
    Object.assign(this, formItem);
  }
}

@Component({
  selector: 'app-blueprint-builder',
  templateUrl: './blueprint-builder.component.html',
  styleUrls: ['./blueprint-builder.component.css']
})
export class BlueprintBuilderComponent {
  @ViewChild('content') content;
  // schema: ISuperFormItem = new SuperFormItem({name: 'demoForm', id: 'demoForm'});
  schema: ISuperFormItem = {
    children: [
      {
        children: [
          {
            children: [],
            name: '',
            id: 'first'
          },
          {
            children: [],
            name: '',
            id: 'last'
          }
        ],
        name: '',
        id: 'name'
      },
      {
        children: [],
        name: '',
        id: 'email'
      }
    ],
    name: 'demoForm',
    id: 'demoForm'
  };
  jsonSchemaHidden = true;
  myForm: FormGroup;

  constructor(private modalService: NgbModal, private qcs: QuestionControlService, private fb: FormBuilder) {}

  open() {
    const modalRef = this.modalService.open(this.content);
    // modalRef.componentInstance.name = 'World';
  }

  addToSchema(i) {
    if (i !== undefined) {
      this.schema.children[i].children.push(new SuperFormItem());
    } else {
      this.schema.children.push(new SuperFormItem({id: Math.floor(Math.random() * 10)}));
    }
  }

  generateForm() {
    this.myForm = null;
    this.myForm = this.fb.group(this.qcs.generateFormGroup(this.schema));
  }

  toggleJson() {
    this.jsonSchemaHidden = !this.jsonSchemaHidden;
  }
}
