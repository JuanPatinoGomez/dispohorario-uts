import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEdificioComponent } from './form-edificio.component';

describe('FormEdificioComponent', () => {
  let component: FormEdificioComponent;
  let fixture: ComponentFixture<FormEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEdificioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
