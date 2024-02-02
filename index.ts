// Assignment: Build a Simple To-Do List Application
// Objectives:
// Understand and use loops, functions, and variables.
// Learn to read from and write to JSON files for saving the state of the application.

// Application Features:
// Add a Task: User can add a new task to the list.
// View Tasks: User can view all the tasks in the list.
// Mark Task as Done: User can mark a task as completed.
// Delete a Task: User can delete a task from the list.
// Save to File: The state of the to-do list is saved to a JSON file whenever a task is added, marked done, or deleted.
// Load from File: On starting the application, it should load existing tasks from the JSON file.

// Implementation Details:
// Variables: Use variables to store user input, the to-do list, etc.
// Loops: Use loops for menu selection and iterating over tasks.
// Functions: Implement each feature (add, view, mark done, delete) as separate functions.
// JSON File Operations: Use JSON to save and load the state of the to-do list.

import { TodoApp } from './todoapp'

const todos = new TodoApp()

todos.addTask('i cant think of task names!')
todos.printTasks()
