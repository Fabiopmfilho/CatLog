import { useEffect, useState } from "react";

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

  function addReminder() {
    setReminders([...reminders, { id: crypto.randomUUID(), text, datetime }]);
    setText("");
    setDatetime("");
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Lembretes</h1>

      <input
        placeholder="Lembrete"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />

      <button onClick={addReminder}>Adicionar</button>

      <ul>
        {reminders.map((r) => (
          <li key={r.id}>
            {r.text} — {r.datetime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
