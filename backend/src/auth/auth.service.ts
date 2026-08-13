import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  // Creates a brand new guest user with a random token every time it's
  // called - matches the "Guest Login" requirement (one click and you're in).
  async guestLogin(): Promise<User> {
    const guestNumber = Math.floor(1000 + Math.random() * 9000);
    const user = this.users.create({
      name: `Guest ${guestNumber}`,
      isGuest: true,
      token: uuid(),
    });
    return this.users.save(user);
  }

  async validateToken(token: string): Promise<User> {
    const user = await this.users.findOne({ where: { token } });
    if (!user) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    return user;
  }
}
