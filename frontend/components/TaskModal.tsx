'use client';

import { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus, CreateTaskInput } from '@/types/task';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  open: boolean;
  initial?: Task | null;
  onClose: () => void;
  onSave: (input: CreateTaskInput) => void;
}

const emptyForm: CreateTaskInput = {
  title: '',
  description: '',
  status: 'TODO',
  priority: 'MEDIUM',
  dueDate: undefined,
};

const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'TODO', label: 'To Do', color: 'bg-status-todo' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'bg-status-progress' },
  { value: 'DONE', label: 'Done', color: 'bg-status-done' },
];

const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'LOW', label: 'Low', color: 'bg-priority-low' },
  { value: 'MEDIUM', label: 'Medium', color: 'bg-priority-medium' },
  { value: 'HIGH', label: 'High', color: 'bg-priority-high' },
];

export function TaskModal({ open, initial, onClose, onSave }: Props) {
  const [form, setForm] = useState<CreateTaskInput>(emptyForm);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        description: initial.description,
        status: initial.status,
        priority: initial.priority,
        dueDate: initial.dueDate?.slice(0, 10),
      });
    } else {
      setForm(emptyForm);
    }
  }, [initial, open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-20 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-pop-in rounded-card border border-paper-line
                   bg-white p-6 shadow-2xl dark:border-ink-line dark:bg-ink-soft"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            {initial ? 'Edit task' : 'New task'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink/40 hover:text-ink dark:text-paper/40 dark:hover:text-paper"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.title.trim()) return;
            onSave(form);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-ink/45 dark:text-paper/45">
              Title
            </label>
            <input
              autoFocus
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-paper-line bg-transparent px-3 py-2
                         text-sm outline-none focus:border-brand-500 dark:border-ink-line"
              placeholder="e.g. Write assessment README"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-ink/45 dark:text-paper/45">
              Description
            </label>
            <textarea
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-lg border border-paper-line bg-transparent
                         px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-ink-line"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-ink/45 dark:text-paper/45">
              Status
            </label>
            <div className="mt-1.5 flex gap-1.5">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, status: opt.value })}
                  className={clsx(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                    form.status === opt.value
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200'
                      : 'border-paper-line text-ink/50 hover:border-ink/20 dark:border-ink-line dark:text-paper/50',
                  )}
                >
                  <span className={clsx('h-1.5 w-1.5 rounded-full', opt.color)} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-ink/45 dark:text-paper/45">
              Priority
            </label>
            <div className="mt-1.5 flex gap-1.5">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, priority: opt.value })}
                  className={clsx(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                    form.priority === opt.value
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200'
                      : 'border-paper-line text-ink/50 hover:border-ink/20 dark:border-ink-line dark:text-paper/50',
                  )}
                >
                  <span className={clsx('h-1.5 w-1.5 rounded-full', opt.color)} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-ink/45 dark:text-paper/45">
              Due date
            </label>
            <input
              type="date"
              value={form.dueDate || ''}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-paper-line bg-transparent px-3 py-2
                         font-mono text-sm outline-none focus:border-brand-500 dark:border-ink-line"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink/60
                         hover:bg-black/5 dark:text-paper/60 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 px-4 py-2
                         text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              Save task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
