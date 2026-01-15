import { useEffect, useState } from "react";
import { Plus, Trash2, Calendar, Clock } from "lucide-react";
import styles from "./App.module.css";

type Reminder = {
  id: string;
  text: string;
  datetime: string;
};

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [text, setText] = useState("");
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    setReminders([...reminders, { id: crypto.randomUUID(), text, datetime }]);
    setText("");
    setDatetime("");
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    const now = new Date();
    const isPast = date < now;

    const dateStr = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });

    const timeStr = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { dateStr, timeStr, isPast };
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
            sortedReminders.map((r) => {
              const { dateStr, timeStr, isPast } = formatDateTime(r.datetime);

              return (
                <div
                  key={r.id}
                  className={`${styles.reminderCard} ${
                    isPast ? styles.reminderCardPast : ""
                  }`}
                >
                  <div className={styles.reminderContent}>
                    <div className={styles.reminderInfo}>
                      <p
                        className={`${styles.reminderText} ${
                          isPast ? styles.reminderTextPast : ""
                        }`}
                      >
                        {r.text}
                      </p>
                      <div className={styles.reminderMeta}>
                        <span
                          className={`${styles.metaItem} ${
                            isPast ? styles.metaItemPast : ""
                          }`}
                        >
                          <Calendar size={14} />
                          <span>{dateStr}</span>
                        </span>
                        <span
                          className={`${styles.metaItem} ${
                            isPast ? styles.metaItemPast : ""
                          }`}
                        >
                          <Clock size={14} />
                          <span>{timeStr}</span>
                        </span>
                        {isPast && (
                          <span className={styles.badge}>Vencido</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteReminder(r.id)}
                      className={styles.deleteButton}
                      title="Deletar lembrete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
