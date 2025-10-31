<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/aff6dc0e-26af-43d4-97bf-b37a85757771" /># Sistema de Gerenciamento de Tarefas - TechFlow Solutions

[![CI](https://github.com/carlosxnnhenrique745-sudo/projeto_fecaf/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosxnnhenrique745-sudo/projeto_fecaf/actions/workflows/ci.yml)

Relatório de cobertura: https://carlosxnnhenrique745-sudo.github.io/projeto_fecaf/

## Sobre o Projeto
Este projeto simula o desenvolvimento de um sistema de gerenciamento de tarefas para a empresa fictícia TechFlow Solutions. O sistema permite acompanhar o fluxo de trabalho em tempo real, priorizar tarefas críticas e monitorar o desempenho da equipe.

## Objetivos
- Criar uma aplicação web para gerenciamento de tarefas
- Implementar funcionalidades de CRUD (Criar, Ler, Atualizar, Deletar) para tarefas
- Aplicar metodologias ágeis no desenvolvimento
- Utilizar GitHub para controle de versão e gestão do projeto
- Configurar integração contínua com GitHub Actions

## Metodologia
Este projeto utiliza uma abordagem híbrida de metodologias ágeis, combinando elementos do Scrum e Kanban:

- **Kanban**: Utilizamos um quadro Kanban no GitHub Projects para visualizar o fluxo de trabalho com colunas "A Fazer", "Em Progresso" e "Concluído".
- **Iterações**: Desenvolvimento em pequenas iterações com entregas incrementais.
- **Revisões**: Revisões regulares do código e funcionalidades implementadas.

## Tecnologias Utilizadas
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Testes: Jest
- CI/CD: GitHub Actions

## Estrutura do Projeto
```
/
├── src/                # Código fonte
│   ├── models/         # Modelos de dados
│   ├── controllers/    # Controladores
│   ├── routes/         # Rotas da API
│   └── public/         # Arquivos estáticos (HTML, CSS, JS)
├── tests/              # Testes automatizados
├── docs/               # Documentação
└── .github/            # Configurações do GitHub Actions
```

## Como Executar o Projeto
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor: `npm start`
4. Acesse a aplicação em: `http://localhost:3000`

## Testes
Para executar os testes automatizados:
```
npm test
```

## Controle de Qualidade
Este projeto utiliza GitHub Actions para automação de testes e garantia da qualidade do código. A cada commit, os testes são executados automaticamente para verificar se as funcionalidades estão operando conforme esperado.

## Histórico de Mudanças
- **Versão Inicial**: Implementação do CRUD básico de tarefas
- **Mudança de Escopo**: Adição de funcionalidade de relatórios e dashboard para visualização de métricas de desempenho da equipe. Esta mudança foi necessária para atender à necessidade do cliente de monitorar o desempenho da equipe de forma mais eficiente, conforme solicitado em reunião de revisão do projeto.

---
Desenvolvido como parte do trabalho de Engenharia de Software.
