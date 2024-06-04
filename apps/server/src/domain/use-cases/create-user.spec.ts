import { compare } from 'bcrypt';
import { RegisterUserUseCase } from './create-user';
import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;

let sut: RegisterUserUseCase;

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new RegisterUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.user).toBeTruthy();
    expect(result).toEqual({
      user: inMemoryUsersRepository.items[0],
    });
  });

  it('should hash user password upon registration', async () => {
    const password = '123456';

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password,
    });

    expect(result.user).toBeTruthy();
    expect(
      compare(password, inMemoryUsersRepository.items[0].password),
    ).toBeTruthy();
  });
});
