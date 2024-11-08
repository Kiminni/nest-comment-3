// src/comments/entities/comment-report.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('comment_reports')
export class CommentReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: string;

  @ManyToOne(() => Comment, (comment) => comment.reports, {
    onDelete: 'CASCADE',
  })
  comment: Comment;
}
