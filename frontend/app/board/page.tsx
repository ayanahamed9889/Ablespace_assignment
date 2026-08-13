'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Task, TaskStatus, CreateTaskInput } from '@/types/task';
import { Navbar } from '@/components/Navbar';
import { TaskColumn } from '@/components/TaskColumn';
import { TaskModal } from '@/components/TaskModal';
import { Plus } from 'lucide-react';

const COLUMNS: { status: TaskStatus; title: string }[] = [
  { status: 'TODO', title: 'To Do' },
  { status: 'IN_PROGRESS', title: 'In Progress' },
  { status: 'DONE', title: 'Done' },
];

export default function BoardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [userName, setUserName] = useState<string>();

  const loadTasks = useCallback(async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch {
      // Token missing/invalid (e.g. backend restarted and lost the guest
      // row) - send the user back to get a fresh guest session.
      localStorage.removeItem('ablespace_token');
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('ablespace_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    setUserName(localStorage.getItem('ablespace_name') || undefined);
    loadTasks();
  }, [loadTasks, router]);

  const handleSave = async (input: CreateTaskInput) => {
    if (editing) {
      const updated = await api.updateTask(editing.id, input);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      const created = await api.createTask(input);
      setTasks((prev) => [created, ...prev]);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDrop = async (status: TaskStatus, id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === status) return;
    // Optimistic update so the drag feels instant, then sync with the API.
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    try {
      await api.updateTask(id, { status });
    } catch {
      loadTasks(); // revert to server state on failure
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 font-mono text-xs text-ink/40 dark:text-paper/40">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
        loading your board…
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar userName={userName} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Your board</h1>
            <p className="mt-0.5 font-mono text-[11px] text-ink/35 dark:text-paper/35">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600
                       px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            <Plus size={15} strokeWidth={2.5} />
            New task
          </button>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-5 sm:overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <TaskColumn
              key={col.status}
              status={col.status}
              title={col.title}
              tasks={tasks.filter((t) => t.status === col.status)}
              onEdit={(task) => {
                setEditing(task);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </main>

      <TaskModal
        open={modalOpen}
        initial={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
