const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

// Obter username de forma cross-platform (Linux/Windows)
const username = process.env.USER || process.env.USERNAME;

// Template de arquivo otimizado (carregado uma única vez)
const TEMPLATE_CONTENT = `# INSTRUÇÕES

Se a LISTA DE TAREFAS estiver enumerada, é obrigatório seguir a ordem!

## PERSONA

Você é um assistente de IA que soluciona problemas e **foca no que o usuário requisitou na lista de tarefas!**

## LISTA DE TAREFAS

1. Tarefa 1
    1.1 Sub-tarefa
2. Tarefa ...N...

## COMO SE COMPORTAR

### REGRAS

* **Regra FIFO: a última tarefa da lista de TODOs que você cria no chat SEMPRE DEVE SER com a descrição "Executar script 'esperarResposta.js'". Essa tarefa é como se fosse um último da fila fixo, que sempre será o último da fila de TODOs e nunca vai sair!

### BOAS PRÁTICAS

* Desenvolvimento seguro. Aproveite os recursos disponíveis no VS Code como o "SonarQube for IDE"
* Erros registrados no código devem ser claros e com mensagem intuitiva sobre o que aconteceu
* Mantenha as tasks/TO-DOs sempre visíveis para o usuário no Chat do GitHub Copilot
* Siga boas práticas de programação, com código limpo, legível, seguro e eficiente
* Alta coesão e baixo acoplamento
* Organização (arquivos/pastas)

### 🚨 EVITE O QUE VOCÊ **NÃO DEVE FAZER!**

* Evite inserir mensagens de sucesso **sem antes verificar se realmente não houve erros!**
* **Evite repetir erros já cometidos anteriormente!**
* Evite criar novos arquivos desnecessários
* Evite excesso de comentários
* Evite emojis

## ⚠️ CHECKLIST OBRIGATÓRIO FINALIZAÇÃO

**Antes de considerar a lista de TODOs "concluída", você DEVE VERIFICAR esta checklist:**

1. **Executei o script 'esperarResposta.js' APÓS a tarefa que fiz?**
    * Se não, execute-o **AGORA**
    * Se sim, prossiga

2. **Aguardei o script finalizar 100% E o usuário inserir uma resposta?**
    * Se não, **VOCÊ NÃO TERMINOU**. Aguarde ou, se necessário, execute 'esperarResposta.js' novamente
`;

// Verificação rápida e otimizada do ambiente
function checkEnvironment() {
    console.log(`🔍 Node.js ${process.version} ✓`);
}

// Função otimizada para criar nome do arquivo temporário
function createTempFileName() {
    const timestamp = new Date().toISOString().replaceAll(/[:.]/g, '-').slice(0, -5);
    return path.join(__dirname, 'tmp-temporarios', `temp-${timestamp}.md`);
}

// Garantir diretório temporário (inline e otimizado)
function ensureTempDir() {
    const tempDir = path.join(__dirname, 'tmp-temporarios');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
}

// Função para detectar o comando VS Code correto para o sistema operacional
function getVSCodeCommand() {
    if (process.platform === 'win32') {
        // Caminhos comuns do VS Code no Windows
        const possiblePaths = [
            path.join(process.env.LOCALAPPDATA, 'Programs', 'Microsoft VS Code', 'Code.exe'),
            path.join('C:', 'Program Files', 'Microsoft VS Code', 'Code.exe'),
            path.join('C:', 'Program Files (x86)', 'Microsoft VS Code', 'Code.exe')
        ];
        
        for (const codePath of possiblePaths) {
            if (fs.existsSync(codePath)) {
                return codePath;
            }
        }
        
        // Se não encontrar, tenta usar 'code' mesmo assim (pode estar no PATH)
        return 'code';
    } else {
        // Linux/macOS - usa 'code' padrão
        return 'code';
    }
}

// Função principal do VS Code otimizada
function editInVSCode() {
    ensureTempDir();
    const tempFile = createTempFileName();
    
    try {
        // Escrever arquivo uma única vez
        fs.writeFileSync(tempFile, TEMPLATE_CONTENT);
        
        console.log(`\n✓ Arquivo temporário: ${tempFile}`);
        console.log('📝 Abrindo VS Code...');
        console.log('⏸️  SCRIPT PAUSADO - Aguardando fechamento do VS Code...\n');
        
        // Remover listeners antes de spawn para evitar conflitos
        process.stdin.removeAllListeners('data');
        process.stdin.pause();
        
        // Detectar comando VS Code correto para o SO
        const vscodeCommand = getVSCodeCommand();
        console.log(`🔍 Usando VS Code: ${vscodeCommand}`);
        
        // Spawn otimizado com detecção automática do comando
        const vscode = spawn(vscodeCommand, ['--wait', tempFile], { 
            stdio: ['inherit', 'pipe', 'pipe']
        });
        
        // Cleanup function otimizada
        const cleanup = (isError = false) => {
            try {
                if (fs.existsSync(tempFile)) {
                    fs.unlinkSync(tempFile);
                    if (!isError) console.log('🗑️  Arquivo temporário removido.');
                }
            } catch (error_) {
                console.error('⚠️  Erro na limpeza:', error_.message);
            }
        };
        
        vscode.on('error', (err) => {
            console.error('❌ Erro ao abrir VS Code:', err.message);
            cleanup(true);
            process.exit(1);
        });
        
        vscode.on('close', () => {
            console.log('✅ VS Code fechado! Processando instruções do usuário...\n');
            
            try {
                const content = fs.readFileSync(tempFile, 'utf8');
                console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\x1b[0m');
                console.log('\x1b[32m' + content + '\x1b[0m');
                console.log('\x1b[32m[END_USER_INSTRUCTIONS]\x1b[0m\n');
                
                cleanup();
                console.log('✅ SCRIPT FINALIZADO COM SUCESSO!');
                process.exit(0);
                
            } catch (error_) {
                console.error('❌ Erro ao ler arquivo:', error_.message);
                cleanup(true);
                process.exit(1);
            }
        });
        
        // Event listeners otimizados para cleanup
        const handleSignal = () => {
            console.log('\n🛑 Operação cancelada.');
            cleanup();
            process.exit(0);
        };
        
        process.on('SIGINT', handleSignal);
        process.on('SIGTERM', handleSignal);
        
    } catch (err) {
        console.error('❌ Erro ao criar arquivo temporário:', err.message);
        process.exit(1);
    }
}

// Inicialização otimizada
checkEnvironment();

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║                  SCRIPT DE RESPOSTA v2.1.1               ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('\nSelecione uma opção:');
console.log('1. 🌀 Nova tentativa');
console.log('2. 🛣️ Continue');
console.log('3. 📃 INSTRUÇÕES PERSONALIZADAS');
console.log('\nPressione o número da opção desejada...');

// Configuração otimizada de entrada
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}
process.stdin.resume();
process.stdin.setEncoding('utf8');

// Event handler principal otimizado
process.stdin.on('data', (key) => {
    const keyPressed = key.toString().trim();
    
    switch (keyPressed) {
        case '1':
            console.log('\n🌀 Modo "Nova tentativa" selecionado');
            console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\nQuero que você volte e tente novamente a última tarefa realizada.\n[END_USER_INSTRUCTIONS]\x1b[0m');
            process.exit(0);
            
        case '2':
            console.log('\n🛣️ Modo "Continue" selecionado');
            console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\nContinue a execução. Pode continuar onde parou na sua lista de tasks (TODOS)!\n[END_USER_INSTRUCTIONS]\x1b[0m');
            process.exit(0);
            
        case '3':
            console.log('\n📝 Modo de edição no VS Code selecionado.');
            editInVSCode();
            return; // Return direto, sem break desnecessário
            
        case '\u0003': // Ctrl+C
            console.log('\n🛑 Script interrompido pelo usuário.');
            process.exit(0);
            
        default:
            console.log(`\n❌ Opção inválida: "${keyPressed}"`);
            console.log('💡 Pressione 1, 2 ou 3.');
    }
});

console.log('\n💡 Pressione `Ctrl` + `C` a qualquer momento para sair.');