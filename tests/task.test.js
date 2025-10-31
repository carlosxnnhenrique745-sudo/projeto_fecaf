const Task = require('../src/models/Task');

// Limpar o estado do modelo antes de cada teste
beforeEach(() => {
  Task.tasks = [];
  Task.nextId = 1;
});

describe('Task Model', () => {
  // Teste de criação de tarefa
  test('Deve criar uma nova tarefa com valores padrão', () => {
    const newTask = Task.create({ title: 'Tarefa de teste' });
    
    expect(newTask).toHaveProperty('id', 1);
    expect(newTask).toHaveProperty('title', 'Tarefa de teste');
    expect(newTask).toHaveProperty('status', 'pendente');
    expect(newTask).toHaveProperty('priority', 'média');
    expect(newTask).toHaveProperty('createdAt');
    expect(newTask).toHaveProperty('updatedAt');
  });

  // Teste de listagem de tarefas
  test('Deve listar todas as tarefas', () => {
    Task.create({ title: 'Tarefa 1' });
    Task.create({ title: 'Tarefa 2' });
    
    const tasks = Task.findAll();
    
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Tarefa 1');
    expect(tasks[1].title).toBe('Tarefa 2');
  });

  // Teste de busca por ID
  test('Deve encontrar uma tarefa pelo ID', () => {
    const task1 = Task.create({ title: 'Tarefa 1' });
    const task2 = Task.create({ title: 'Tarefa 2' });
    
    const foundTask = Task.findById(task2.id);
    
    expect(foundTask).toEqual(task2);
  });

  // Teste de atualização de tarefa
  test('Deve atualizar uma tarefa existente', () => {
    const task = Task.create({ 
      title: 'Tarefa original', 
      description: 'Descrição original',
      status: 'pendente',
      priority: 'baixa'
    });
    
    const updatedTask = Task.update(task.id, { 
      title: 'Tarefa atualizada',
      status: 'em_andamento'
    });
    
    expect(updatedTask.title).toBe('Tarefa atualizada');
    expect(updatedTask.description).toBe('Descrição original');
    expect(updatedTask.status).toBe('em_andamento');
    expect(updatedTask.priority).toBe('baixa');
  });

  // Teste de exclusão de tarefa
  test('Deve excluir uma tarefa existente', () => {
    const task = Task.create({ title: 'Tarefa para excluir' });
    
    const result = Task.delete(task.id);
    const tasks = Task.findAll();
    
    expect(result).toBe(true);
    expect(tasks).toHaveLength(0);
  });

  // Teste de tentativa de atualização de tarefa inexistente
  test('Deve retornar null ao tentar atualizar uma tarefa inexistente', () => {
    const result = Task.update(999, { title: 'Tarefa inexistente' });
    
    expect(result).toBeNull();
  });

  // Teste de tentativa de exclusão de tarefa inexistente
  test('Deve retornar false ao tentar excluir uma tarefa inexistente', () => {
    const result = Task.delete(999);
    
    expect(result).toBe(false);
  });
});