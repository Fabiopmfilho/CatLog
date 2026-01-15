import { Calendar, Clock, StickyNote, ListChecks } from "lucide-react";
import styles from "./ReminderCard.module.css";
import { Reminder } from "../App";

type Props = {
  reminder: Reminder;
  onClick: () => void;
  onToggleItem?: (itemId: string) => void;
};

const ReminderCard = ({ reminder, onClick, onToggleItem }: Props) => {
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

  const { dateStr, timeStr, isPast } = formatDateTime(reminder.datetime);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    onClick();
  };

  return (
    <div
      className={`${styles.card} ${isPast ? styles.cardPast : ""}`}
      onClick={handleCardClick}
    >
      <div className={styles.content}>
        <div className={styles.typeIcon}>
          {reminder.type === "note" ? (
            <StickyNote size={20} color="#2563EB" />
          ) : (
            <ListChecks size={20} color="#9333EA" />
          )}
        </div>

        <div className={styles.info}>
          <p className={`${styles.text} ${isPast ? styles.textPast : ""}`}>
            {reminder.text}
          </p>

          {reminder.type === "list" && reminder.items && (
            <div className={styles.listPreview}>
              {reminder.items.slice(0, 3).map((item) => (
                <label key={item.id} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onToggleItem?.(item.id)}
                    className={styles.checkbox}
                  />
                  <span className={item.checked ? styles.checkedText : ""}>
                    {item.text}
                  </span>
                </label>
              ))}
              {reminder.items.length > 3 && (
                <p className={styles.moreItems}>
                  +{reminder.items.length - 3} itens
                </p>
              )}
            </div>
          )}

          <div className={styles.meta}>
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
            {isPast && <span className={styles.badge}>Vencido</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
