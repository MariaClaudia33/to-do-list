'use strict';

// criar array que repesenta nosso 'banco de dado' local
let banco = [];

// armazenar em constante array function que retorna os valores da chave 'todolist'
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];

// armazenar em constante array function que define um valor de chave 'tarefa' do nosso 'todolist'
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

// so para ver o que tem no nosso array de objetos que representa nosso 'banco de dados' local
// console.log(JSON.parse(localStorage.getItem('todolist')))

// ACOES DEFINIDAS EM ARROW FUNCTIONS

// CRIAR ITEM NA NOSSA LISTAGEM DE TAREFAS (Iabel + definir claa + criar input com checkbox e botao)
const criarItem = (tarefa, status, indice) => {
    // criar iabel
    const item = document.createElement('label');

    // adicionar no conteudo do iabel 
    item.classList.add('todo__item');

    // definir no conteudo do iabel checkbox div com texto da tarefa e input button
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    // definir o novo item como filho do nossos todolist (div)
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    // elemento todolit que eh a nossa lista
    const todoList = document.getElementById('todoList');

    // enquanto todolist tiver um primeiro filho
    // remova o ultimo filho que foi adicionado ao todoList
    // lembrando que a lista eh readicionada a cada nova insercao
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

// ATUALIZAR TELA, limpar tela, pega o ' banco' e criarItem atualizando assim a lista de tarefas
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco(); 
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

// INSERIR ITEM NA LISTA DE TAREFAS apos teclar enter
const inserirItem = (evento) => {
    // pegar evento teclar e armazenar na constante tecla
    const tecla = evento.key;

    // pegar o valor (nome) da tecla que foi pressionada (alvo do evento)
    const texto = evento.target.value;

    // se a tecla pressionada fi Enter
    if (tecla === 'Enter'){
        // pegue o banco
        const banco = getBanco();

        // faca um push (adicione) de chave/valor da tarefa e status
        banco.push ({'tarefa': texto, 'status': ''});

        // coloque a chave/valor no banco
        setBanco(banco);

        // atualize a tela
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();