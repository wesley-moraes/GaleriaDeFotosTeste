# Galeria de Fotos Teste - Objective

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Sobre o projeto
Página de galeria de fotos responsiva, com consumo de API e integração completa com o backend, permitindo o salvamento de novas imagens na galeria. Inclui exibição de mensagens "toast" personalizadas para feedback ao usuário, além de um modal para visualização ampliada das fotos.

## Checklist de tarefas de desenvolvimento

- [X] Estruturação do projeto
- [X] Criação do banco de dados
- [X] Disponibilização dos scripts SQL
- [X] Front End Básico - Estrutura e CSS inicial
- [X] Preparação do backend (htdocs)
- [X] Configuração de CORS para acesso liberado
- [X] Conexão com o Banco de Dados (backend)
- [X] Inserção de foto no banco de dados (frontend e backend)
- [X] Exibição de mensagens de sucesso ou erro de inserção
- [X] Revisão da Documentação
- [X] Customização de dados para inserção no banco de dados (ID e URL)
- [X] Verificação de duplicidade de ID no banco de dados (frontend e backend)
- [X] Consumo da API fornecida
- [X] Inserção de dados da API no banco de dados (ID e URL)
- [X] Escolha da biblioteca de CSS
- [X] Exibição de imagens de ambas as fontes na galeria
- [X] Responsividade para tablets
- [X] Responsividade para smartphones
- [X] Finalização da galeria de imagens
- [X] Resolução de loop infinito no `useEffect()`
- [X] Adição de Footer
- [X] Resolução de conflitos com Strict Mode
- [X] Revisão da responsividade dos componentes
- [X] Modal para visualização ampliada das fotos
- [X] Implementação de Toast para feedback do usuário
- [X] Últimas revisões
- [X] Revisão final da documentação
- [X] Projeto finalizado

## Próximos passos
- [ ] Verificar tamanho do nome dos arquivos para evitar erro no ID
- [ ] Tratar arquivos que possuam `.` no nome
- [ ] Componentizar outros elementos
- [ ] Verificar ordenação da exibição das imagens na galeria

## Arquivos PHP
Os arquivos PHP devem ser executados em um ambiente local, como o XAMPP, sendo localizados na pasta `htdocs`. Eles estão incluídos no projeto para facilitar o entendimento.

## Instruções para rodar o projeto
1. Certifique-se de que o Node.js está instalado.
2. Após clonar o repositório, execute `npm install` para instalar as dependências.
3. Crie o banco de dados utilizando os comandos SQL disponíveis na pasta `SQL`.
4. No diretório backend, crie uma pasta chamada `uploads` para o armazenamento das imagens (onde os arquivos PHP rodarão).
5. Para iniciar o projeto, execute `npm start`.

## Screenshots da Aplicação

### Galeria de Imagens (Home)

![Home Galeria](https://github.com/wesley-moraes/galeriadefotosteste/blob/main/screenshots/ScreenShot3.png)

### Modal para visualização ampliada

![Modal Foto](https://github.com/wesley-moraes/galeriadefotosteste/blob/main/screenshots/ScreenShot2.png)

### Toasts para feedback do usuário

![Mensagens para o usuário](https://github.com/wesley-moraes/galeriadefotosteste/blob/main/screenshots/ScreenShot1.png)
