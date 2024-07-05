import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const newAuth = new this.authModel(createAuthDto);
    return newAuth.save();
  }

  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  async findOne(id: string): Promise<Auth> {
    const auth = await this.authModel.findById(id).exec();
    if (!auth) {
      throw new NotFoundException(`Auth with id ${id} not found`);
    }
    return auth;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    const auth = await this.authModel.findByIdAndUpdate(id, updateAuthDto, { new: true }).exec();
    if (!auth) {
      throw new NotFoundException(`Auth with id ${id} not found`);
    }
    return auth;
  }

  async remove(id: string): Promise<Auth> {
    const auth = await this.authModel.findByIdAndDelete(id).exec();
    if (!auth) {
      throw new NotFoundException(`Auth with id ${id} not found`);
    }
    return auth;
  }
}
