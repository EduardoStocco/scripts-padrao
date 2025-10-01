const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Template de arquivo otimizado (carregado uma única vez)
const TEMPLATE_CONTENT = `# Instruções para o Assistente GitHub Copilot

💡 Dica: Digite suas instruções abaixo, salve o arquivo (Ctrl+S) e FECHE esta aba para continuar.

## LISTA DE TAREFAS 📃

- (1) Exemplo de tarefa 1
- (2) Exemplo de tarefa 2

## FIM DAS INSTRUÇÕES

⚠️  IMPORTANTE: Após editar, salve (Ctrl+S) e FECHE esta aba para que o script continue!
`;

// Verificação rápida e otimizada do ambiente
function checkEnvironment() {
    console.log(`🔍 Node.js ${process.version} ✓`);
    console.log('✅ Ambiente verificado!\n');
}

// Função otimizada para criar nome do arquivo temporário
function createTempFileName() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return path.join(__dirname, 'tmp-temporarios', `temp-${timestamp}.md`);
}

// Garantir diretório temporário (inline e otimizado)
function ensureTempDir() {
    const tempDir = path.join(__dirname, 'tmp-temporarios');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
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
        console.log('📝 Abrindo VS Code e aguardando fechamento...');
        console.log('⏸️  SCRIPT PAUSADO - Aguardando fechamento do VS Code...\n');
        
        // Remover listeners antes de spawn para evitar conflitos
        process.stdin.removeAllListeners('data');
        process.stdin.pause();
        
        // Spawn otimizado
        const vscode = spawn('code', ['--wait', tempFile], { 
            stdio: ['inherit', 'pipe', 'pipe']
        });
        
        // Cleanup function otimizada
        const cleanup = (isError = false) => {
            try {
                if (fs.existsSync(tempFile)) {
                    fs.unlinkSync(tempFile);
                    if (!isError) console.log('🗑️  Arquivo temporário removido.');
                }
            } catch (cleanupErr) {
                console.error('⚠️  Erro na limpeza:', cleanupErr.message);
            }
        };
        
        vscode.on('error', (err) => {
            console.error('❌ Erro ao abrir VS Code:', err.message);
            cleanup(true);
            process.exit(1);
        });
        
        vscode.on('close', () => {
            console.log('✅ VS Code fechado! Processando instruções...\n');
            
            try {
                const content = fs.readFileSync(tempFile, 'utf8');
                console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\x1b[0m');
                console.log('\x1b[32m' + content + '\x1b[0m');
                console.log('\x1b[32m[END_USER_INSTRUCTIONS]\x1b[0m\n');
                
                cleanup();
                console.log('✅ SCRIPT FINALIZADO COM SUCESSO!');
                process.exit(0);
                
            } catch (readErr) {
                console.error('❌ Erro ao ler arquivo:', readErr.message);
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
console.log('║                  SCRIPT DE RESPOSTA v2.1.0               ║');
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
            console.log('\x1b[32m[BEGIN_USER_INSTRUCTIONS]\nContinue a execução. Pode prosseguir!\n[END_USER_INSTRUCTIONS]\x1b[0m');
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