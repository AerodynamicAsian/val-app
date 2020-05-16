import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamOptionsComponent } from './create-team-options.component';

describe('CreateTeamOptionsComponent', () => {
  let component: CreateTeamOptionsComponent;
  let fixture: ComponentFixture<CreateTeamOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
