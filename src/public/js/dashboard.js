// Dashboard - Lógica do Frontend

document.addEventListener('DOMContentLoaded', () => {
    // URL base da API
    const API_URL = '/api/tasks';
    
    // Carregar dados ao iniciar
    loadDashboardData();
    
    async function loadDashboardData() {
        try {
            const response = await fetch(API_URL);
            const tasks = await response.json();
            
            updateMetrics(tasks);
            createStatusChart(tasks);
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        }
    }
    
    function updateMetrics(tasks) {
        // Contadores por status
        const totalTasks = tasks.length;
        const pendingTasks = tasks.filter(task => task.status === 'pendente').length;
        const inProgressTasks = tasks.filter(task => task.status === 'em_andamento').length;
        const completedTasks = tasks.filter(task => task.status === 'concluido').length;
        
        // Contadores por prioridade
        const highPriority = tasks.filter(task => task.priority === 'alta').length;
        const mediumPriority = tasks.filter(task => task.priority === 'média').length;
        const lowPriority = tasks.filter(task => task.priority === 'baixa').length;
        
        // Atualizar elementos do DOM
        document.getElementById('total-tasks').textContent = totalTasks;
        document.getElementById('pending-tasks').textContent = pendingTasks;
        document.getElementById('in-progress-tasks').textContent = inProgressTasks;
        document.getElementById('completed-tasks').textContent = completedTasks;
        
        document.getElementById('high-priority').textContent = highPriority;
        document.getElementById('medium-priority').textContent = mediumPriority;
        document.getElementById('low-priority').textContent = lowPriority;
        
        // Métricas de desempenho simuladas
        document.getElementById('completed-today').textContent = Math.floor(Math.random() * 5);
        document.getElementById('avg-completion-time').textContent = (Math.random() * 3 + 1).toFixed(1) + ' dias';
        document.getElementById('completion-rate').textContent = 
            totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) + '%' : '0%';
    }
    
    function createStatusChart(tasks) {
        const pendingTasks = tasks.filter(task => task.status === 'pendente').length;
        const inProgressTasks = tasks.filter(task => task.status === 'em_andamento').length;
        const completedTasks = tasks.filter(task => task.status === 'concluido').length;
        
        const ctx = document.getElementById('status-chart').getContext('2d');
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Pendentes', 'Em Andamento', 'Concluídas'],
                datasets: [{
                    data: [pendingTasks, inProgressTasks, completedTasks],
                    backgroundColor: [
                        '#f39c12', // Amarelo para pendentes
                        '#3498db', // Azul para em andamento
                        '#2ecc71'  // Verde para concluídas
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
});