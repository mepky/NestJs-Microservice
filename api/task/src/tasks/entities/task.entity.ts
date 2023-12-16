import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ nullable: true })
  userEmail: string;

  @Column({ default: false })
  completion: boolean;

  @Column()
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
