// src/comments/dto/create-reply.dto.ts
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class CreateReplyDto extends CreateCommentDto {
  @ApiProperty({
    description: '부모 댓글 ID',
    example: 1,
  })
  @IsNumber()
  parentId: number;
}
