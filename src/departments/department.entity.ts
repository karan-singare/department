import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  deptId: number;

  @Column()
  deptName: string;
}
