import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {MenuComponent} from './menu.component';
import {By} from '@angular/platform-browser';
import {CtaComponent} from "../../core/cta/cta.component";
import {HttpClientModule} from "@angular/common/http";
import {provideAngularSvgIcon, SvgIconComponent} from "angular-svg-icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  template: `
      <app-menu></app-menu>
  `,
})
class TestHostComponent {
}

describe('MenuComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let menuComponent: MenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent, TestHostComponent, CtaComponent],
      imports: [RouterTestingModule, HttpClientModule, SvgIconComponent, BrowserAnimationsModule],
      providers: [provideAngularSvgIcon()]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    menuComponent = fixture.debugElement.query(By.directive(MenuComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(menuComponent).toBeTruthy();
  });

  it('should display menu items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.menu__logo + ul li'));
    if(window.innerWidth > 1024) {
      expect(menuItems.length).toBe(menuComponent.menuItems.length);
    }else {
      expect(menuItems.length).toBe(0);
    }
  });
});
