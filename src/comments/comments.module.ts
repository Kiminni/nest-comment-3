// src/comments/comments.module.ts
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller'; // CommentsController 임포트
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentLike } from './entities/comment-like.entity';
import { CommentReport } from './entities/comment-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentLike, CommentReport])],
  controllers: [CommentsController], // CommentsController 등록
  providers: [CommentsService],
})
export class CommentsModule {}
