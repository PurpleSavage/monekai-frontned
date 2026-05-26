import { Injectable } from "@angular/core";
import { AccessTokenDto } from "../dtos/responses/access-token.dto";
import { Observable, tap } from "rxjs";
import { AuthPort } from "../ports/auth.port";


@Injectable()
export class GetNewTokenUseCase {
  constructor(
    private authService: AuthPort,
    
  ) { }
  execute():Observable<AccessTokenDto>  { 
    return this.authService.geNewtoken()
  }
}
