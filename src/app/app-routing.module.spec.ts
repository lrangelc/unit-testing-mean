import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

fdescribe('App Routing', () => {
  beforeAll(() => {
    console.log('benforeAll');
  });

  beforeEach(() => {
    console.log('beforeEach');
  });

  afterAll(() => {
    console.log('afterAll');
  });

  afterEach(() => {
    console.log('afterEach');
  });

  it('Should have app as path', () => {
    console.log('Init 1st Testing');
    expect(routes[0].path).toBe('app');
  });

  it('Should match the childrens', () => {
    expect(routes[0].children).toContain({
      path: 'pins',
      component: PinsComponent,
    });
  });
});
