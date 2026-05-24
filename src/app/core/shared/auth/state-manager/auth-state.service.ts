import { Injectable, signal } from "@angular/core";
import { SessionEntity } from "../domain/entities/session.entity";

@Injectable({
  providedIn: 'root'
})
export class AuthStateManager { 
  public session = signal<SessionEntity | null>(null)
  public isLoadingSession = signal<boolean>(false)
  setSession(session: SessionEntity | null){
    this.session.set(session)
  }
  getSession(){
    return this.session()
  }
  setLoading(loading: boolean){
    this.isLoadingSession.set(loading)
  }
  isLoading(){
    return this.isLoadingSession()
  }
}