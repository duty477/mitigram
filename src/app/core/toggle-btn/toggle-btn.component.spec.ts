import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ToggleBtnComponent} from './toggle-btn.component';

@Component({
  template: `
    <app-toggle-btn
      [model]="model"
      [trueText]="trueText"
      [falseText]="falseText"
      (modelChange)="onModelChange($event)"
    ></app-toggle-btn>
  `,
})
class TestHostComponent {
  model = true;
  trueText = 'Yes';
  falseText = 'No';

  onModelChange(newValue: boolean) {
    this.model = newValue;
  }
}

describe('ToggleBtnComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let toggleBtnElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleBtnComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    toggleBtnElement = fixture.debugElement.query(By.css('.toggle-btn')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display the trueText when model is true', () => {
    const trueTextElement = toggleBtnElement.querySelector('.toggle-btn__label--active');
    const falseTextElement = toggleBtnElement.querySelector('.toggle-btn__label:not(.toggle-btn__label--active)');
    expect(trueTextElement?.textContent).toContain('Yes');
    expect(falseTextElement?.textContent).toContain('No');
  });

  it('should display the falseText when model is false', () => {
    testHost.model = false;
    fixture.detectChanges();
    const trueTextElement = toggleBtnElement.querySelector('.toggle-btn__label--active');
    const falseTextElement = toggleBtnElement.querySelector('.toggle-btn__label:not(.toggle-btn__label--active)');
    expect(trueTextElement?.textContent).toContain('No');
    expect(falseTextElement?.textContent).toContain('Yes');
  });

  it('should apply the active class to the switch and labels when model is true', () => {
    const switchElement = toggleBtnElement.querySelector('.toggle-btn__switch');
    const trueTextElement = toggleBtnElement.querySelector('.toggle-btn__label--active');
    const falseTextElement = toggleBtnElement.querySelector('.toggle-btn__label:not(.toggle-btn__label--active)');
    expect(switchElement?.classList.contains('toggle-btn__switch--active')).toBeTruthy();
    expect(trueTextElement?.classList.contains('toggle-btn__label--active')).toBeTruthy();
    expect(falseTextElement?.classList.contains('toggle-btn__label--active')).toBeFalsy();
  });

  it('should not apply the active class to the switch and labels when model is false', () => {
    testHost.model = false;
    fixture.detectChanges();
    const switchElement = toggleBtnElement.querySelector('.toggle-btn__switch');
    const trueTextElement = toggleBtnElement.querySelector('.toggle-btn__label--active');
    const falseTextElement = toggleBtnElement.querySelector('.toggle-btn__label:not(.toggle-btn__label--active)');
    expect(switchElement?.classList.contains('toggle-btn__switch--active')).toBeFalsy();
    expect(trueTextElement?.classList.contains('toggle-btn__label--active')).toBeTruthy();
    expect(falseTextElement?.classList.contains('toggle-btn__label--active')).toBeFalsy();
  });
});
