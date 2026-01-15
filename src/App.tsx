import { useEffect, useState } from "react";
import { Plus, Calendar } from "lucide-react";
import styles from "./App.module.css";
import ReminderCard from "./components/ReminderCard";
import EditModal from "./components/EditModal";

export type Reminder = {
  id: string;
  text: string;
  datetime: string;
};

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [text, setText] = useState("");
  const [datetime, setDatetime] = useState("");
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (!text.trim() || !datetime) return;
    setReminders([...reminders, { id: crypto.randomUUID(), text, datetime }]);
    setText("");
    setDatetime("");
  };

  const updateReminder = (id: string, text: string, datetime: string) => {
    setReminders(
      reminders.map((r) => (r.id === id ? { ...r, text, datetime } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const sortedReminders = [...reminders].sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>catLog</h1>
          <p className={styles.subtitle}>Seus lembretes organizados</p>
        </div>

        <div className={styles.addCard}>
          <div className={styles.formGroup}>
            <label className={styles.label}>O que você precisa lembrar?</label>
            <input
              type="text"
              placeholder="Ex: Reunião com o time"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addReminder()}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Quando?</label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className={styles.input}
            />
          </div>

          <button
            onClick={addReminder}
            disabled={!text.trim() || !datetime}
            className={styles.addButton}
          >
            <Plus size={20} />
            <span>Adicionar Lembrete</span>
          </button>
        </div>

        <div className={styles.remindersList}>
          {sortedReminders.length === 0 ? (
            <div className={styles.emptyState}>
              <Calendar size={48} color="#9CA3AF" />
              <p className={styles.emptyText}>Nenhum lembrete ainda</p>
              <p className={styles.emptySubtext}>
                Adicione seu primeiro lembrete acima
              </p>
            </div>
          ) : (
            sortedReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onClick={() => setEditingReminder(reminder)}
              />
            ))
          )}
        </div>
      </div>

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
