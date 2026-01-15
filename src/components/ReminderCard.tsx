import { Calendar, Clock } from "lucide-react";
import styles from "./ReminderCard.module.css";
import { Reminder } from "../App";

type Props = {
  reminder: Reminder;
  onClick: () => void;
};

const ReminderCard = ({ reminder, onClick }: Props) => {
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

  return (
    <div
      className={`${styles.card} ${isPast ? styles.cardPast : ""}`}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={`${styles.text} ${isPast ? styles.textPast : ""}`}>
            {reminder.text}
          </p>
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
