// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ActionsComponent } from './actions.component';

// describe('ActionsComponent', () => {
//   let component: ActionsComponent;
//   let fixture: ComponentFixture<ActionsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ActionsComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ActionsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PinsService } from '../pins/pins.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export class MatBottomSheetRefSTUB {
  dismiss() {}
}

export class PinsServiceSTUB {
  resolveActionObserver(action) {}
}

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetRefSTUB },
        { provide: PinsService, useClass: PinsServiceSTUB },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preventDefault should be called', () => {
    const mouseEvent = new MouseEvent('click');
    const mouseEventSpy = spyOn(
      mouseEvent,
      'preventDefault'
    ).and.callFake(() => {});
    component.openLink(mouseEvent, 'send');
    expect(mouseEventSpy).toHaveBeenCalled();
  });

  it('dismiss should be called', () => {
    const mouseEvent = new MouseEvent('click');
    spyOn(mouseEvent, 'preventDefault').and.callFake(() => {});
    const bottomSheetRefSpy = spyOn((<any>component).bottomSheetRef, 'dismiss');
    component.openLink(mouseEvent, 'send');
    expect(bottomSheetRefSpy).toHaveBeenCalled();
  });

  it('dismiss should be called', () => {
    const mouseEvent = new MouseEvent('click');
    spyOn(mouseEvent, 'preventDefault').and.callFake(() => {});
    const pinsServiceSpy = spyOn(
      (<any>component).pinsService,
      'resolveActionObserver'
    );
    component.openLink(mouseEvent, 'send');
    expect(pinsServiceSpy).toHaveBeenCalled();
  });
});
