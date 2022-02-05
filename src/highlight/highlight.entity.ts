import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

import getEnumValues from '../utilities/getEnumValues';
import { HighlightSrcType } from '../utilities/types';

@Entity()
export class Highlight {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  src: string;

  @Column({ enum: getEnumValues(HighlightSrcType, 'number'), nullable: false })
  srcType: HighlightSrcType;

  @Column({ nullable: false })
  srcAuthor: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Column({ default: false, nullable: false })
  isFavorite: boolean;

  @Column({ default: false, nullable: false })
  isPrivate: boolean;

  @Column({ default: 0, nullable: false })
  likesCount: number;

  @ManyToOne(() => User, (user) => user.highlights)
  user: User;
}
