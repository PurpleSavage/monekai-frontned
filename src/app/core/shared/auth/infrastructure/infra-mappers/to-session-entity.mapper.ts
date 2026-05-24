import { DatePipe } from "@angular/common";
import { SessionDto } from "../../application/dtos/responses/session.dto";
import { SessionEntity } from "../../domain/entities/session.entity";

export function toSessionEntity(data: SessionDto): SessionEntity{
  const datePipe = new DatePipe('en-US');
  const dateFormatted = datePipe.transform(data.userData.createdAt, 'yyyy-MM-dd');
  return {
    userData: {
      id: data.userData.id,
      email: data.userData.email,
      photoUrl: data.userData.photoUrl,
      createdAt:dateFormatted ?? "",
      credits: data.userData.credits,
    },
    accessToken: data.accessToken,
  };
}