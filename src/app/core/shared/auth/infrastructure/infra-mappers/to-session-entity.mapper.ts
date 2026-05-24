import { DatePipe } from "@angular/common";
import { SessionDto } from "../../application/dtos/responses/session.dto";
import { SessionEntity } from "../../domain/entities/session.entity";
import { toUserEntity } from "./to-user-entity.mapper";

export function toSessionEntity(data: SessionDto): SessionEntity{
  const datePipe = new DatePipe('en-US');
  const dateFormatted = datePipe.transform(data.userData.createdAt, 'yyyy-MM-dd');
  return {
    userData: toUserEntity(data.userData),
    accessToken: data.accessToken,
  };
}