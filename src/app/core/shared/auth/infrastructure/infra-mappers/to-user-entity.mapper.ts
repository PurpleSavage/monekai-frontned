import { DatePipe } from "@angular/common";
import { UserDto } from "../../application/dtos/responses/user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export function toUserEntity(userDto: UserDto): UserEntity {
  const hasAvatar = userDto.photoUrl !== null;
  const datePipe = new DatePipe('en-US');
  const dateFormatted = datePipe.transform(userDto.createdAt, 'yyyy-MM-dd');
  return {
    id: userDto.id,
    email: userDto.email,
    photoUrl: userDto.photoUrl,
    createdAt: dateFormatted || 'no created at' ,
    credits: userDto.credits,
    hasAvatar,
  }
}