import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
import { InfiniteScrollComponent, InfiniteScrollStyleData } from "../../../../../shared/common/ui/components/infinite-scroll/infinite-scroll.component";
import { ListCommunitySharedSamplesUseCase } from "../../../application/use-cases/list-community-shared-samples.use-case";
import { CommunitySamplesStateService } from "../../../state-manager/community-samples-state.service";
import { SampleCardSharedComponent } from "../../components/sample-card-shared/sample-card-shared.component";
import { AppBaseError } from "../../../../../shared/common/infrastructure/http-errors/app-base.error";

@Component({
  selector: 'app-community-shared-samples',
  templateUrl: './community-shared-samples.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InfiniteScrollComponent, SampleCardSharedComponent],
  providers: [CommunitySamplesStateService],
  styles: [':host { display: block; height: 100%; }'],
})
export class CommunitySharedSamplesComponent implements OnInit {
  private readonly listCommunitySharedSamples = inject(ListCommunitySharedSamplesUseCase);
  private readonly communitySamplesState = inject(CommunitySamplesStateService);

  private readonly PAGE_SIZE = 12;
  private page = 1;

  protected readonly samples = this.communitySamplesState.listSharedSamples;
  protected readonly isLoading = signal(false);
  protected readonly hasMore = signal(true);
  protected readonly error = signal('');

  protected readonly keyExtractor = (item: { id: string }) => item.id;

  protected readonly styleData: InfiniteScrollStyleData = {
    containerStyle:
      'h-full w-full overflow-y-auto grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-6 p-6 content-start',
    textEmptyStyle:
      'flex flex-col items-center justify-center h-full col-span-full px-4 text-center',
    sentinelStyle: 'h-10 w-full col-span-full',
    loaderStyle: 'flex justify-center w-full col-span-full py-2',
  };

  ngOnInit(): void {
    this.getMoreSharedSamples();
  }

  public getMoreSharedSamples(): void {
    if (this.isLoading() || !this.hasMore()) return;
    if (this.error() !== '') return;

    this.isLoading.set(true);

    this.listCommunitySharedSamples
      .execute({ limit: this.PAGE_SIZE, page: this.page })
      .subscribe({
        next: (res) => {
          this.communitySamplesState.setListSharedSamples([...this.samples(), ...res.data]);
          this.hasMore.set(res.hasMore);
          this.page += 1;
          this.error.set('');
        },
        error: (err: unknown) => {
          this.isLoading.set(false);
          this.error.set(
            err instanceof AppBaseError ? err.message : 'Error loading shared samples',
          );
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  public retrySharedSamples(): void {
    this.error.set('');
    this.getMoreSharedSamples();
  }
}