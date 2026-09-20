import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  input,
  viewChild,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { LoaderComponent } from "../loader/loader.component";

export interface InfiniteScrollStyleData {
  containerStyle?: string;
  textEmptyStyle?: string;
  sentinelStyle?: string;
  loaderStyle?: string;
}

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, LoaderComponent]
})
export class InfiniteScrollComponent<T> implements AfterViewInit, OnDestroy {
  styleData = input<InfiniteScrollStyleData>();
  data = input.required<T[]>();
  renderItem = input.required<TemplateRef<{ $implicit: T }>>();
  keyExtractor = input<(item: T) => unknown>();
  isLoading = input(false);
  hasMore = input(true);
  emptyText = input('');
  getMore = input<() => void>();

  private readonly scrollContainer = viewChild.required<ElementRef<HTMLElement>>('scrollContainer');
  private readonly sentinel = viewChild.required<ElementRef<HTMLElement>>('sentinel');

  private observer?: IntersectionObserver;

  get scrollContainerClass(): string {
    return this.styleData()?.containerStyle ?? 'h-full w-full overflow-y-auto';
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        this.tryLoadMore();
      },
      {
        root: this.scrollContainer().nativeElement,
        threshold: 0.4,
      },
    );
    this.observer.observe(this.sentinel().nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }

  public trackByFn(item: T): unknown {
    return this.keyExtractor() ? this.keyExtractor()!(item) : item;
  }

  private tryLoadMore(): void {
    const getMore = this.getMore();
    if (!getMore || this.isLoading() || !this.hasMore()) return;
    getMore();
  }
}