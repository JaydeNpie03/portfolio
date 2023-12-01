document.addEventListener('DOMContentLoaded', () => {

    getPosts();

    function getPosts() {
        fetch('/getposts')
        .then(response => response.json())
        .then(data => {
            for (p of data) {
                
                //Variables
                const outerDiv = document.createElement('div');
                const cardDiv = document.createElement('div');
                const op = document.createElement('p');
                const kanji = document.createElement('p');
                const category = document.createElement('p');
                const caption = document.createElement('p');

                //Assign classes
                outerDiv.classList.add('col-md-10', 'col-lg-5', 'text-center', 'my-3');
                cardDiv.classList.add('card', 'px-4', 'py-4', 'bg-dark', 'border', 'h-100');
                op.classList.add('h1', 'text-left',);
                kanji.classList.add('h1');
                category.classList.add('h1');
                caption.classList.add('h3');

                //Assign Inner HTML
                let c = ''
                switch (p['category']) {
                    case 'use':
                        c = 'Use these Kanji:';
                        break;
                    
                    case 'general':
                        c = 'Discuss these Kanji:';
                        break;

                    case 'question':
                        c = 'Question about these Kanji:';
                        break;
                    
                    default:
                        c = 'Use these Kanji:';
                        break;
                }
                op.innerHTML = p['op'];
                category.innerHTML = c;
                kanji.innerHTML = p['kanji'];
                caption.innerHTML = p['caption'];

                //Append children
                cardDiv.appendChild(op);
                cardDiv.appendChild(category);
                cardDiv.appendChild(kanji);
                cardDiv.appendChild(caption);
                outerDiv.appendChild(cardDiv);
                document.querySelector('#posts').appendChild(outerDiv);
            }
        })
    }
})