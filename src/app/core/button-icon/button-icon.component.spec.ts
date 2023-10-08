import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonIconComponent} from './button-icon.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {provideAngularSvgIcon, SvgIconComponent} from "angular-svg-icon";

describe('ButtonIconComponent', () => {
  let component: ButtonIconComponent;
  let fixture: ComponentFixture<ButtonIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, SvgIconComponent],
      declarations: [ButtonIconComponent],
      providers: [provideAngularSvgIcon()]
    });
    fixture = TestBed.createComponent(ButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
