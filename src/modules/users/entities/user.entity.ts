import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '100',
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: '50',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '100',
  })
  password: string;
}
