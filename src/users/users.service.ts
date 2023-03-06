import { ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput, SignInUserInput, UserPayload } from './dtos/users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  /**
   * Signs up
   * @param createUserInput
   * @returns up
   */

  async signUp(createUserInput: CreateUserInput): Promise<Users> {
    try {
      const { name, email, role, password } = createUserInput;
      const userAlreadyExists = await this.usersRepository.findOne({
        where: { email: email.toLowerCase() },
      });

      if (userAlreadyExists) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'User already exists with this email, Please Signin',
        });
      }
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      const userInstance = this.usersRepository.create({ name, email: email?.toLowerCase(), password, roles: role });
      const newUser = await this.usersRepository.save(userInstance);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Signs in
   * @param signInUserInput
   * @returns in
   */

  async signIn(signInUserInput: SignInUserInput): Promise<UserPayload> {
    try {
      const { email, password } = signInUserInput;
      const userInDb = await this.findUserByEmail(email);
      if (!userInDb) {
        throw new HttpException('You dont have account! Please Signup First ', HttpStatus.UNAUTHORIZED);
      }
      const matchedPassword = await bcrypt.compare(password, userInDb.password);
      if (userInDb && matchedPassword) {
        const payload = { email, id: userInDb.id };
        const accesstoken = this.jwtService.sign(payload);
        return {
          accesstoken,
          response: { status: 200, message: 'LogIn Successfull' },
        };
      } else {
        throw new UnauthorizedException('Login Failed');
      }
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: error,
      });
    }
  }

  /**
   * Finds user by email
   * @param email
   * @returns
   */

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });
  }

  /**
   * Verifys users service
   * @param token
   * @returns
   */

  async verify(token: string) {
    try {
      const secret = await this.jwtService.verify(token);
      const usermail = secret.email;
      const userinfo = await this.usersRepository.findOne({
        where: { email: usermail },
      });
      return userinfo;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * Finds user by id
   * @param id
   * @returns user by id
   */
  async findUserById(id: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
