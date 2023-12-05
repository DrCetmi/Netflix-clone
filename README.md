# Netflix-clone

# Netflix-Film-Anwendung mit OMDB-API

Dieses Projekt zielt darauf ab, eine Netflix-Filmanwendung mit HTML, CSS (oder SCSS) und JavaScript zu erstellen. Es nutzt die [OMDB API](http://www.omdbapi.com/apikey.aspx), um Filmdaten abzurufen und enthält zusätzliche Funktionen wie Kommentare, Likes und Dislikes.

## Einrichtung

1. Besorge dir den [OMDB API Key](http://www.omdbapi.com/apikey.aspx): Melde dich auf der [OMDB](http://www.omdbapi.com/) Website an, um einen API-Schlüssel zu erhalten.

2. Abrufen von Filmdaten: Verwende JavaScript, um Filmdaten von der [OMDB](http://www.omdbapi.com/) API abzurufen.

    * Verwende fetch() oder andere AJAX-Techniken, um Anfragen an die API zu stellen.
    * Zeige die abgerufenen Filmdaten in deinem HTML an.
    * Dynamische Erstellung von Modals: Implementiere JavaScript-Logik, um dynamisch Modals für jeden Film zu erstellen, wenn ein Benutzer darauf klickt. Du kannst eine Modal-Bibliothek wie Bootstrap's Modal verwenden oder deine eigene Modal-Struktur mit JavaScript-DOM-Manipulation erstellen.

3. Gestaltung & Layout:

    * Erstelle ein Layout, das Netflix ähnelt, mit HTML und CSS.
    * Entwerfe Karten für Filmdetails wie Titel, Poster, Beschreibung, etc.
    * Implementiere das Styling, um eine optisch ansprechende Benutzeroberfläche zu erstellen.

4. Zusätzliche Funktionen implementieren:

    * Kommentare: Erlaube Benutzern, Kommentare zu Filmen hinzuzufügen.
    * Likes & Dislikes: Implementiere Funktionen, um Filme zu Liken oder Disliken.
    * Speicher Kommentare, Likes und Dislikes im lokalen Speicher des Browsers oder verwende eine JSON-Datei, um diese Daten zu speichern.

5. Testen:

    * Teste Ihre Anwendung, um sicherzustellen, dass die Filmdaten korrekt abgerufen und angezeigt werden.
    * Überprüfe, ob die zusätzlichen Funktionen (Kommentare, Likes, Dislikes) wie vorgesehen funktionieren.




## Ressourcen

* [OMDB API-Dokumentation](http://www.omdbapi.com/)


* [MDN](https://developer.mozilla.org/en-US/)


* [Bootstrap-Themen](https://bootswatch.com/)




Denke daran, Modals zu verwenden, anstatt für jeden einzelnen Film eine HTML-Datei zu erstellen (das wäre unmöglich).


Zum Beispiel:


```js
function displayMovieDetailsModal(movieDetails) {
  // Erstellen des Modals
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
    <h2>${movieDetails.Title}</h2>
    <p>${movieDetails.Plot}</p>
    <p>Regisseur: ${movieDetails.Director}</p>
    <p>Jahr: ${movieDetails.Year}</p>
  `;

  // Erstellen der Schaltflächen "Gefällt mir" und "Gefällt mir nicht"
  const likeButton = document.createElement('button');
  likeButton.innerText = 'Gefällt mir';
  likeButton.addEventListener('click', () => {
    // 1. Logik zur Behandlung der "Gefällt mir"-Aktion und Speicherung in der JSON-Datei mit der Film-ID
    // 2. Verwenden Sie möglicherweise die movieDetails.imdbID als eindeutigen Bezeichner
    // 3. Speichern Sie die "Gefällt mir"-Aktion in einer JSON-Datei oder einem anderen Speichermechanismus
  });

  // Ähnliches für "Gefällt mir nicht" machen

  // Erstellen des Kommentarbereichs, der aus JSON abgerufen wird

  // Eingabefeld und Schaltfläche zum Hinzufügen neuer Kommentare
  const commentInput = document.createElement('input');
  commentInput.placeholder = 'Kommentar hinzufügen';
  const commentButton = document.createElement('button');
  commentButton.innerText = 'Kommentar hinzufügen';
  commentButton.addEventListener('click', () => {
    // Logik zum Speichern des neuen Kommentars
  });
  // Vorhandene Kommentare für diesen Film anhand seiner ID abrufen und hier rendern
  const commentsSection = document.createElement('div');


  // Erstellen des Modalcontainers
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.appendChild(modalContent);

  // Anhängen des Modals an den Body (muss nicht der Body sein)
  document.body.appendChild(modal);
}
```
glhf
