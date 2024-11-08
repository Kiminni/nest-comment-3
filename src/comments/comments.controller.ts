// src/comments/comments.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { CreateReplyDto } from './dto/create-reply.dto';
import { PaginateCommentDto } from './dto/paginate-comment.dto';

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
  @Get()
  @ApiOperation({ summary: '댓글/대댓글 조회 API' })
  @ApiResponse({ status: 200, description: '조회 성공', type: [Comment] })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async getComments(@Query() paginateDto: PaginateCommentDto) {
    return await this.commentsService.getComments(paginateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '댓글/대댓글 삭제 API' })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 404, description: '댓글을 찾을 수 없음' })
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.deleteComment(id);
  }
}
