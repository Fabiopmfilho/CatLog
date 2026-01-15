import { useEffect, useState } from "react";
import { Plus, Calendar, Cat } from "lucide-react";
import styles from "./App.module.css";
import ReminderCard from "./components/ReminderCard";
import EditModal from "./components/EditModal";
import CreateModal from "./components/CreateModal";

export type ReminderType = "note" | "list";

export type Reminder = {
  id: string;
  type: ReminderType;
  text: string;
  datetime?: string;
  completed: boolean;
  items?: { id: string; text: string; checked: boolean }[];
};

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (reminder: Omit<Reminder, "id">) => {
    setReminders([...reminders, { ...reminder, id: crypto.randomUUID() }]);
  };

  const updateReminder = (
    id: string,
    updatedReminder: Omit<Reminder, "id">
  ) => {
    setReminders(
      reminders.map((r) => (r.id === id ? { ...updatedReminder, id } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const toggleComplete = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (a.datetime && b.datetime) {
      return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    }

    if (a.datetime) return -1;
    if (b.datetime) return 1;

    return 0;
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            CatLog
            <Cat size={24} color="#2563EB" style={{ marginLeft: 8 }} />
          </h1>
          <p className={styles.subtitle}>Seus lembretes organizados</p>
        </div>

        <div className={styles.remindersList}>
          {sortedReminders.length === 0 ? (
            <div className={styles.emptyState}>
              <Calendar size={48} color="#9CA3AF" />
              <p className={styles.emptyText}>Nenhum lembrete ainda</p>
              <p className={styles.emptySubtext}>
                Clique no botão + para criar seu primeiro lembrete
              </p>
            </div>
          ) : (
            sortedReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onClick={() => setEditingReminder(reminder)}
                onToggleComplete={() => toggleComplete(reminder.id)}
                onToggleItem={(itemId) => {
                  if (reminder.type === "list" && reminder.items) {
                    const updatedItems = reminder.items.map((item) =>
                      item.id === itemId
                        ? { ...item, checked: !item.checked }
                        : item
                    );
                    setReminders(
                      reminders.map((r) =>
                        r.id === reminder.id ? { ...r, items: updatedItems } : r
                      )
                    );
                  }
                }}
              />
            ))
          )}
        </div>
      </div>

      <button
        className={styles.fabButton}
        onClick={() => setIsCreateModalOpen(true)}
        title="Adicionar lembrete"
      >
        <Plus size={28} />
      </button>

      {isCreateModalOpen && (
        <CreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={addReminder}
        />
      )}

      {editingReminder && (
        <EditModal
          reminder={editingReminder}
          onClose={() => setEditingReminder(null)}
          onSave={updateReminder}
          onDelete={deleteReminder}
        />
      )}
    </div>
  );
}

export default App;
