import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {CheckboxComponent} from './checkbox.component';
import {HttpClientModule} from '@angular/common/http';
import {SvgIconComponent, provideAngularSvgIcon} from 'angular-svg-icon';

@Component({
  template: `
      <app-checkbox
              [label]="label"
              [modifier]="modifier"
              [isDisabled]="isDisabled"
              [isReadOnly]="isReadOnly"
              [(model)]="model"
              (modelChange)="onModelChange($event)"
      ></app-checkbox>
  `,
})
class TestHostComponent {
  label = 'Test Checkbox';
  modifier = 'test-modifier';
  isDisabled = false;
  isReadOnly = false;
  model = false;

  onModelChange(newValue: boolean) {
    this.model = newValue;
  }
}

describe('CheckboxComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let checkboxElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, TestHostComponent],
      imports: [FormsModule, HttpClientModule, SvgIconComponent],
      providers: [provideAngularSvgIcon()]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    checkboxElement = fixture.debugElement.query(By.directive(CheckboxComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display the label', () => {
    const labelElement = checkboxElement.query(By.css('.checkbox__label'));
    expect(labelElement.nativeElement.textContent).toContain('Test Checkbox');
  });

  it('should apply the modifier class', () => {
    const labelElement = checkboxElement.query(By.css('.checkbox'));
    expect(labelElement.nativeElement.classList.contains('test-modifier')).toBeTruthy();
  });

  it('should make the checkbox readonly when isReadOnly is true', () => {
    testHost.isReadOnly = true;
    fixture.detectChanges();
    const inputElement = checkboxElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(inputElement.readOnly).toBeTruthy();
  });

  it('should emit modelChange when checkbox is clicked', () => {
    const inputElement = checkboxElement.query(By.css('input[type="checkbox"]')).nativeElement;
    spyOn(testHost, 'onModelChange');

    inputElement.click();

    expect(testHost.onModelChange).toHaveBeenCalledWith(true);
  });

  it('should not propagate click event to parent label', () => {
    const labelElement = checkboxElement.nativeElement;
    spyOn(labelElement, 'click');

    const inputElement = checkboxElement.query(By.css('input[type="checkbox"]')).nativeElement;
    inputElement.click();

    expect(labelElement.click).not.toHaveBeenCalled();
  });
});
