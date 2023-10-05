import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {NotificationComponent} from './notification.component';
import {Notification} from '../../models/notification.model';
import {By} from '@angular/platform-browser';
import {CtaComponent} from "../../core/cta/cta.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {provideAngularSvgIcon, SvgIconComponent} from "angular-svg-icon";
import {ButtonComponent} from "../../core/button/button.component";

@Component({
  template: `
    <app-notification [notification]="notification"></app-notification>
  `,
})
class TestHostComponent {
  notification?: Notification = new Notification({
    _id: 1,
    header: 'Test Notification',
    body: 'This is a test notification.',
  });
}

describe('NotificationComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let notificationComponent: NotificationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent, NotificationComponent, TestHostComponent],
      imports: [HttpClientModule, SvgIconComponent],
      providers: [provideAngularSvgIcon()]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    notificationComponent = fixture.debugElement.query(By.directive(NotificationComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(notificationComponent).toBeTruthy();
  });

  it('should display the notification header and body', () => {
    const headerElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    const bodyElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(headerElement.textContent).toContain('Test Notification');
    expect(bodyElement.textContent).toContain('This is a test notification.');
  });

  it('should not display the notification if the input is not provided', () => {
    testHost.notification = undefined;
    fixture.detectChanges();
    const notificationElement = fixture.debugElement.query(By.css('.notification'));
    expect(notificationElement).toBeFalsy();
  });
});
