import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";

describe('AppComponent', () => {
  it('should have a <router-outlet> element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
