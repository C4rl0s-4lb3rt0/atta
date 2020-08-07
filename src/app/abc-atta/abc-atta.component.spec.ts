import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcAttaComponent } from './abc-atta.component';

describe('AbcAttaComponent', () => {
  let component: AbcAttaComponent;
  let fixture: ComponentFixture<AbcAttaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcAttaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcAttaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
