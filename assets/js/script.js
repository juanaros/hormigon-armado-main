const calculate = document.querySelector('#boton');
const arrayMom = [];
const lista = document.querySelector('#lista-momentos')
calculate.addEventListener('click', () => {
    const wBeam = document.querySelector('#anchoB').value;
    const hBeam = document.querySelector('#alturaD').value;
    const momSol = document.querySelector('#momento').value;
    const resist = document.querySelector('#calidad').value;
    if (resist < 280) {
        aMax = hBeam*(3/8)*0.85
    } else {
        aMax = hBeam*(3/8)*(0.85 - 0.05*((resist - 280)/70))
    }
    if (wBeam== '') {
        alert('Rellene todos los campos por favor')
    } else if (hBeam=='') {
        alert('Rellene todos los campos por favor')
    } else if (momSol=='') {
        alert('Rellene todos los campos por favor')
    } else {
        fzCc = 0.85*resist*wBeam*aMax;
        moUltLim = (fzCc*(hBeam-((aMax)/2)))/100000;
        document.querySelector("#result").innerHTML = moUltLim.toFixed(2);
    }
    if (momSol < moUltLim) {
        document.querySelector('#tipo-armadura').innerHTML = 'Solo a tracción'
    } else {
        document.querySelector('#tipo-armadura').innerHTML = 'A tracción y a compresión'
    }
    const addMomentum = () => {
        const newMomentum = {
            id: arrayMom.length + 1,
            valor: moUltLim,
        };
        arrayMom.push(newMomentum);
        updateList();
    }
    addMomentum();
});

const updateList = () => {
    let html = ''
    for(let momento of arrayMom){
        html +=`
                <li class="d-flex mb-3">${momento.valor.toFixed(2)}
                <button onclick="borrar(${momento.id})" class="btn bg-danger text-light">Borrar</button>
                </li>
                
            `;
    }
    lista.innerHTML = html;
}

const borrar = (idTarea) => {
    const index = arrayMom.findIndex(task => task.id === idTarea);
    arrayMom.splice(index, 1);
    updateList();
}

