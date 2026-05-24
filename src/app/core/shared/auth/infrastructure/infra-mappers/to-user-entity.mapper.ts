import { UserDto } from "../../application/dtos/responses/user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export function toUserEntity(userDto: UserDto): UserEntity {
  return {
    id: userDto.id,
    email: userDto.email,
    photoUrl: userDto.photoUrl,
    createdAt: userDto.createdAt,
    credits: userDto.credits,
  }
}