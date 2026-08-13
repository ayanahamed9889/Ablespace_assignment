import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SessionGuard } from '../auth/guards/session.guard';
import { User } from '../auth/entities/user.entity';

// Every route here requires a valid guest session token - a user only
// ever sees and edits their own tasks (see TasksService, filtered by userId).
@Controller('tasks')
@UseGuards(SessionGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Req() req: Request & { user: User }) {
    return this.tasksService.findAllForUser(req.user.id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req: Request & { user: User }) {
    return this.tasksService.create(dto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: Request & { user: User },
  ) {
    return this.tasksService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: User }) {
    return this.tasksService.remove(id, req.user.id);
  }
}
