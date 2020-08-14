import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = this.create(authCredentialsDto);
    try {
      await user.save();
    } catch (err) {
      // duplicate username
      if (err.code === '23505') {
        throw new ConflictException('Username already exists!');
      }
      throw err;
    }
  }
}
