// src/comments/dto/report-comment.dto.ts
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportCommentDto {
  @ApiProperty({
    description: '작성자',
    example: '사용자 이름',
  })
  @IsString()
  @Length(1, 20, {
    message: '작성자는 최소 1자 이상 20자 이하로 작성해야합니다.',
  })
  writer: string;
}
