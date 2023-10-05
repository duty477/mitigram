import {ComponentFixture, TestBed} from '@angular/core/testing';
import {afterRender, Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {CtaComponent} from './cta.component';
import {MenuItem} from '../../utils/interfaces';
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {provideAngularSvgIcon, SvgIconComponent} from "angular-svg-icon";

@Component({
  template: `
    <app-cta [menu]="menu" [active]="active"></app-cta>
  `,
})
class TestHostComponent {
  menu: MenuItem | undefined = {
    url: '/test-url',
    icon: 'test-icon.svg',
    text: 'Test Menu',
  };
  active = false;
}

describe('CtaComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let ctaElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CtaComponent, TestHostComponent],
      imports: [RouterTestingModule, HttpClientModule, SvgIconComponent],
      providers: [provideAngularSvgIcon()]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display the menu item text', () => {
    ctaElement = fixture.debugElement.query(By.css('.cta')).nativeElement;
    const labelElement = ctaElement.querySelector('.cta__label');
    expect(labelElement?.textContent).toContain('Test Menu');
  });

  it('should set the routerLink correctly', () => {
    ctaElement = fixture.debugElement.query(By.css('.cta')).nativeElement;
    const routerLink = ctaElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/test-url');
  });

  it('should add the cta--active class when active is true', () => {
    ctaElement = fixture.debugElement.query(By.css('.cta')).nativeElement;
    testHost.active = true;
    fixture.detectChanges();
    expect(ctaElement.classList.contains('cta--active')).toBeTruthy();
  });

  it('should display the menu item icon when available', () => {
    ctaElement = fixture.debugElement.query(By.css('.cta')).nativeElement;
    const iconElement = ctaElement.querySelector('svg-icon');
    expect(iconElement).toBeTruthy();
  });

  it('should not display the menu item icon when not available', () => {
    ctaElement = fixture.debugElement.query(By.css('.cta')).nativeElement;
    if(testHost.menu)
      testHost.menu.icon = '';
    fixture.detectChanges();
    const iconElement = ctaElement.querySelector('svg-icon');
    expect(iconElement).toBeFalsy();
  });
});
