import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigationService } from './navigation.service';

fdescribe('NavigationService', () => {
  let service: NavigationService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [NavigationService],
      imports: [RouterTestingModule],
    })
  );

  beforeEach(() => {
    service = TestBed.get(NavigationService);
  });

  it('should be created', () => {
    // const service: NavigationService = TestBed.get(NavigationService);
    expect(service).toBeTruthy();
  });

  it('Should navigate to pins', () => {
    const navigate = spyOn((<any>service).router, 'navigate');

    service.goToPins();

    expect(navigate).toHaveBeenCalledWith(['/app/pins']);
  });

  it('Should navigate to edit mode', () => {
    const navigate = spyOn((<any>service).router, 'navigate');

    service.goToEditMode();

    expect(navigate).toHaveBeenCalledWith(['/app/add']);
  });
});
