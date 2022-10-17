import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloqrComponent } from './moduloqr.component';

describe('ModuloqrComponent', () => {
  let component: ModuloqrComponent;
  let fixture: ComponentFixture<ModuloqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
