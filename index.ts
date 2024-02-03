import { TodoApp } from './todoapp'

const todos = new TodoApp()

// todos.addTask('I cant think of task names!')
while (true) {
  await todos.printTasks()
}

//toggle a task complete (with spacebar)
//navigate with hjkl
//view tasks
//e for edit task description
//pretty table
