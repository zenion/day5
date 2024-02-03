import fs from 'fs'
import select from '@inquirer/select'
import expand from '@inquirer/expand'
import input from '@inquirer/input'

export interface Task {
  id: number
  name: string
  done: boolean
}

export interface TodoDatabase {
  nextId: number
  tasks: Task[]
}

export class TodoApp {
  db: TodoDatabase

  /**
   * This is a todo app class
   */
  constructor() {
    this.db = this.#readDatabase()
  }

  #readDatabase(): TodoDatabase {
    let db = JSON.parse(fs.readFileSync('./database.json', 'utf8'))
    return db
  }

  #writeDatabase() {
    fs.writeFileSync('./database.json', JSON.stringify(this.db, null, 2))
  }

  getTaskById(taskId: number): Task {
    const foundTask = this.db.tasks.find((e) => e.id === taskId)
    if (!foundTask) throw new Error(`Task with ID: ${taskId} does not exist in database`)
    return foundTask
  }

  /**
   * adds a task to the task database
   * @param taskName a cool name for your task
   */
  addTask(taskName: string) {
    this.db.tasks.push({
      id: this.db.nextId++,
      name: taskName,
      done: false,
    })
    this.#writeDatabase()
  }

  updateTask(task: Task) {
    const foundTask = this.db.tasks.find((e) => e.id === task.id)
    if (!foundTask) throw new Error(`Task with ID: ${task.id} does not exist in database`)

    foundTask.name = task.name
    foundTask.done = task.done
    this.#writeDatabase()
    return task
  }

  deleteTask(taskId: number) {
    const taskIdx = this.db.tasks.findIndex((e) => e.id === taskId)
    if (taskIdx === -1) throw new Error(`Task with ID: ${taskId} does not exist in database`)
    this.db.tasks.splice(taskIdx, 1)
    this.#writeDatabase()
  }

  getTaskByName(taskName: string): Task {
    const foundTask = this.db.tasks.find((e) => e.name === taskName)
    if (!foundTask) throw new Error(`Task with name: ${taskName} does not exist in database`)
    return foundTask
  }

  async printTasks() {
    // for (let task of this.db.tasks) {
    //   console.log(`${task.id} - Task: ${task.name} -- complete: ${task.done ? '✅' : '❌'}`)
    // }

    let choicesArray: any = []
    for (let task of this.db.tasks) {
      choicesArray.push({
        name: task.name,
        value: task,
        description: `Current task status${task.done ? '✅' : '❌'}`,
      })
    }

    const task = await select<Task>({
      message: 'Select a task',
      choices: choicesArray,
    })

    const action = await expand({
      message: 'Press the enter key to toggle the task status',
      default: 't',
      expanded: true,
      choices: [
        {
          key: 't',
          name: 'Toggle task status',
          value: 'toggle',
        },
        {
          key: 'e',
          name: 'Edit task name',
          value: 'edit',
        },
      ],
    })
    if (action === 'toggle') {
      task.done = !task.done
      this.#writeDatabase()
    } else if ('edit') {
      const answer = await input({ message: 'Enter a new task name :', default: task.name })
      task.name = answer
      this.#writeDatabase()
    }
    // console.log(task)
  }
}
