// src/comments/entities/comment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { CommentReport } from './comment-report.entity';
import { CommentLike } from './comment-like.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class Comment {
  @ApiProperty({
    description: '댓글 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  writer: string;

  @Column({ length: 1000 })
  content: string;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  reportCount: number;

  @Column({ default: false })
  isHidden: boolean;

  @ManyToOne(() => Comment, (comment) => comment.children, {
    onDelete: 'CASCADE',
  })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CommentLike, (like) => like.comment)
  likes: CommentLike[];

  @OneToMany(() => CommentReport, (report) => report.comment)
  reports: CommentReport[];
}
