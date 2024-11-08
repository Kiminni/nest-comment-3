// src/comments/comments.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentReport } from './entities/comment-report.entity';
import { CommentLike } from './entities/comment-like.entity';
import { CreateReplyDto } from './dto/create-reply.dto';
import { PaginateCommentDto } from './dto/paginate-comment.dto';
import { LikeCommentDto } from './dto/like-comment.dto';

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

  // 댓글/대댓글 삭제
  async deleteComment(id: number): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
  }

  // 댓글/대댓글 좋아요
  async likeComment(id: number, likeCommentDto: LikeCommentDto): Promise<void> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    const { writer } = likeCommentDto;

    // 중복 좋아요 체크
    const existingLike = await this.likesRepository.findOne({
      where: { comment: { id }, writer },
    });

    if (existingLike) {
      throw new BadRequestException('이미 이 댓글에 좋아요를 눌렀습니다.');
    }

    // 좋아요 저장
    const like = this.likesRepository.create({ comment, writer });
    await this.likesRepository.save(like);

    // 댓글의 좋아요 수 증가
    comment.likeCount += 1;
    await this.commentsRepository.save(comment);
  }

  // 댓글/대댓글 신고하기
  async reportComment(
    id: number,
    reportCommentDto: ReportCommentDto,
  ): Promise<void> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    const { writer } = reportCommentDto;

    // 중복 신고 체크
    const existingReport = await this.reportsRepository.findOne({
      where: { comment: { id }, writer },
    });

    if (existingReport) {
      throw new BadRequestException('이미 이 댓글을 신고하였습니다.');
    }

    // 신고 저장
    const report = this.reportsRepository.create({ comment, writer });
    await this.reportsRepository.save(report);

    // 댓글의 신고 수 증가
    comment.reportCount += 1;

    if (comment.reportCount >= 10) {
      comment.isHidden = true;
    }

    await this.commentsRepository.save(comment);
  }
}
