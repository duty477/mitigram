import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {InputComponent} from './input.component';

@Component({
  template: `
    <app-input
      [label]="label"
      [placeholder]="placeholder"
      [type]="type"
      [(model)]="model"
      [name]="name"
    ></app-input>
  `,
})
class TestHostComponent {
  label = 'Test Label';
  placeholder = 'Test Placeholder';
  type = 'text';
  model = '';
  name = 'testInput';
}

describe('InputComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent, TestHostComponent],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display the label text', () => {
    const labelElement = fixture.debugElement.query(By.css('.input__label'));
    expect(labelElement.nativeElement.textContent).toContain('Test Label');
  });

  it('should set the input type', () => {
    expect(inputElement.getAttribute('type')).toBe('text');
  });

  it('should set the input placeholder', () => {
    expect(inputElement.getAttribute('placeholder')).toBe('Test Placeholder');
  });

  it('should bind the model to the input value', () => {
    testHost.model = 'Test Value';
    fixture.detectChanges();
    expect(inputElement.getAttribute('ng-reflect-model')).toBe('Test Value');
  });
});
