import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapHomeComponent } from './wrap-home.component';

describe('WrapHomeComponent', () => {
  let component: WrapHomeComponent;
  let fixture: ComponentFixture<WrapHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
