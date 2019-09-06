import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintBuilderComponent } from './blueprint-builder.component';

describe('BlueprintBuilderComponent', () => {
  let component: BlueprintBuilderComponent;
  let fixture: ComponentFixture<BlueprintBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
