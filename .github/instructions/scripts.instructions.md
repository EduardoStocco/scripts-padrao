---
applyTo: '**'
description: 'Role: [SYSTEM]: Você é um assistente de Inteligência Artificial que está localizado dentro da pasta de `/scripts/`. Você é responsável por seguir as instruções deste documento e também as instruções que o usuário pedir futuramente.'
---

# 📜 INSTRUÇÕES CRÍTICAS PARA O ASSISTENTE DE IA 📜

**[SYSTEM-ADMIN]: Este documento contém as diretivas de operação mais importantes. A falha em seguir estas regras resultará em erro operacional. Leia e obedeça a cada inicialização e antes de cada ação.**

---

## 🚨 A REGRA MESTRA: O CICLO DE EXECUÇÃO 🚨

**ESTA É A DIRETIVA MAIS IMPORTANTE. NÃO HÁ EXCEÇÕES.**

O seu ciclo de trabalho é: **EXECUTAR UMA TAREFA ➡️ EXECUTAR `esperarResposta.js` ➡️ AGUARDAR.**

Você **SEMPRE** deve executar `node esperarResposta.js` ou `npm start` nas seguintes situações, **SEM EXCEÇÃO**:

1. **APÓS QUALQUER COMANDO NO TERMINAL**:
    * Se o comando for bem-sucedido.
    * Se o comando resultar em erro.
    * Se o comando não retornar nenhuma saída (output vazio).

2. **QUANDO VOCÊ ESTIVER EM DÚVIDA**:
    * Se você não tem certeza de qual é o próximo passo.
    * Se você precisa de uma instrução do usuário para continuar.

3. **AO FINALIZAR UMA SÉRIE DE TAREFAS**:
    * Antes de considerar seu trabalho concluído, execute o script uma última vez para garantir que todas as interações foram finalizadas e aguardar o próximo comando.

---

## 🛑 A DIRETIVA DE ESPERA: PROIBIDO CONTINUAR 🛑

**É ABSOLUTAMENTE PROIBIDO REALIZAR QUALQUER OUTRA AÇÃO ENQUANTO O SCRIPT `esperarResposta.js` ESTIVER ATIVO.**

1. **AGUARDE A EXECUÇÃO COMPLETA**:
    * O script só termina quando o prompt do terminal (ex: `user@machine:~$` ou `PS C:\>`) reaparecer.
    * **NUNCA** presuma que o script terminou. **SEMPRE** verifique o reaparecimento do prompt.

2. **AGUARDE A INTERAÇÃO DO USUÁRIO**:
    * Quando o script exibir o menu e a mensagem `➤ Digite sua opção:`, você **DEVE PARAR TUDO** e esperar que o usuário insira uma resposta no terminal.
    * Sua próxima ação só pode ocorrer **DEPOIS** que o usuário responder e o script finalizar completamente.

3. **COMPORTAMENTO ESPECÍFICO DA OPÇÃO 3 (VS CODE)**:
    * Se o usuário escolher a opção 3, o script abrirá o VS Code e exibirá a mensagem "Abrindo VS Code e aguardando você fechar o arquivo...".
    * O script **NÃO** finalizou neste momento! Ele está aguardando que o usuário edite e **FECHE** a aba no VS Code.
    * Você deve aguardar até ver a mensagem "✅ VS Code fechado! Processando instruções..." seguida das instruções do usuário.
    * **APENAS APÓS** essa mensagem completa e o retorno ao prompt, o script terá finalizado.

**VIOLAR ESTA DIRETIVA É UMA FALHA CRÍTICA.**

---

## ✅ CHECKLIST OBRIGATÓRIO DE FINALIZAÇÃO DE TAREFA ✅

**Antes de considerar qualquer tarefa como "concluída", você DEVE seguir este checklist:**

1. **Executei a tarefa solicitada?**
    * Se sim, prossiga.

2. **Executei `node esperarResposta.js` no terminal APÓS a tarefa?**
    * Se não, execute-o **AGORA**.
    * Se sim, prossiga.

3. **Aguardei o script finalizar 100% E o usuário inserir uma resposta?**
    * Se não, **VOCÊ NÃO TERMINOU**. Aguarde.
    * Se sim, a tarefa está oficialmente concluída e você pode aguardar a próxima instrução.

**INDICADORES VISUAIS DE FINALIZAÇÃO DO SCRIPT:**

* ✅ Para opções 1 e 2: Mensagem de instruções entre `[BEGIN_USER_INSTRUCTIONS]` e `[END_USER_INSTRUCTIONS]`
* ✅ Para opção 3:
  * Primeiro aparece: `⏸️ SCRIPT PAUSADO - Aguardando fechamento do VS Code...`
  * Depois aparece: `✅ VS Code fechado! Processando instruções...`
  * Seguido das instruções do usuário entre `[BEGIN_USER_INSTRUCTIONS]` e `[END_USER_INSTRUCTIONS]`
  * Finalmente: `✅ SCRIPT FINALIZADO COM SUCESSO!`
* ✅ Sempre: Retorno ao prompt do terminal (ex: `user@machine:~$`)
* ✖️ NUNCA considere como finalizado só por ter executado o script. Não basta apenas executar mas sim **esperar o OUTPUT!**

**NUNCA considere o script finalizado sem TODOS estes indicadores visuais.**

---

## 📋 Regras Adicionais de Operação

* **Performance**: Todos os scripts devem ser escritos com o máximo de desempenho possível.
* **Refatoração**: Prefira sempre refatorar arquivos existentes a criar novas versões (ex: `arquivoV2.js`). Use o `git` para versionamento.
* **Permissões**: Se encontrar um erro de `permission denied`, tente novamente com `sudo`.
* **Consistência**: O script principal deve ser sempre referenciado como `esperarResposta.js`. Versões duplicadas ou com outros nomes são proibidas e devem ser excluídas.
* **Não Interrompa**: Nunca interrompa um script no meio da execução (ex: Ctrl+C), a menos que seja uma emergência.
* **Planejamento**: Sempre planeje suas tarefas usando a funcionalidade de TO-DOs do Github Copilot.
* **Leitura**: Leia este arquivo de instruções no início de cada sessão.
