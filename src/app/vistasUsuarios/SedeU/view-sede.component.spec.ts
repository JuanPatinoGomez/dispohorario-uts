import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSedeComponent } from './view-sede.component';

describe('ViewSedeComponent', () => {
  let component: ViewSedeComponent;
  let fixture: ComponentFixture<ViewSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
