import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    
    if (createUserDto.role !== 'Bronze' && createUserDto.role !== 'Silver' && createUserDto.role !== 'Platinum') {
      throw new HttpException('Role not found', 400);
    }

    const createUser = await this.prisma.user.create({ data: createUserDto });

    return {
      status: 200,
      message: 'Create user successfully',
      data: createUser,
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    const deleteUser = this.prisma.user.delete({ where: { id } });

    return {
      status: 200,
      message: 'Delete user successfully',
      data: deleteUser,
    }
  }
}
