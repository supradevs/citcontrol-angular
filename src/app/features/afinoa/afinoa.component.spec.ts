import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfinoaComponent } from './afinoa.component';

describe('AfinoaComponent', () => {
  let component: AfinoaComponent;
  let fixture: ComponentFixture<AfinoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfinoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfinoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
