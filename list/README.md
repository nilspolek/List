# Task List Application

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. This application allows users to create, manage, and track their tasks with a clean and intuitive interface.

## Features

- 🔐 **User Authentication**
  - Secure login and registration system
  - User profile with avatar display
  - Persistent sessions using cookies

- 📝 **Task Management**
  - Create tasks with captions and detailed descriptions
  - Mark tasks as complete/incomplete
  - Edit existing tasks
  - Delete tasks
  - Responsive grid layout for task display

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design for all screen sizes
  - Modal dialogs for task creation
  - Dropdown menus for task actions
  - Visual feedback for task status

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Authentication**: Custom service with cookie-based sessions
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or higher)
- Node.js (v14 or higher) - Required for some dependencies

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-list
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Authentication

1. **Registration**
   - Click "Don't have an account? Register"
   - Fill in your first name, last name, email, and password
   - Click "Register" to create your account

2. **Login**
   - Enter your email and password
   - Click "Login" to access your tasks

### Managing Tasks

1. **Creating a Task**
   - Click the "Add Task" button
   - Enter a caption and description
   - Click "Add Task" to create

2. **Task Actions**
   - Click the three dots menu on any task to:
     - Mark as done/undone
     - Edit task details
     - Delete the task

## Project Structure

```
src/
├── components/
│   ├── TaskList.tsx      # Main task management component
│   ├── Login.tsx         # Login form component
│   ├── Register.tsx      # Registration form component
│   └── ui/              # Reusable UI components
├── services/
│   ├── taskService.ts   # Task management logic
│   └── userService.ts   # User authentication logic
└── App.tsx              # Main application component
```

## Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run type-check` - Run TypeScript type checking

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
