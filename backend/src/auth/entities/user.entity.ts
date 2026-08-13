import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Guest' })
  name: string;

  // Every login in this assessment is a guest login (per the requirements),
  // but the flag is here so real email/password auth can be added later
  // without changing the Task ownership model.
  @Column({ default: true })
  isGuest: boolean;

  // Simple bearer token issued on guest login. Not a JWT on purpose -
  // there's nothing to encode (no roles/claims) and it keeps the guest
  // flow trivial to read end-to-end. Swap for JWT if real auth is added.
  @Column({ unique: true })
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}
