// src/comments/comments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentReport } from './entities/comment-report.entity';
import { CommentLike } from './entities/comment-like.entity';
import { CreateReplyDto } from './dto/create-reply.dto';
import { PaginateCommentDto } from './dto/paginate-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(CommentLike)
    private likesRepository: Repository<CommentLike>,
    @InjectRepository(CommentReport)
    private reportsRepository: Repository<CommentReport>,
  ) {}

  // 댓글 작성
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentsRepository.create(createCommentDto);
    return await this.commentsRepository.save(comment);
  }

  // 대댓글 작성
  async createReply(createReplyDto: CreateReplyDto): Promise<Comment> {
    const { parentId, ...rest } = createReplyDto;
    const parent = await this.commentsRepository.findOne({
      where: { id: parentId },
    });
    if (!parent) {
      throw new NotFoundException('부모 댓글을 찾을 수 없습니다.');
    }
    const reply = this.commentsRepository.create({
      ...rest,
      parent,
    });
    return await this.commentsRepository.save(reply);
  }

  // 댓글/대댓글 조회
  async getComments(paginateDto: PaginateCommentDto) {
    const { page, limit } = paginateDto;
    const [comments, total] = await this.commentsRepository.findAndCount({
      where: { isHidden: false, parent: null },
      relations: ['children'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      total,
      page,
      limit,
      data: comments,
    };
  }
}
