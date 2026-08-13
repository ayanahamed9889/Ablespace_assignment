import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasks: Repository<Task>,
  ) {}

  findAllForUser(userId: string) {
    return this.tasks.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneForUser(id: string, userId: string): Promise<Task> {
    const task = await this.tasks.findOne({ where: { id, userId } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  create(dto: CreateTaskDto, userId: string) {
    const task = this.tasks.create({ ...dto, userId });
    return this.tasks.save(task);
  }

  async update(id: string, dto: UpdateTaskDto, userId: string) {
    const task = await this.findOneForUser(id, userId);
    Object.assign(task, dto);
    return this.tasks.save(task);
  }

  async remove(id: string, userId: string) {
    const task = await this.findOneForUser(id, userId);
    await this.tasks.remove(task);
    return { id };
  }
}
