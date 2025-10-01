const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Verificação automática do ambiente
function checkEnvironment() {
    console.log('🔍 Verificando ambiente...');
    
    // Verificar Node.js
    const nodeVersion = process.version;
    console.log(`✓ Node.js ${nodeVersion} detectado`);
    
    // Verificar módulos nativos necessários
    try {
        require('fs');
        require('path');
        require('child_process');
        console.log('✓ Todos os módulos nativos estão disponíveis');
    } catch (err) {
        console.error('❌ Erro ao carregar módulos nativos:', err.message);
        process.exit(1);
    }
    
    // Verificar se VS Code está disponível (opcional)
    const { exec } = require('child_process');
    exec('code --version', (error) => {
        if (error) {
            console.log('⚠️  VS Code não detectado no PATH (será necessário para opção 3)');
        } else {
            console.log('✓ VS Code detectado e disponível');
        }
    });
    
    console.log('✅ Ambiente verificado com sucesso!\n');
}

// Executar verificação na inicialização
checkEnvironment();

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║                    SCRIPT DE RESPOSTA v2.0.1             ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('\nSelecione uma opção:');
console.log('1. 🌀 Nova tentativa');
console.log('2. 🛣️ Continue');
console.log('3. 📃 INSTRUÇÕES PERSONALIZADAS');
console.log('\nPressione o número da opção desejada...');

// Função para criar nome de arquivo temporário único
function createTempFileName() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return path.join(__dirname, 'tmp-temporarios', `temp-${timestamp}.md`);
}

// Função para garantir que o diretório temporário existe
function ensureTempDir() {
    const tempDir = path.join(__dirname, 'tmp-temporarios');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
}

// Função para abrir arquivo no VS Code e monitorar mudanças
function editInVSCode() {
    ensureTempDir();
    const tempFile = createTempFileName();
    
    // Criar arquivo temporário com conteúdo inicial
    const initialContent = `# Instruções para o Assistente GitHub Copilot

💡 Dica: Digite suas instruções abaixo e salve o arquivo (Ctrl+S) para continuar.

## LISTA DE TAREFAS 📃

- (1) Exemplo de tarefa 1
- (2) Exemplo de tarefa 2

## FIM DAS INSTRUÇÕES

`;
    
    try {
        fs.writeFileSync(tempFile, initialContent);
        console.log(`\n✓ Arquivo temporário criado: ${tempFile}`);
        console.log('⏳ Abrindo VS Code...');
        
        // Abrir no VS Code
        const vscode = spawn('code', [tempFile], { 
            stdio: 'inherit',
            detached: true
        });
        
        vscode.on('error', (err) => {
            console.error('❌ Erro ao abrir VS Code:', err.message);
            console.log('💡 Certifique-se de que o VS Code está instalado e no PATH');
            process.exit(1);
        });
        
        console.log('📝 VS Code aberto! Edite o arquivo e salve (Ctrl+S) quando terminar.');
        console.log('⏳ Aguardando salvamento...\n');
        
        // Monitorar mudanças no arquivo
        let lastModified = fs.statSync(tempFile).mtime;
        let isWatching = true;
        
        const watcher = fs.watch(tempFile, (eventType) => {
            if (eventType === 'change' && isWatching) {
                try {
                    const currentModified = fs.statSync(tempFile).mtime;
                    
                    // Verificar se o arquivo foi realmente modificado
                    if (currentModified > lastModified) {
                        lastModified = currentModified;
                        
                        // Aguardar um pequeno delay para garantir que o arquivo foi totalmente salvo
                        setTimeout(() => {
                            try {
                                const content = fs.readFileSync(tempFile, 'utf8');
                                
                                // Verificar se o conteúdo mudou do inicial
                                if (content.trim() !== initialContent.trim()) {
                                    isWatching = false;
                                    watcher.close();
                                    
                                    console.log('✅ Arquivo salvo detectado!\n');
                                    console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\x1b[0m');
                                    console.log('\x1b[32m' + content + '\x1b[0m');
                                    console.log('\x1b[32m[END_USER_INSTRUCTIONS]\x1b[0m\n');
                                    
                                    // Limpar arquivo temporário
                                    try {
                                        fs.unlinkSync(tempFile);
                                        console.log('🗑️  Arquivo temporário removido.');
                                    } catch (cleanupErr) {
                                        console.error('⚠️  Não foi possível remover o arquivo temporário:', tempFile, cleanupErr.message);
                                    }
                                    
                                    process.exit(0);
                                }
                            } catch (readErr) {
                                console.error('❌ Erro ao ler arquivo:', readErr.message);
                            }
                        }, 500); // Delay de 500ms para garantir que o arquivo foi totalmente salvo
                    }
                } catch (statErr) {
                    // Arquivo pode ter sido temporariamente inacessível durante a escrita
                    // Isso é normal durante operações de salvamento
                    console.debug('Arquivo temporariamente inacessível:', statErr.message);
                }
            }
        });
        
        // Capturar Ctrl+C para limpeza
        process.on('SIGINT', () => {
            console.log('\n\n🛑 Operação cancelada pelo usuário.');
            watcher.close();
            try {
                if (fs.existsSync(tempFile)) {
                    fs.unlinkSync(tempFile);
                    console.log('🗑️  Arquivo temporário removido.');
                }
            } catch (cleanupErr) {
                console.error('⚠️  Não foi possível remover o arquivo temporário:', cleanupErr.message);
            }
            process.exit(0);
        });
        
    } catch (err) {
        console.error('❌ Erro ao criar arquivo temporário:', err.message);
        process.exit(1);
    }
}

// Configurar entrada de teclado
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (key) => {
    const keyPressed = key.toString().trim();
    
    switch (keyPressed) {
        case '1':
            console.log('\n🌀 Modo "Nova tentativa" selecionado');
            console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\nQuero que você volte e tente novamente a última tarefa realizada.\n[END_USER_INSTRUCTIONS]\x1b[0m');
            process.exit(0);
            break;
            
        case '2':
            console.log('\n🛣️ Modo "Continue" selecionado');
            console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\nContinue a execução. Pode prosseguir!\n[END_USER_INSTRUCTIONS]\x1b[0m');
            process.exit(0);
            break;
            
        case '3':
            console.log('\n📝 Modo de edição no VS Code selecionado.');
            editInVSCode();
            break;
            
        case '\u0003': // Ctrl+C
            console.log('\n\n🛑 Script interrompido pelo usuário.');
            process.exit(0);
            break;
            
        default:
            console.log(`\n❌ Opção inválida: "${keyPressed}"`);
            console.log('💡 Pressione 1, 2, 3, 4 ou 0 para sair.');
            break;
    }
});

console.log('\n💡 Pressione `Ctrl` + `C` a qualquer momento para sair.');