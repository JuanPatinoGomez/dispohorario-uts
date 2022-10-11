import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalonesComponent } from './view-salones.component';

describe('ViewSalonesComponent', () => {
  let component: ViewSalonesComponent;
  let fixture: ComponentFixture<ViewSalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
