import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEdificiosComponent } from './view-edificios.component';

describe('ViewEdificiosComponent', () => {
  let component: ViewEdificiosComponent;
  let fixture: ComponentFixture<ViewEdificiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEdificiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEdificiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
