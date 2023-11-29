import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotedataComponent } from './notedata.component';

describe('NotedataComponent', () => {
  let component: NotedataComponent;
  let fixture: ComponentFixture<NotedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotedataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
