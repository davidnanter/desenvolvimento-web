const campo = document.getElementById('txt-tarefa');
const botao = document.getElementById('btn-add');
const lista = document.getElementById('lista-corpo');

const adicionar = () => {
    const texto = campo.value.trim();

    if (texto !== "") {
        const li = document.createElement('li');
        li.textContent = texto;
        lista.appendChild(li);
        
        campo.value = "";
        campo.focus();
    }
};

botao.onclick = adicionar;

campo.onkeydown = (e) => {
    if (e.key === 'Enter') {
        adicionar();
    }
};

lista.onclick = (e) => {
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
};