// Gerenciador de Tarefas - Lógica do Frontend

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const taskForm = document.getElementById('taskForm');
    const tasksContainer = document.getElementById('tasks');
    const filterStatus = document.getElementById('filterStatus');
    const filterPriority = document.getElementById('filterPriority');
    
    // URL base da API
    const API_URL = '/api/tasks';
    
    // Carregar tarefas ao iniciar
    loadTasks();
    
    // Event Listeners
    taskForm.addEventListener('submit', handleFormSubmit);
    filterStatus.addEventListener('change', applyFilters);
    filterPriority.addEventListener('change', applyFilters);
    
    // Funções
    async function loadTasks() {
        try {
            const response = await fetch(API_URL);
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            showMessage('Erro ao carregar tarefas. Tente novamente mais tarde.', 'error');
        }
    }
    
    function renderTasks(tasks) {
        tasksContainer.innerHTML = '';
        
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p class="no-tasks">Nenhuma tarefa encontrada.</p>';
            return;
        }
        
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = `task-card priority-${task.priority}`;
            taskCard.dataset.id = task.id;
            taskCard.dataset.status = task.status;
            taskCard.dataset.priority = task.priority;
            
            taskCard.innerHTML = `
                <h4>${task.title}</h4>
                <p>${task.description || 'Sem descrição'}</p>
                <div class="task-meta">
                    <span class="status-badge status-${task.status}">${formatStatus(task.status)}</span>
                    <span>Prioridade: ${task.priority}</span>
                </div>
                <div class="task-actions">
                    <button class="btn btn-primary btn-edit" data-id="${task.id}">Editar</button>
                    <button class="btn btn-danger btn-delete" data-id="${task.id}">Excluir</button>
                </div>
            `;
            
            tasksContainer.appendChild(taskCard);
            
            // Adicionar event listeners para os botões
            taskCard.querySelector('.btn-edit').addEventListener('click', () => editTask(task));
            taskCard.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));
        });
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(taskForm);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            status: formData.get('status'),
            priority: formData.get('priority')
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
            
            if (!response.ok) {
                throw new Error('Erro ao criar tarefa');
            }
            
            const newTask = await response.json();
            taskForm.reset();
            loadTasks();
            showMessage('Tarefa criada com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            showMessage('Erro ao criar tarefa. Tente novamente.', 'error');
        }
    }
    
    async function editTask(task) {
        // Preencher o formulário com os dados da tarefa
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description || '';
        document.getElementById('status').value = task.status;
        document.getElementById('priority').value = task.priority;
        
        // Alterar o formulário para modo de edição
        const submitBtn = taskForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Atualizar Tarefa';
        
        // Remover o listener de evento anterior
        taskForm.removeEventListener('submit', handleFormSubmit);
        
        // Adicionar novo listener para atualização
        taskForm.addEventListener('submit', async function updateHandler(e) {
            e.preventDefault();
            
            const formData = new FormData(taskForm);
            const updatedTaskData = {
                title: formData.get('title'),
                description: formData.get('description'),
                status: formData.get('status'),
                priority: formData.get('priority')
            };
            
            try {
                const response = await fetch(`${API_URL}/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTaskData)
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao atualizar tarefa');
                }
                
                taskForm.reset();
                submitBtn.textContent = 'Adicionar Tarefa';
                
                // Restaurar o comportamento original do formulário
                taskForm.removeEventListener('submit', updateHandler);
                taskForm.addEventListener('submit', handleFormSubmit);
                
                loadTasks();
                showMessage('Tarefa atualizada com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao atualizar tarefa:', error);
                showMessage('Erro ao atualizar tarefa. Tente novamente.', 'error');
            }
        });
    }
    
    async function deleteTask(id) {
        if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Erro ao excluir tarefa');
            }
            
            loadTasks();
            showMessage('Tarefa excluída com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            showMessage('Erro ao excluir tarefa. Tente novamente.', 'error');
        }
    }
    
    function applyFilters() {
        const statusFilter = filterStatus.value;
        const priorityFilter = filterPriority.value;
        
        const taskCards = document.querySelectorAll('.task-card');
        
        taskCards.forEach(card => {
            const matchesStatus = !statusFilter || card.dataset.status === statusFilter;
            const matchesPriority = !priorityFilter || card.dataset.priority === priorityFilter;
            
            if (matchesStatus && matchesPriority) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function formatStatus(status) {
        const statusMap = {
            'pendente': 'Pendente',
            'em_andamento': 'Em Andamento',
            'concluido': 'Concluído'
        };
        
        return statusMap[status] || status;
    }
    
    function showMessage(message, type = 'info') {
        // Implementação simples de notificação
        alert(message);
    }
});