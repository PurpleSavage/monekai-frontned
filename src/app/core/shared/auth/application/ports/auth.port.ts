import { Observable } from "rxjs";
import { GoogleAuthDto } from "../dtos/requests/google-auth.dto";
import { SessionEntity } from "../../domain/entities/session.entity";


export abstract class AuthPort { 
  abstract loginWithGoogle(dto: GoogleAuthDto): Observable<SessionEntity>
  abstract getProfile(): Observable<SessionEntity>
}