import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionControlService } from '../services/question-control.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SupportedTypes, ISuperFormItem, SuperFormItem } from './formModels';

@Component({
  selector: 'app-blueprint-builder',
  templateUrl: './blueprint-builder.component.html',
  styleUrls: ['./blueprint-builder.component.css']
})
export class BlueprintBuilderComponent implements OnInit {
  @ViewChild('content') content;
  formTypes = SupportedTypes;
  builderDnDModel = [];
  // schema: ISuperFormItem = new SuperFormItem({
  //   name: 'My Demo Form',
  //   id: 'demoForm',
  //   type: SupportedTypes.PARENT,
  //   children: [
  //     new SuperFormItem({
  //       id: 'email',
  //       name: 'Email',
  //       // tslint:disable-next-line:max-line-length
  //       helptext: `In 1966, Frank Morneau founded W. F. Morneau & Associates, an actuarial and benefit consulting firm.[6] The firm expanded to open its first U.S. office in 1987 and it launched its administrative outsourcing practice in 1996.[7]

  //       W.F. Morneau & Associates merged with Sobeco in 1997 to establish Morneau Sobeco, led by Bill Morneau as president and chief executive officer.[8] Morneau Shepell, as it is known today, was formed in May 2008 through Morneau Sobeco's acquisition of Shepell-fgi – Canada's largest provider of employee health management and workplace training and education services – from Clairvest Group Inc. for $321.9 million.[9]

  //       In the years since, Morneau Shepell has made a number of acquisitions, including SBC Systems Company Inc. (U.S. provider of employee benefits administration systems) in January 2012,[10] Mercer Canada's pension and benefits outsourcing business in November 2012,[11] Ceridian's U.S. health and welfare benefits administration business in August 2015,[12] Montreal-based Solareh (national health and wellness services provider that offers employee assistance programs) in December 2016[13] and Montreal-based Longpré (employee assistance and wellness program provider) in January 2017.[14]`
  //     }),
  //     new SuperFormItem({
  //       id: 'name',
  //       name: 'Name',
  //       type: SupportedTypes.CHILD,
  //       children: [
  //         new SuperFormItem({
  //           name: 'First Name',
  //           id: 'first'
  //         }),
  //         new SuperFormItem({
  //           id: 'last',
  //           name: 'Last Name'
  //         }),
  //         new SuperFormItem({
  //           id: 'sometOtherItems',
  //           name: 'Some Other Items',
  //           type: SupportedTypes.CHILD,
  //           children: [
  //             new SuperFormItem({
  //               id: 'gender1',
  //               name: 'Gender',
  //               type: SupportedTypes.RADIO,
  //               options: [{ id: 'male', text: 'Male' }, { id: 'female', text: 'Female' }]
  //             }),
  //             new SuperFormItem({
  //               id: 'language1',
  //               name: 'Spoken Languages',
  //               type: SupportedTypes.CHECKBOX,
  //               options: [{ id: 'en', text: 'English' }, { id: 'fr', text: 'French' }, { id: 'other', text: 'Other' }]
  //             }),
  //             new SuperFormItem({
  //               id: 'aboutMe123',
  //               name: 'About Me',
  //               type: SupportedTypes.TEXTAREA,
  //               placeholder: 'Tell us about your self',
  //               helptext: 'Tell us about your self'
  //             }),
  //             new SuperFormItem({
  //               id: 'priority12312',
  //               name: 'Priority',
  //               type: SupportedTypes.DROPDOWN,
  //               options: [{ id: '4', text: 'Urgent' }, { id: '3', text: 'High' }, { id: '2', text: 'Medium' }, { id: '1', text: 'Low' }]
  //             })
  //           ]
  //         })
  //       ]
  //     }),
  //     new SuperFormItem({
  //       id: 'gender',
  //       name: 'Gender',
  //       type: SupportedTypes.RADIO,
  //       options: [{ id: 'male', text: 'Male' }, { id: 'female', text: 'Female' }]
  //     }),
  //     new SuperFormItem({
  //       id: 'language',
  //       name: 'Spoken Languages',
  //       type: SupportedTypes.CHECKBOX,
  //       options: [{ id: 'en', text: 'English' }, { id: 'fr', text: 'French' }, { id: 'other', text: 'Other' }]
  //     }),
  //     new SuperFormItem({
  //       id: 'aboutMe',
  //       name: 'About Me',
  //       type: SupportedTypes.TEXTAREA,
  //       placeholder: 'Tell us about your self',
  //       helptext: 'Tell us about your self'
  //     }),
  //     new SuperFormItem({
  //       id: 'priority',
  //       name: 'Priority',
  //       type: SupportedTypes.DROPDOWN,
  //       options: [{ id: '4', text: 'Urgent' }, { id: '3', text: 'High' }, { id: '2', text: 'Medium' }, { id: '1', text: 'Low' }]
  //     })
  //   ]
  // });

  schema: ISuperFormItem = new SuperFormItem({
    name: 'Demo DND Form',
    id: 'demoForm',
    type: SupportedTypes.PARENT
  });
  jsonSchemaHidden = true;
  myForm: FormGroup;

  // supportedFormTypeItems = Object.keys(SupportedTypes).map(
  //   formType => new SuperFormItem({ id: formType + this.randInt, name: formType + this.randInt, type: formType as any })
  // );
  supportedFormTypeItems = [
    new SuperFormItem({ id: SupportedTypes.CHILD, name: 'Child', type: SupportedTypes.CHILD }),
    new SuperFormItem({ id: SupportedTypes.STRING, name: 'String', type: SupportedTypes.STRING }),
    new SuperFormItem({ id: SupportedTypes.TEXTAREA, name: 'Textarea', type: SupportedTypes.TEXTAREA }),
    new SuperFormItem({ id: SupportedTypes.DROPDOWN, name: 'Dropdown', type: SupportedTypes.DROPDOWN }),
    new SuperFormItem({ id: SupportedTypes.RADIO, name: 'Radio', type: SupportedTypes.RADIO }),
    new SuperFormItem({ id: SupportedTypes.CHECKBOX, name: 'Checkbox', type: SupportedTypes.CHECKBOX })
  ];

  constructor(private modalService: NgbModal, private qcs: QuestionControlService, private fb: FormBuilder) {}

  ngOnInit() {
    this.generateForm();
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

  get randInt() {
    return Math.floor(Math.random() * 10);
  }
  toggleJson() {
    this.jsonSchemaHidden = !this.jsonSchemaHidden;
  }

  onDrop(event) {
    console.log(event);
    const name = event.value + this.randInt;
    this.schema.children.push(new SuperFormItem({ id: name, name: name, type: SupportedTypes[event.value] as SupportedTypes }));
    // this.schema.children = this.schema.children.filter(item => item instanceof SuperFormItem);
    console.log(this.schema);
  }

  log(e: any) {
    console.log(e.type, e);
  }

  generateForm() {
    this.myForm = this.qcs.generateFormGroup(this.schema);
    console.log(this.myForm.value);

    this.myForm.valueChanges.pipe(debounceTime(500)).subscribe(console.log);
  }
}
