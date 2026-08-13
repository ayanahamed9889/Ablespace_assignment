'use client';

import { Task } from '@/types/task';
import { X } from 'lucide-react';
import clsx from 'clsx';

const priorityColor: Record<Task['priority'], string> = {
  LOW: 'bg-priority-low',
  MEDIUM: 'bg-priority-medium',
  HIGH: 'bg-priority-high',
};

const priorityText: Record<Task['priority'], string> = {
  LOW: 'text-priority-low',
  MEDIUM: 'text-priority-medium',
  HIGH: 'text-priority-high',
};

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onDragStart }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onEdit(task)}
      className="group relative flex cursor-grab overflow-hidden rounded-card border
                 border-paper-line bg-white shadow-card transition-all
                 hover:-translate-y-0.5 hover:shadow-cardHover active:cursor-grabbing
                 dark:border-ink-line dark:bg-ink-soft"
    >
      {/* Signature element: a colored priority "spine" on every card,
          like a tabbed folder - color is legible even at a glance across
          a full board without reading each badge. */}
      <div className={clsx('w-1 shrink-0', priorityColor[task.priority])} />

      <div className="flex-1 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[13.5px] font-medium leading-snug">{task.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            aria-label="Delete task"
            className="shrink-0 text-ink/25 opacity-0 transition-opacity
                       hover:text-priority-high group-hover:opacity-100 dark:text-paper/25"
          >
            <X size={15} />
          </button>
        </div>

        {task.description && (
          <p className="mt-1 line-clamp-2 text-[12px] text-ink/50 dark:text-paper/50">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className={clsx('font-mono text-[10.5px] font-medium uppercase tracking-wide', priorityText[task.priority])}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="font-mono text-[10.5px] text-ink/35 dark:text-paper/35">
              {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
