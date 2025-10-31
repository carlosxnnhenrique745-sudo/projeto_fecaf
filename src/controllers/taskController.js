const Task = require('../models/Task');

// Controlador para gerenciar operações de tarefas
const taskController = {
  // Listar todas as tarefas
  getAllTasks: (req, res) => {
    const tasks = Task.findAll();
    res.json(tasks);
  },

  // Obter uma tarefa específica
  getTaskById: (req, res) => {
    const task = Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(task);
  },

  // Criar uma nova tarefa
  createTask: (req, res) => {
    const { title, description, status, priority } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'O título da tarefa é obrigatório' });
    }
    
    const newTask = Task.create({ title, description, status, priority });
    res.status(201).json(newTask);
  },

  // Atualizar uma tarefa existente
  updateTask: (req, res) => {
    const updatedTask = Task.update(req.params.id, req.body);
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.json(updatedTask);
  },

  // Excluir uma tarefa
  deleteTask: (req, res) => {
    const deleted = Task.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.status(204).end();
  }
};

module.exports = taskController;