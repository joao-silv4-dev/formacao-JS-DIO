let limit = 9;
let offset = 0;

function atualizarPageSignal (){
    const pageSignalHTML = document.querySelector(".pageSignal");
    pageSignalHTML.textContent = `${offset+1}-${limit+offset}`;
}

function proximaPagina(){
    offset += 5;
    carregarPaginaPokemon(limit, offset)
    atualizarPageSignal()
}

function backPagina(){
    if ( !((offset-5) < 0) ) {
        offset -= 5;
        carregarPaginaPokemon(limit,offset)
    } else {
        console.log("É a primeira página!")
    }
    atualizarPageSignal()
}