// src/comments/dto/paginate-comment.dto.ts
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateCommentDto {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    description: '페이지당 아이템 수',
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
}
