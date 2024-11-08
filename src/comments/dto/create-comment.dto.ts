// src/comments/dto/create-comment.dto.ts
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: '댓글 작성자',
    example: '작성자 이름',
  })
  @IsString()
  @Length(1, 20, {
    message: '댓글 작성자는 최소 1자 이상 20자 이하로 작성해야합니다.',
  })
  writer: string;

  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용입니다.',
  })
  @IsString()
  @Length(1, 1000, {
    message: '댓글은 최소 1자 이상 1000자 이하로 작성해야합니다.',
  })
  content: string;
}
