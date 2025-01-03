import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDuenioColegioComponent } from './datos-duenio-colegio.component';

describe('DatosDuenioColegioComponent', () => {
  let component: DatosDuenioColegioComponent;
  let fixture: ComponentFixture<DatosDuenioColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosDuenioColegioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDuenioColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
