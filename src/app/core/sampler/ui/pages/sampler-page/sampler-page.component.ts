import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router";
import { LucideLayersPlus, LucideSave, LucideSearch } from "@lucide/angular";
import { LIST_MODE_PARAM, ListMode } from "../../ui-options/list-mode.options";
import { SETTINGS_MODE_PARAM, SettingsMode } from "../../ui-options/settins-mode.options";
import { toSignal } from "@angular/core/rxjs-interop";
import { AudioEffectsPageComponent } from "../../components/audio-effects/audio-effects.component";

@Component({
  selector: 'app-sampler-page',
  templateUrl: './sampler-page.component.html',
  standalone: true,
  imports: [
    LucideSearch,
    LucideSave,
    LucideLayersPlus,
    AudioEffectsPageComponent
  ], 
  host: {
    class: 'block w-full h-full' 
  }
})
export class SamplerPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  
  public listMode = signal<ListMode>(LIST_MODE_PARAM.listPure);
  // 👇 Cambiado a public para poder evaluarlo directamente en el HTML
  public settingsMode = signal<SettingsMode>(SETTINGS_MODE_PARAM.effects); 
  public isCreateMode = signal<boolean>(false);
  public queryParams = toSignal(this.route.queryParams);
  
  ngOnInit(): void {
    // Escucha inicial de parámetros de la URL
    const listModeParams = this.queryParams()?.["listMode"] ?? LIST_MODE_PARAM.listPure;
    const settingsModeParams = this.queryParams()?.["settingsMode"] ?? SETTINGS_MODE_PARAM.effects;
    const isCreateModeParams = this.queryParams()?.["isCreateMode"] ?? false;
    if (isCreateModeParams) {
      this.isCreateMode.set(isCreateModeParams as boolean);
    }
    if (listModeParams) {
      this.listMode.set(listModeParams as ListMode);
    }
    if (settingsModeParams) {
      this.settingsMode.set(settingsModeParams as SettingsMode);
    }
  }

  public setListMode(mode: ListMode) {
    this.listMode.set(mode);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { listMode: mode },
      queryParamsHandling: 'merge', 
    });
  }
  public setCreateMode(isCreateMode: boolean) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { isCreateMode },
      queryParamsHandling: 'merge', 
    }); 
  }
  public setSettingsMode(mode: SettingsMode) { 
    this.settingsMode.set(mode);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { settingsMode: mode },
      queryParamsHandling: 'merge', 
    });
  }

  public getListMode() {
    return this.listMode();
  }
}