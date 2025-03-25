import { Entity, Column } from 'typeorm';
import { Basic } from '../../common/entities/base.entity';

@Entity('users')
export class User extends Basic {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
