import { Calendar, Clock, StickyNote, ListChecks, Check } from "lucide-react";
import styles from "./ReminderCard.module.css";
import { Reminder } from "../App";

type Props = {
  reminder: Reminder;
  onClick: () => void;
  onToggleComplete: () => void;
  onToggleItem?: (itemId: string) => void;
};

const ReminderCard = ({
  reminder,
  onClick,
  onToggleComplete,
  onToggleItem,
}: Props) => {
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

  const datetimeInfo = reminder.datetime
    ? formatDateTime(reminder.datetime)
    : null;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('input[type="checkbox"]') ||
      target.closest(`.${styles.completeButton}`)
    ) {
      return;
    }
    onClick();
  };

  const handleCompleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete();
  };

  return (
    <div
      className={`${styles.card} ${
        datetimeInfo?.isPast ? styles.cardPast : ""
      } ${reminder.completed ? styles.cardCompleted : ""}`}
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
          <p
            className={`${styles.text} ${
              datetimeInfo?.isPast ? styles.textPast : ""
            } ${reminder.completed ? styles.textCompleted : ""}`}
          >
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
            {reminder.datetime && (
              <>
                <span
                  className={`${styles.metaItem} ${
                    datetimeInfo?.isPast ? styles.metaItemPast : ""
                  }`}
                >
                  <Calendar size={14} />
                  <span>{datetimeInfo?.dateStr}</span>
                </span>
                <span
                  className={`${styles.metaItem} ${
                    datetimeInfo?.isPast ? styles.metaItemPast : ""
                  }`}
                >
                  <Clock size={14} />
                  <span>{datetimeInfo?.timeStr}</span>
                </span>
                {datetimeInfo?.isPast && !reminder.completed && (
                  <span className={styles.badge}>Vencido</span>
                )}
              </>
            )}
            {reminder.completed && (
              <span className={styles.badgeCompleted}>Concluído</span>
            )}
          </div>
        </div>

        <button
          onClick={handleCompleteClick}
          className={`${styles.completeButton} ${
            reminder.completed ? styles.completeButtonActive : ""
          }`}
          title={
            reminder.completed
              ? "Marcar como pendente"
              : "Marcar como concluído"
          }
        >
          <Check size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReminderCard;
