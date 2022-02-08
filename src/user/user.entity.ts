import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Highlight } from '../highlight/highlight.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Highlight, (highlight) => highlight.user)
  highlights: Highlight[];
}
