import { Component } from '@angular/core';
import { QuestionControlService } from './superforms/services/question-control.service';
import { TextboxQuestion } from './superforms/models/questions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'superforms';
  questions;
  constructor(private questionService: QuestionControlService) {
    this.questions = this.questionService.getQuestions();
  }

  addAnotherTextInput(name: string) {
    // const newInputControl = this.fb.control('');
    // this.questions = this.questionService.toFormGroup([...this.questions, new TextboxQuestion()]);
    this.questions = [...this.questions, new TextboxQuestion({key: 'helloWorld', type: '', label: 'hello world'})];
    // this.form.addControl(name, newInputControl);
  }

  onSubmit(formPayload: string) {
    console.log(formPayload);
  }
}
