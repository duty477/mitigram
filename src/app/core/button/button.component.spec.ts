import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ButtonComponent} from './button.component';
import {RouterTestingModule} from "@angular/router/testing";

@Component({
  template: `
      <app-button
              [isButton]="isButton"
              [url]="url"
              [label]="label"
              [modifier]="modifier"
              [disabled]="disabled"
      ></app-button>
  `,
})
class TestHostComponent {
  isButton = true;
  url = '';
  label = 'Test Button';
  modifier = 'test-modifier';
  disabled = false;
}

describe('ButtonComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ButtonComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should render as a button when isButton is true', () => {
    testHost.isButton = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button.btn'));
    const anchorElement = fixture.debugElement.query(By.css('a.btn'));
    expect(buttonElement).toBeTruthy();
    expect(anchorElement).toBeFalsy();
  });

  it('should render as an anchor when isButton is false', () => {
    testHost.isButton = false;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button.btn'));
    const anchorElement = fixture.debugElement.query(By.css('a.btn'));
    expect(buttonElement).toBeFalsy();
    expect(anchorElement).toBeTruthy();
  });

  it('should set the label text', () => {
    const buttonElement = fixture.debugElement.query(By.css('button.btn'));
    expect(buttonElement.nativeElement.textContent).toContain('Test Button');
  });

  it('should apply the modifier class', () => {
    const buttonElement = fixture.debugElement.query(By.css('button.btn'));
    expect(buttonElement.nativeElement.classList.contains('test-modifier')).toBeTruthy();
  });

  it('should disable the button when disabled is true', () => {
    testHost.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button.btn'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });

  it('should have the correct routerLink when isButton is false', () => {
    testHost.isButton = false;
    testHost.url = '/test-url';
    fixture.detectChanges();
    const anchorElement = fixture.debugElement.query(By.css('a.btn'));
    expect(anchorElement.nativeElement.getAttribute('href')).toContain('/test-url');
  });
});
