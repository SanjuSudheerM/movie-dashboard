import {InfiniteScrollDirective} from './infinite-scroll.directive';
import {TestBed} from '@angular/core/testing';
import {ElementRef} from '@angular/core';


describe('InfiniteScrollDirective', () => {
  let fixture;
  let directive;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [InfiniteScrollDirective]
    });
  });
  it('should create an instance', () => {
    directive = new InfiniteScrollDirective(new ElementRef(''));
    expect(directive).toBeTruthy();
  });
});


