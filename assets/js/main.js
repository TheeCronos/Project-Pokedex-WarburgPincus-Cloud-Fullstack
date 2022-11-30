const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const search = document.getElementById("search");
const form = document.getElementById("form");


const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <a href="details.html">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => 
                        `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="xpStats">
                <ol class="container">
                    <li class="xp">Xp: ${pokemon.xp}</li>
                    <li class="height">Height: ${pokemon.height}</li>
                    <li class="weight">Weight: ${pokemon.weight}</li>
                </ol>
            </div>

            <!--
            <span class="a">Skills</span>
            <div class="abilities">
                <ol class="abilityTypes">
                    ${pokemon.abilities.map((ability) => 
                        `<li class="ability ${ability}">${ability}</li>`).join('')}
                </ol>
            </div>
            --!>
        </li>
    </a>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.nodeValue;
    if (searchItem) {
        pokemon(searchItem);
        search.value = "";
    } else if (searchItem === "") {
        pokemons = [];

    }
})