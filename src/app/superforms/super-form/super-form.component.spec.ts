import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperFormComponent } from './super-form.component';

describe('SuperFormComponent', () => {
  let component: SuperFormComponent;
  let fixture: ComponentFixture<SuperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
