import { useState } from "react";
import { X, Save, Trash2, Plus } from "lucide-react";
import styles from "./EditModal.module.css";
import { Reminder } from "../App";

type Props = {
  reminder: Reminder;
  onClose: () => void;
  onSave: (id: string, updatedReminder: Omit<Reminder, "id">) => void;
  onDelete: (id: string) => void;
};

const EditModal = ({ reminder, onClose, onSave, onDelete }: Props) => {
  const [text, setText] = useState(reminder.text);
  const [datetime, setDatetime] = useState(reminder.datetime);
  const [items, setItems] = useState(reminder.items || []);
  const [newItemText, setNewItemText] = useState("");
  const [hasDatetime, setHasDatetime] = useState(!!reminder.datetime);

  const handleSave = () => {
    if (reminder.type === "note" && !text.trim()) return;
    if (reminder.type === "list" && items.length === 0) return;

    onSave(reminder.id, {
      type: reminder.type,
      text: reminder.type === "note" ? text : `Lista com ${items.length} itens`,
      datetime: hasDatetime ? datetime : undefined,
      completed: reminder.completed,
      items: reminder.type === "list" ? items : undefined,
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete(reminder.id);
    onClose();
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    setItems([
      ...items,
      { id: crypto.randomUUID(), text: newItemText, checked: false },
    ]);
    setNewItemText("");
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
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
          {reminder.type === "note" ? (
            <div className={styles.formGroup}>
              <label className={styles.label}>
                O que você precisa lembrar?
              </label>
              <textarea
                placeholder="Ex: Reunião com o time às 14h"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textarea}
                autoFocus
                rows={4}
              />
            </div>
          ) : (
            <div className={styles.formGroup}>
              <label className={styles.label}>Itens da lista</label>
              <div className={styles.addItemContainer}>
                <input
                  type="text"
                  placeholder="Adicionar item..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyUp={(e) => e.key === "Enter" && addItem()}
                  className={styles.input}
                />
                <button onClick={addItem} className={styles.addItemButton}>
                  <Plus size={20} />
                </button>
              </div>

              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className={styles.checkbox}
                      />
                      <span className={item.checked ? styles.checkedText : ""}>
                        {item.text}
                      </span>
                    </label>
                    <button
                      onClick={() => removeItem(item.id)}
                      className={styles.removeItemButton}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {items.length === 0 && (
                  <p className={styles.emptyItems}>
                    Nenhum item adicionado ainda
                  </p>
                )}
              </div>
            </div>
          )}
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={hasDatetime}
                onChange={(e) => setHasDatetime(e.target.checked)}
                className={styles.toggleCheckbox}
              />
              <span className={styles.toggleText}>Definir data e hora</span>
            </label>
          </div>

          {hasDatetime && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Quando?</label>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className={styles.input}
              />
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            <Trash2 size={18} />
            <span>Deletar</span>
          </button>
          <button
            onClick={handleSave}
            disabled={
              (reminder.type === "note" && !text.trim()) ||
              (reminder.type === "list" && items.length === 0)
            }
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
