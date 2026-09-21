import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
import { InfiniteScrollComponent, InfiniteScrollStyleData } from "../../../../../shared/common/ui/components/infinite-scroll/infinite-scroll.component";
import { ListCommunitySharedEditSamplesUseCase } from "../../../application/use-cases/list-community-shared-edit-samples.use-case";
import { CommunitySamplesStateService } from "../../../state-manager/community-samples-state.service";
import { SampleCardSharedEditComponent } from "../../components/sample-card-shared-edit/sample-card-shared-edit.component";
import { AppBaseError } from "../../../../../shared/common/infrastructure/http-errors/app-base.error";

@Component({
  selector: 'app-community-shared-edit-samples-page',
  templateUrl: './community-shared-edit-samples-page.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InfiniteScrollComponent, SampleCardSharedEditComponent],
  providers: [CommunitySamplesStateService],
  styles: [':host { display: block; height: 100%; }'],
})
export class CommunitySharedEditSamplesPageComponent implements OnInit {
  private readonly listCommunitySharedEditSamples = inject(ListCommunitySharedEditSamplesUseCase);
  private readonly communitySamplesState = inject(CommunitySamplesStateService);

  private readonly PAGE_SIZE = 12;
  private page = 1;

  protected readonly samples = this.communitySamplesState.listSharedEditSamples;
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
    this.getMoreSharedEditSamples();
  }

  public getMoreSharedEditSamples(): void {
    if (this.isLoading() || !this.hasMore()) return;
    if (this.error() !== '') return;

    this.isLoading.set(true);

    this.listCommunitySharedEditSamples
      .execute({ limit: this.PAGE_SIZE, page: this.page })
      .subscribe({
        next: (res) => {
          this.communitySamplesState.setListSharedEditSamples([...this.samples(), ...res.data]);
          this.hasMore.set(res.hasMore);
          this.page += 1;
          this.error.set('');
        },
        error: (err: unknown) => {
          this.isLoading.set(false);
          this.error.set(
            err instanceof AppBaseError ? err.message : 'Error loading shared edit samples',
          );
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  public retrySharedEditSamples(): void {
    this.error.set('');
    this.getMoreSharedEditSamples();
  }
}