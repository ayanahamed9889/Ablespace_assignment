import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// All fields optional for PATCH-style partial updates (e.g. just dragging
// a card to a new column only sends { status }).
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
