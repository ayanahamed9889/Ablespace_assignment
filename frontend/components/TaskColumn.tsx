'use client';

import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';
import clsx from 'clsx';

interface Props {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDrop: (status: TaskStatus, id: string) => void;
}

const tabColor: Record<TaskStatus, string> = {
  TODO: 'bg-status-todo',
  IN_PROGRESS: 'bg-status-progress',
  DONE: 'bg-status-done',
};

export function TaskColumn({ status, title, tasks, onEdit, onDelete, onDrop }: Props) {
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) onDrop(status, id);
  };

  return (
    <div className="flex min-w-[270px] flex-1 flex-col sm:min-w-[280px]">
      {/* Signature element: each column reads like a manila folder tab -
          a colored strip that "pokes up" above the column body, echoed by
          the count chip. Ties the whole board to a physical desk-organizer
          feel rather than a generic gray Kanban lane. */}
      <div className="flex items-center gap-2 px-1">
        <span className={clsx('h-2.5 w-2.5 rounded-full', tabColor[status])} />
        <h2 className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink/70 dark:text-paper/70">
          {title}
        </h2>
        <span className="ml-auto font-mono text-[11px] text-ink/35 dark:text-paper/35">
          {tasks.length}
        </span>
      </div>

      <div className={clsx('mt-2 h-[3px] rounded-full', tabColor[status], 'opacity-70')} />

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="mt-3 flex-1 space-y-2.5 rounded-card bg-black/[0.02] p-2.5
                   dark:bg-white/[0.02] min-h-[140px]"
      >
        {tasks.map((task, i) => (
          <div key={task.id} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <TaskCard
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={handleDragStart}
            />
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="py-8 text-center font-mono text-[11px] text-ink/25 dark:text-paper/25">
            — empty —
          </p>
        )}
      </div>
    </div>
  );
}
