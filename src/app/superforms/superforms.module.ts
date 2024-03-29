import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlueprintBuilderComponent } from './blueprint-builder/blueprint-builder.component';
import { QuestionControlService } from './services/question-control.service';
import { SuperFormComponent } from './super-form/super-form.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './services/question.service';
import { NgxSelectModule } from 'ngx-select-ex';
// import { DndModule } from '@beyerleinf/ngx-dnd';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule, NgxSelectModule, NgxDnDModule],
  declarations: [BlueprintBuilderComponent, SuperFormComponent, QuestionComponent],
  exports: [BlueprintBuilderComponent, SuperFormComponent, QuestionComponent],
  providers: [QuestionControlService, QuestionService]
})
export class SuperformsModule {}
