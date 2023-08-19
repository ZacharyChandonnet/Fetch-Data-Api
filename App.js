/**
 * @module App
 */
export default class App {
    /**
     * Méthode principale. Sera appelée après le chargement de la page.
     */
    static main() {
        this.characters();
    }
    /**
     * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
     * @returns undefined Ne retourne rien
     */
    static init() {
        window.addEventListener("load", () => {
            this.main();
        });
    }

    static characters() {

        async function chargerJson(url) {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }

        async function characters() {
            document.getElementById('containeur').innerHTML = '';

            const form = document.querySelector('form');
            var ep = form.elements.ep.value;

            chargerJson(`https://rickandmortyapi.com/api/episode/${ep}`)
                .then(data => {
                    const characters = data.characters;

                    for (const characterUrl of characters) {
                        chargerJson(characterUrl)
                            .then(characterData => {

                                const characterName = characterData.name;

                                var containeur = document.getElementById('containeur');
                                var perso = containeur.appendChild(document.createElement('div'));
                                perso.classList.add('perso');

                                var img = perso.appendChild(document.createElement('img'));
                                img.src += characterData.image;

                                var nom = perso.appendChild(document.createElement('p'));
                                nom.innerHTML += characterName + "<br>";

                                var location = perso.appendChild(document.createElement('p'));
                                location.innerHTML += "location : " +  characterData.location.name + "<br>";

                            });
                    }
                });
        }

        document.querySelector('form').addEventListener('submit', function (event) {
            event.preventDefault();
            characters();
        });
    }
}
App.init();