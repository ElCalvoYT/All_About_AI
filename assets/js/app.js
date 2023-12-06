/* Fill in the diferent cards */

document.addEventListener("DOMContentLoaded", function () {
    // Supongamos que tu archivo JSON está en assets/data/cards.json
    fetch("assets/json/cards.json")
        .then(response => response.json())
        .then(data => {
            const main = document.getElementById('main');

            data.forEach(cardData => {
                const card = document.createElement('div');
                card.classList.add('card');

                const imgBox = document.createElement('div');
                imgBox.classList.add('imgBox');
                const img = document.createElement('img');
                img.src = cardData.image;
                imgBox.appendChild(img);

                const content = document.createElement('div');
                content.classList.add('content');
                const h2 = document.createElement('h2');
                h2.textContent = cardData.title;
                const p = document.createElement('p');
                p.textContent = cardData.description;
                const a = document.createElement('a');
                a.href = cardData.link;
                a.textContent = 'Mehr Lesen';

                content.appendChild(h2);
                content.appendChild(p);
                content.appendChild(a);

                card.appendChild(imgBox);
                card.appendChild(content);

                main.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});