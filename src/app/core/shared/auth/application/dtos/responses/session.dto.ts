import { UserDto } from "./user.dto";

export interface SessionDto { 
  userData:UserDto,
  accessToken:string
}