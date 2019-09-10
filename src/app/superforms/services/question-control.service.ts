import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuestionBase, DropdownQuestion, TextboxQuestion } from '../models/questions';
import { SupportedTypes } from '../blueprint-builder/formModels';

@Injectable()
export class QuestionControlService {
  constructor(private fb: FormBuilder) {}

  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });

    return new FormGroup(group);
  }

  getQuestions() {
    const questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { id: 'solid', text: 'Solid' },
          { id: 'great', text: 'Great' },
          { id: 'good', text: 'Good' },
          { id: 'unproven', text: 'Unproven' }
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
        type: ''
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  generateFormGroup(schema) {
    let result = {};
    // let result = {[schema.id]: {}};
    schema.children.forEach(item => {
      if (item.children.length > 0) {
        result[item.id] = this.generateFormGroup(item);
        // result = { ...result, [item.id]: this.fb.group(this.generateFormGroup(item)) };
      } else if (item.type === SupportedTypes.CHECKBOX) {
        // result = { ...result, [item.id]: this.fb.array(item.options.map(_ => [false])) };
        result[item.id] = this.fb.array(item.options.map(_ => [false]));
      } else {
        // result = { ...result, [item.id]: [''] };
        result[item.id] = [''];
      }
    });
    console.log(result);

    return this.fb.group(result);
  }
}
