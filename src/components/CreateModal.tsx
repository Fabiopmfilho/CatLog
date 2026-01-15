import { useState } from "react";
import { X, Save, StickyNote, ListChecks, Plus, Trash2 } from "lucide-react";
import styles from "./CreateModal.module.css";
import { Reminder, ReminderType } from "../App";

type ListItem = { id: string; text: string; checked: boolean };

type Props = {
  onClose: () => void;
  onSave: (reminder: Omit<Reminder, "id">) => void;
};

const CreateModal = ({ onClose, onSave }: Props) => {
  const [type, setType] = useState<ReminderType>("note");
  const [text, setText] = useState("");
  const [hasDatetime, setHasDatetime] = useState(false);
  const [datetime, setDatetime] = useState("");
  const [items, setItems] = useState<ListItem[]>([]);
  const [newItemText, setNewItemText] = useState("");

  const handleSave = () => {
    if (type === "note" && !text.trim()) return;
    if (type === "list" && items.length === 0) return;

    onSave({
      type,
      text: type === "note" ? text : `Lista com ${items.length} itens`,
      datetime: hasDatetime ? datetime : undefined,
      completed: false,
      items: type === "list" ? items : undefined,
    });
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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Novo Lembrete</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.typeSelector}>
            <button
              className={`${styles.typeButton} ${
                type === "note" ? styles.typeButtonActive : ""
              }`}
              onClick={() => setType("note")}
            >
              <StickyNote size={20} />
              <span>Nota</span>
            </button>
            <button
              className={`${styles.typeButton} ${
                type === "list" ? styles.typeButtonActive : ""
              }`}
              onClick={() => setType("list")}
            >
              <ListChecks size={20} />
              <span>Lista</span>
            </button>
          </div>

          {type === "note" ? (
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
                {items.map((item: ListItem) => (
                  <div key={item.id} className={styles.item}>
                    <span className={styles.itemText}>{item.text}</span>
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
                onClick={(e) => e.stopPropagation()}
                className={styles.toggleCheckbox}
              />
              <span
                className={styles.toggleText}
                onClick={(e) => e.stopPropagation()}
              >
                Definir data e hora?
              </span>
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
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={
              (type === "note" && !text.trim()) ||
              (type === "list" && items.length === 0)
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

export default CreateModal;
