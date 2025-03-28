import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('An email is in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return this.usersService.create(email, result);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }
}
