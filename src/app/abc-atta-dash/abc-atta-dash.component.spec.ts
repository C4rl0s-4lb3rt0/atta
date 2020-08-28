import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcAttaDashComponent } from './abc-atta-dash.component';

describe('AbcAttaDashComponent', () => {
  let component: AbcAttaDashComponent;
  let fixture: ComponentFixture<AbcAttaDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcAttaDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcAttaDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
