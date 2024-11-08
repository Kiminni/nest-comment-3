// src/comments/comments.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { CreateReplyDto } from './dto/create-reply.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: '댓글 작성 API' })
  @ApiResponse({ status: 201, description: '댓글 작성 성공', type: Comment })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBody({ type: CreateCommentDto })
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.createComment(createCommentDto);
  }

  @Post('replies')
  @ApiOperation({ summary: '대댓글 작성 API' })
  @ApiResponse({ status: 201, description: '대댓글 작성 성공', type: Comment })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBody({ type: CreateReplyDto })
  async createReply(@Body() createReplyDto: CreateReplyDto): Promise<Comment> {
    return await this.commentsService.createReply(createReplyDto);
  }
}
