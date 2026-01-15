import { useState } from "react";
import { X, Save, Trash2 } from "lucide-react";
import styles from "./EditModal.module.css";
import { Reminder } from "../App";

type Props = {
  reminder: Reminder;
  onClose: () => void;
  onSave: (id: string, text: string, datetime: string) => void;
  onDelete: (id: string) => void;
};

const EditModal = ({ reminder, onClose, onSave, onDelete }: Props) => {
  const [text, setText] = useState(reminder.text);
  const [datetime, setDatetime] = useState(reminder.datetime);

  const handleSave = () => {
    if (!text.trim() || !datetime) return;
    onSave(reminder.id, text, datetime);
    onClose();
  };

  const handleDelete = () => {
    onDelete(reminder.id);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Editar Lembrete</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.formGroup}>
            <label className={styles.label}>O que você precisa lembrar?</label>
            <input
              type="text"
              placeholder="Ex: Reunião com o time"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.input}
              autoFocus
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
        </div>

        <div className={styles.footer}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            <Trash2 size={18} />
            <span>Deletar</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim() || !datetime}
            className={styles.saveButton}
          >
            <Save size={18} />
            <span>Salvar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
