/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DbClientService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: DbClientService) { }
  checkIfUsernameExist(username) {
    return this.prisma.user.findUnique({
      where: {
        username: username,
      }
    })
  }
  async findOne(createAuthDto: CreateAuthDto) {
    if (createAuthDto.password.trim() !== "") {
      try {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: {
            password: createAuthDto.password,
            username: createAuthDto.username,
          }
        })
        return { username: user.username, status: 200 };
      }
      catch (err) {
        const exist = await this.checkIfUsernameExist(createAuthDto.username)
        if (exist)
          return ({ error: { message: "Wrong Password" }, status: 400 })
        return ({ error: { message: "User Not Found" }, status: 400 })
      }
    }
  }


  async create(createUserDto: CreateUserDto) {
    const exist = await this.checkIfUsernameExist(createUserDto.username)
    if (!exist) {
      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          username: createUserDto.username,
        }
      })
      return { username: user.username, status: 200 };
    }
    else return { error: { message: "Username Already Exist" }, status: 400 }
  }


}
