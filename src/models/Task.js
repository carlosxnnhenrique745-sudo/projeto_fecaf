// Modelo de dados para Tarefas
class Task {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  // Criar uma nova tarefa
  create(task) {
    const newTask = {
      id: this.nextId++,
      title: task.title,
      description: task.description,
      status: task.status || 'pendente',
      priority: task.priority || 'média',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // Listar todas as tarefas
  findAll() {
    return this.tasks;
  }

  // Buscar tarefa por ID
  findById(id) {
    return this.tasks.find(task => task.id === parseInt(id));
  }

  // Atualizar uma tarefa
  update(id, updatedTask) {
    const index = this.tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return null;
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updatedTask,
      updatedAt: new Date()
    };
    
    return this.tasks[index];
  }

  // Excluir uma tarefa
  delete(id) {
    const index = this.tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return false;
    
    this.tasks.splice(index, 1);
    return true;
  }
}

module.exports = new Task();