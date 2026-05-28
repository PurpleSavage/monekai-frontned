
import { SessionDto } from "../../application/dtos/responses/session.dto";
import { SessionEntity } from "../../domain/entities/session.entity";
import { toUserEntity } from "./to-user-entity.mapper";

export function toSessionEntity(data: SessionDto): SessionEntity{

  return {
    userData: toUserEntity(data.userData),
    accessToken: data.accessToken,
  };
}