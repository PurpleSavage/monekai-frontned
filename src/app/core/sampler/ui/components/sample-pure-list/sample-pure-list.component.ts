import {Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from "@angular/core";
import { AudioStateService } from "../../../state-manager/audio-state.service";
import { ListSamplesUseCase } from "../../../application/use-cases/list-samples.use-case";
import { AppBaseError } from "../../../../shared/common/infrastructure/http-errors/app-base.error";
import { SampleCardComponent } from "../sample-card/sample-card.component";
import { SkeletonListComponent } from "../skeleton-list/skeleton-list.component";
import { LoaderComponent } from "../../../../shared/common/ui/components/loader/loader.component";



@Component({
  selector: 'app-sample-pure-list',
  templateUrl: './sample-pure-list.component.html',
  standalone: true,
  imports: [
    SampleCardComponent,
    SkeletonListComponent,
    SampleCardComponent,
    LoaderComponent
  ],
})
export class SamplePureListComponent implements OnInit{

  // =========================
  // VIEWCHILD
  // =========================

  public boxGuard!: ElementRef<HTMLDivElement>;

  @ViewChild('boxGuard')
  set boxGuardSetter(
    element: ElementRef<HTMLDivElement>
  ) {

    if (!element) return;

    this.boxGuard = element;

    this.initInfiniteScroll();
  }

  @ViewChild('container')
  container!: ElementRef<HTMLDivElement>;

  // =========================
  // INJECTS
  // =========================

  public audioStateService =inject(AudioStateService);

  public listSamplesUseCase =inject(ListSamplesUseCase);

  // =========================
  // STATE
  // =========================

  public pageSample = signal(1);

  public errorListSamples = signal('');

  public initialLoading = signal(true);

  public loadingMore = signal(false);

  public isFetching = signal(false);

  private observer?: IntersectionObserver;

  // =========================
  // LIFECYCLE
  // =========================

  ngOnInit(): void {

    this.audioStateService.resetAudios();

    this.loadSamples();
  }

  

  // =========================
  // LOAD
  // =========================

  public loadSamples() {

    if (
      this.isFetching() ||
      !this.audioStateService
        .audiosGenerated()
        .hasMore
    ) {
      return;
    }

    this.isFetching.set(true);

    const isFirstPage =
      this.pageSample() === 1;

    if (!isFirstPage) {
      this.loadingMore.set(true);
    }

    this.listSamplesUseCase.execute({
      limit: 10,
      page: this.pageSample(),
    }).subscribe({

      next: (data) => {

        this.errorListSamples.set('');

        this.audioStateService
          .appendAudios(data);

        this.pageSample.update(
          page => page + 1
        );

        this.checkContainerOverflow();
      },

      error: (error) => {

        if (error instanceof AppBaseError) {

          this.errorListSamples.set(
            error.message
          );

        }

      },

      complete: () => {

        this.initialLoading.set(false);

        this.loadingMore.set(false);

        this.isFetching.set(false);
      }
    });
  }

  // =========================
  // RETRY
  // =========================

  public retryLoad() {

    if (this.isFetching()) return;

    this.errorListSamples.set('');

    this.loadSamples();
  }

  // =========================
  // INFINITE SCROLL
  // =========================

  public initInfiniteScroll() {

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {

        if (
          !entry.isIntersecting ||
          this.isFetching() ||
          !this.audioStateService
            .audiosGenerated()
            .hasMore
        ) {
          return;
        }

        this.loadSamples();

      },
      {
        root: this.container.nativeElement,
        threshold: 0.1,
      }
    );

    this.observer.observe(
      this.boxGuard.nativeElement
    );
  }

  // =========================
  // AUTO FILL CONTAINER
  // =========================

  private checkContainerOverflow() {

    requestAnimationFrame(() => {

      const container =
        this.container.nativeElement;

      const hasScroll =
        container.scrollHeight >
        container.clientHeight;

      if (
        !hasScroll &&
        this.audioStateService
          .audiosGenerated()
          .hasMore
      ) {

        this.loadSamples();

      }

    });
  }
}