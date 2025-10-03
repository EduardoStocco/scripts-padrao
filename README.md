# 🚀 Script de Resposta Interativa

Sistema de interação com usuário através do terminal, projetado para facilitar a comunicação entre assistentes de IA e usuários através de interfaces intuitivas.

## 📋 Pré-requisitos

Antes de usar este script, certifique-se de ter instalado:

### Obrigatório

- **Node.js** versão 12.0.0 ou superior

  ```bash
  # Verificar versão instalada
  node --version
  ```

- **Visual Studio Code** - Necessário apenas para a opção de edição avançada

  ```bash
  # Verificar se VS Code está no PATH
  code --version
  ```

## 🚀 Como Usar

### 1. Execução Básica

```bash
# Navegar para o diretório do script
cd /home/eduardoho/scripts-padrao

# Executar o script
node esperarResposta.js
```

Ou usando npm:

```bash
npm start
```

### 2. Menu de Opções

Ao executar o script, você verá este menu:

`
╔══════════════════════════════════════════════════════════╗
║                    SCRIPT DE RESPOSTA v3.0.1           ║
╚══════════════════════════════════════════════════════════╝

Selecione uma opção:

1. 🌀 Nova tentativa
2. 🛣️ Continue  
3. 📃 INSTRUÇÕES PERSONALIZADAS

Pressione o número da opção desejada...
`

### 3. Explicação das Opções

#### Opção 1: 🌀 Nova tentativa

- **O que faz**: Solicita ao assistente que refaça a última tarefa
- **Quando usar**: Quando o resultado anterior não foi satisfatório
- **Saída**: Instrução automática para tentar novamente

#### Opção 2: 🛣️ Continue

- **O que faz**: Autoriza o assistente a prosseguir com o próximo passo
- **Quando usar**: Quando estiver satisfeito com o resultado atual
- **Saída**: Instrução automática para continuar

#### Opção 3: 📃 INSTRUÇÕES PERSONALIZADAS

- **O que faz**: Abre um editor para você escrever instruções detalhadas
- **Quando usar**: Quando precisa dar instruções específicas ou complexas
- **Como funciona**:
  1. ✅ Um arquivo temporário é criado automaticamente
  2. 🖥️ O Visual Studio Code abre com um template pré-definido
  3. ✏️ Você edita o arquivo com suas instruções
  4. 💾 Quando terminar sua edição, salve o arquivo (Ctrl+S)
  5. 👂 O script espera o arquivo temporário que foi editado ser fechado. Ele detecta automaticamente
  6. 📤 O conteúdo é exibido no terminal formatado em **verde**
  7. 🗑️ O arquivo temporário é removido automaticamente

**Exemplo de uso da Opção 3:**

```markdown
# Instruções para o Assistente GitHub Copilot


## LISTA DE TAREFAS 📃

- (1) Criar um novo componente React
- (2) Adicionar testes unitários
- (3) Atualizar documentação

```

## ✨ Funcionalidades

### 🎨 Destaque Visual

- Todas as mensagens do usuário são destacadas em **verde** no terminal
- Interface visual clara com emojis e formatação

### 🔧 Verificação Automática

- Verifica automaticamente se Node.js está instalado
- Detecta se VS Code está disponível (apenas para opção 3)
- Usa somente módulos nativos do Node.js (sem dependências externas)

### 🛡️ Tratamento de Erros

- Cleanup automático de arquivos temporários
- Tratamento gracioso de interrupções (Ctrl+C)
- Validação de entrada do usuário

### 📁 Organização Automática

- Arquivos temporários criados em `tmp-temporarios/`
- Nomes únicos com timestamp para evitar conflitos
- Limpeza automática após uso

## 🔧 Desenvolvimento e Testes

### Arquivo de Teste

O projeto inclui `teste-funcionalidade.js` para validar todas as funcionalidades:

```bash
# Executar testes
node teste-funcionalidade.js
```

### Estrutura do Projeto

```text
scripts-padrao/
├── esperarResposta.js          # Script principal
├── teste-funcionalidade.js    # Testes automatizados
├── package.json               # Configurações do projeto
├── README.md                  # Esta documentação
└── tmp-temporarios/           # Diretório para arquivos temporários
```

## 🎯 Casos de Uso

### Para Assistentes de IA

- ✅ Comunicação bidirecional com usuários
- ✅ Coleta de instruções complexas
- ✅ Confirmação de ações antes de executar

### Para Desenvolvedores

- ✅ Automação de workflows
- ✅ Scripts interativos de deploy
- ✅ Coleta de feedback durante desenvolvimento

### Para Usuários Finais

- ✅ Interface simples e intuitiva
- ✅ Edição rica com VS Code (quando disponível)
- ✅ Feedback visual claro

## � Solução de Problemas

## 😨 Solução de Problemas

### Erro: "Node.js não encontrado"

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows - baixar do site oficial
# https://nodejs.org/

# macOS com Homebrew
brew install node
```

### Erro: "VS Code não encontrado" (apenas para opção 3)

- No Windows: Certifique-se de marcar "Add to PATH" durante a instalação
- No Linux: `sudo snap install code --classic`
- No macOS: Instalar pelo site oficial e adicionar ao PATH

### Performance

- O script usa apenas ~2MB de memória
- Inicialização em menos de 1 segundo
- Compatível com sistemas de recursos limitados

## 🔄 Histórico de Versões

**v3.0** (Atual)

- ✅ Destaque em verde para mensagens do usuário
- ✅ Verificação automática de ambiente
- ✅ Menu otimizado com 3 opções principais
- ✅ Zero dependências externas

**v9.0.0** (Package.json)

- ✅ Conversão completa de Shell Script para Node.js
- ✅ Suporte multiplataforma
- ✅ Editor integrado com VS Code

## 📞 Suporte

Este script foi desenvolvido para ser **autodocumentado** e **autoexplicativo**.

- 📖 **Documentação completa**: Este README
- 🧪 **Testes incluídos**: `teste-funcionalidade.js`
- 🔍 **Verificação automática**: O próprio script valida o ambiente
- 💡 **Interface intuitiva**: Mensagens claras e orientações visuais

---

**💡 Dica**: Execute `node esperarResposta.js` e experimente cada opção para se familiarizar com todas as funcionalidades!
