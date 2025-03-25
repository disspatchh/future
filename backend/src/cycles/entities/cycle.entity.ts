import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Basic } from '../../common/entities/base.entity';
import type { Talk } from '../../talks/entities/talk.entity';
import type { Project } from '../../projects/entities/project.entity';

@Entity('cycles')
export class Cycle extends Basic {
  @Column({
    length: 30,
  })
  title: string;

  @Column({
    length: 300,
    nullable: true,
  })
  description: string;

  @OneToMany('Talk', (talk: Talk) => talk.cycle)
  talks: Talk[];

  @Column()
  projectId: string;

  @ManyToOne('Project', (project: Project) => project.cycles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: Project;

  @Column({ default: 0, name: 'view_count' })
  viewCount: number;
}
