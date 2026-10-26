async function inicializate() {
    fetch("./assets/data/data.json")
        .then(response => response.json())
        .then(response => {
            document.querySelector(".nameProfileSection").innerHTML = response.nome;
            document.querySelector(".profilePicture").src = response.profilePhotoPath;
        })
        .catch(e => console.log(e))
}

inicializate();
