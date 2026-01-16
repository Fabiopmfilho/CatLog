# 📝 CatLog

## 🎯 Overview

CatLog is a desktop reminder and task management application built with Electron, React and TypeScript. Allows you to create simple notes or to-do lists, with the option to set date/time, mark as completed and reorder via drag & drop.

## 🛠 Technologies Used

- **Electron** - Framework for creating desktop applications
- **React** - Library for building interfaces
- **TypeScript** - Superset JavaScript with static typing
- **Vite** - Build tool and dev server
- **CSS Modules** - Styling with isolated scope
- **Lucide React** - Icon Library
- **LocalStorage** - Local data persistence

## 📁 Estrutura do Projeto

```
catLog/
├── electron/
│   └── main.ts              # Electron main process
├── src/
│   ├── components/
│   │   ├── CreateModal.tsx          # Reminder creation modal
│   │   ├── CreateModal.module.css   # Create modal styles
│   │   ├── EditModal.tsx            # Reminder editing modal
│   │   ├── EditModal.module.css     # Estilos do modal de edição
│   │   ├── ReminderCard.tsx         # Individual reminder card styles
│   │   └── ReminderCard.module.css  # Edit modal
│   ├── App.tsx                      # Main component
│   ├── App.module.css               # Global app styles
│   └── index.css
├── package.json
└── README.md
```

## ✨ Features

1. Create Reminders

- Two types: Note (free text) or List (checklist)
- Optional date/time (with toggle)
- Floating button (+) in the bottom right corner

2. Edit Reminders

- Click on the card to open the edit modal
- Edit text, date/time and list items
- Delete reminder

3. Mark as Complete

- Circular button with check icon on each card
- Lists are automatically checked off when all items are completed
- Differentiated visual (opacity, crossed out text, green badge)

4. Task Lists

- Add/remove items
- Mark items as completed (checkbox)
- Preview of the first 3 items on the card
- Edit items in the edit modal

5. Reorder by Drag & Drop

- Drag cards to manually reorder
- Grip icon (three bars) indicates drag
- Order saved automatically

6. Visual Indicators

- "Overdue" badge for reminders with a past date
- "Completed" badge for completed tasks
- Different colors (red for expired, green for completed)
- Distinct icons for Note vs List

7. Persistence

- Data automatically saved to LocalStorage
- Card order preserved

## 📊 Types and Interfaces

Reminder

```
export type ReminderType = 'note' | 'list';

export type Reminder = {
  id: string;
  type: ReminderType;
  text: string;
  datetime?: string;        // Optional
  completed: boolean;
  items?: {                 // Only for lists
    id: string;
    text: string;
    checked: boolean;
  }[];
};
```

ListItem

```
typescripttype ListItem = {
  id: string;
  text: string;
  checked: boolean;
};
```

## 💾 Data Storage

## LocalStorage

All reminders are automatically saved to the browser/Electron
localStorage.
Key: `"reminders"`

Format:

```json
[
  {
    "id": "uuid-123",
    "type": "note",
    "text": "Meeting at 2pm",
    "datetime": "2025-01-20T14:00",
    "completed": false
  },
  {
    "id": "uuid-456",
    "type": "list",
    "text": "List with 3 items",
    "datetime": undefined,
    "completed": false,
    "items": [
      { "id": "item-1", "text": "Buy milk", "checked": true },
      { "id": "item-2", "text": "Pay bill", "checked": false }
    ]
  }
]
```

## 🚀 How to Execute

Prerequisites

Node.js 18+
npm or yarn

Installation

```bash
# Clone the repository
git clone <repo-url>
cd cat-log

# Install dependencies
npm install
```

Development

```bash
# Run the app in dev mode
npm run dev
```

Build

```bash
# Generate executable
npm run build

# Executables will be in /dist
```

## 📝 Funcionalidades Futuras (Sugestões)

- 🔔 System notifications when reminder is due
- 🎨 Colors/tags to categorize reminders
- 🌙 Dark Mode
- 📊 Statistics (tasks completed per week)
- 🗂️ Organization by categories/folders
- ⌨️ Keyboard shortcuts

## 📄 License

MIT License - Feel free to use and modify!
