import {Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnChanges {

  @Input() buffer: number;
  @Output() trigger: EventEmitter<boolean> = new EventEmitter<boolean>();
  scrollDirection: boolean;
  previousScrollTop = 0;

  constructor(private el: ElementRef) {
  }

  @HostListener('scroll', ['$event'])
  onScroll(e): void {
    console.log('scrolling', this.buffer, this.el.nativeElement.clientHeight);
    this.calculateTrigger();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buffer = changes?.buffer?.currentValue;
  }

  /**
   * identifying the scroll direction
   * and firing an event when the configured trigger point crossed
   */
  calculateTrigger(): void {
    this.scrollDirection = this.previousScrollTop <= this.el.nativeElement.scrollTop;
    const totalHeightScrolled = this.el.nativeElement.clientHeight + this.el.nativeElement.scrollTop ;
    const totalHeightScrolledTop = this.el.nativeElement.scrollTop ;
    if ((this.el.nativeElement.scrollHeight - totalHeightScrolled) < this.buffer  && this.scrollDirection) {
      console.log('reached bottom trigger', totalHeightScrolled);
      this.trigger.emit(this.scrollDirection);
    }
    if (totalHeightScrolledTop < this.buffer  && !this.scrollDirection) {
      console.log('reached top trigger', totalHeightScrolled);
      this.trigger.emit(this.scrollDirection);
    }
    this.previousScrollTop = this.el.nativeElement.scrollTop;
  }
}
