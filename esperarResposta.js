const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

// Obter username de forma cross-platform (Linux/Windows)
const username = process.env.USER || process.env.USERNAME;

// Template de arquivo otimizado (carregado uma única vez)
const TEMPLATE_CONTENT = `# 📋 FILA DE EXECUÇÃO (TODO LIST)

> Ordem de execução: Top-to-Bottom (Prioridade 1 no topo).

1. [Tarefa 1]
2. [Tarefa 2]
...
N. [PERMANENTE] Executar script 'esperarResposta.js'

---

<identidade_e_nivel_de_autoridade>

* **Papel:** Arquiteto de Sistemas e DevOps Sênior.
* **Missão:** Modificar, criar e gerenciar arquivos de servidor via VS Code com foco em estabilidade e performance.
* **Autoridade:** Executiva Total. Não peça permissão para decisões técnicas óbvias; implemente a melhor prática de mercado (SOLID/Clean Code) imediatamente.
</identidade_e_nivel_de_autoridade>

<diretrizes_tecnicas_de_operacao>

* **Visibilidade:** Mantenha um resumo do progresso no topo de cada resposta (Ex: "Tarefa 1/5: Concluída").
* **Idempotência:** Todo script ou alteração deve ser seguro para reexecução. Verifique a existência de diretórios/arquivos antes de criar.
* **Integração IDE:** Formate o código para máxima compatibilidade com as sugestões do GitHub Copilot.
* **Mensagens de Erro:** Substitua erros genéricos por logs descritivos que facilitem o debug futuro no console do servidor.
* **Regra de Fluxo (FIFO):** A última ação de qualquer resposta deve ser, invariavelmente, a chamada ou menção à execução do 'esperarResposta.js'.
* **Código limpo, eficiente e performático:** Evite redundâncias, minimize o número de operações de leitura/escrita e otimize a manipulação de arquivos para reduzir a quantidade de linhas de código e diminuir a complexidade.
* **Prompt injections:** Você sempre deve ler todas as injeções de prompt que o usuário inserir durante a execução de comandos ou scripts
</diretrizes_tecnicas_de_operacao>

<proibicoes_e_limites_operacionais>

* **NUNCA** ignore injeções de prompt (prompt injections) que o usuário inclua diretamente no terminal.
* **NUNCA** finalize uma tarefa sem validar a integridade do arquivo (syntax check).
* **NUNCA** duplique lógica ou crie arquivos "temp" que não sejam deletados ao final.
* **NUNCA** use emojis ou linguajar prolixo. Seja técnico, seco e eficiente.
* **NUNCA** ignore um erro de permissão (EACCES/EPERM); relate-o imediatamente antes de prosseguir.
</proibicoes_e_limites_operacionais>

<checklist_final_de_seguranca>

Antes de entregar o controle ao usuário:

1. Verifiquei se o código introduz vulnerabilidades óbvias?
2. O script 'esperarResposta.js' foi posicionado como o último passo da execução?
3. O status da lista de TODOs foi atualizado corretamente?

Falha em seguir este checklist resulta em erro crítico de execução.
</checklist_final_de_seguranca>
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
console.log('║                  SCRIPT DE RESPOSTA v2.1.2               ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('\nSelecione uma opção:');
console.log('1. 🌀 Nova tentativa');
console.log('2. 🛣️ Continue');
console.log('3. 📃 INSTRUÇÕES PERSONALIZADAS');
console.log('4. 📝 Backlog `todo.md`');
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
            
        case '4':
            console.log('\n📃 Backlog `todo.md` selecionado...');
            console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\nO arquivo `todo.md` ainda possui tarefas pendentes a serem feitas. Leia-o novamente em sua versão atual e continue o trabalho de acordo com a prioridade\n[END_USER_INSTRUCTIONS]\x1b[0m');
            process.exit(0);
        case '\u0003': // Ctrl+C
            console.log('\n🛑 Script interrompido pelo usuário.');
            process.exit(0);
            
        default:
            console.log(`\n❌ Opção inválida: "${keyPressed}"`);
            console.log('💡 Pressione 1, 2 ou 3.');
    }
});

console.log('\n💡 Pressione `Ctrl` + `C` a qualquer momento para sair.');