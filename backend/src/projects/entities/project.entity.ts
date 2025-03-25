import { Entity, Column, OneToMany } from 'typeorm';
import { Basic } from '../../common/entities/base.entity';
import type { Cycle } from '../../cycles/entities/cycle.entity';

@Entity('projects')
export class Project extends Basic {
  @Column({
    unique: true,
    length: 30,
  })
  title: string;

  @Column({
    length: 300,
  })
  description: string;

  @Column({ default: 0, name: 'view_count' })
  viewCount: number;

  @OneToMany('Cycle', (cycle: Cycle) => cycle.project)
  cycles: Cycle[];
}
