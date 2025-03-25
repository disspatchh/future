import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
      findByEmail: () =>
        Promise.resolve({
          id: 'cfae071d-8f03-4af1-a9e2-010c2d3644cf',
          email: 'test@mail.ru',
          password: '12345',
        } as User),
      create: (email: string, password: string) =>
        Promise.resolve({
          id: 'cfae071d-8f03-4af1-a9e2-010c2d3644cf',
          email,
          password,
        } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
});
