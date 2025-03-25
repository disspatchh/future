import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Basic } from '../../common/entities/base.entity';
import type { Cycle } from '../../cycles/entities/cycle.entity';

@Entity('talks')
export class Talk extends Basic {
  @Column({
    unique: true,
    length: 30,
  })
  title: string;

  @Column({
    length: 300,
    nullable: true,
  })
  description: string;

  @Column({
    length: 70000,
    nullable: true,
  })
  content: string;

  @Column()
  cycleId: string;

  @ManyToOne('Cycle', (cycle: Cycle) => cycle.talks, { onDelete: 'SET NULL' })
  @JoinColumn()
  cycle: Cycle;

  @Column({ default: 0, name: 'view_count' })
  viewCount: number;
}
