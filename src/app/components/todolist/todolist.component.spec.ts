import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TODOListComponent } from './todolist.component';

describe('TODOListComponent', () => {
  let component: TODOListComponent;
  let fixture: ComponentFixture<TODOListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TODOListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TODOListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
