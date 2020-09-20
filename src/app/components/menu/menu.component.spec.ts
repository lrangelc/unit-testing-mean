import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuComponent } from './menu.component';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MenuComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(component).toBeTruthy();

    expect(title.nativeElement.innerHTML).toBe('eLearning Management System');
  });

  it('Testing output', () => {
    const val = true;

    component.clicked.subscribe((result) => {
      expect(result).toBe(val);
    });

    component.clicked.next(val);
  });

  it('Testing click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    console.log(`component.counter: ${component.counter}`);

    expect(component.counter).toBe(0);
    button.triggerEventHandler('click', null);
    expect(component.counter).toBe(1);
    console.log(`component.counter: ${component.counter}`);
  });
});
