import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QuestionBase } from '../models/questions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuestionControlService } from '../services/question-control.service';

@Component({
  selector: 'app-super-form',
  templateUrl: './super-form.component.html',
  styleUrls: ['./super-form.component.css']
})
export class SuperFormComponent implements OnChanges {
  @Input() questions: QuestionBase<any>[] = [];
  @Output() submit: EventEmitter<string> = new EventEmitter();
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService, private fb: FormBuilder) {}

  ngOnChanges() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.submit.emit(this.payLoad);
  }


}
