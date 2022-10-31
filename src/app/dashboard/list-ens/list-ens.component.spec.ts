import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnsComponent } from './list-ens.component';

describe('ListEnsComponent', () => {
  let component: ListEnsComponent;
  let fixture: ComponentFixture<ListEnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
