import { UserEntity } from "./user.entity"

export interface SessionEntity {
  userData:UserEntity
  accessToken:string
}