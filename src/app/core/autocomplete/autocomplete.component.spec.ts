import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AutocompleteComponent } from './autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
      imports: [FormsModule, MatAutocompleteModule, ReactiveFormsModule, MatInputModule, CommonModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected option on optionSelected', () => {
    spyOn(component.modelChange, 'emit');
    const selectedOption = 'Banana';

    // Simulate option selection
    component.getSelection(selectedOption);

    // Expect that the emit method was called with the selected option
    expect(component.modelChange.emit).toHaveBeenCalledWith(selectedOption);
  });
});
