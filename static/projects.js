document.addEventListener('DOMContentLoaded', () => {
    var projectArray = createArray();
    setupListeners();
    
    function setupListeners() {
        const pDiv = document.getElementById('projectsDiv');
        const iDiv = document.getElementById('introDiv');
        const aNav = document.getElementById('allNav');
        const pNav = document.getElementById('pythonNav');
        const hNav = document.getElementById('htmlNav');
        const jNav = document.getElementById('javaNav');
        const oNav = document.getElementById('otherNav');

        //Anim Listeners
        pDiv.addEventListener('animationend', (event) => {
            if(event.animationName == 'fadeOut') {
                pDiv.style.display = 'none';
                iDiv.style.display = 'flex';
                iDiv.style.animation='fadeIn 1s ease-in 1 forwards running';
                aNav.classList.toggle('active', true)
                hNav.classList.toggle('active', false)
                jNav.classList.toggle('active', false)
                pNav.classList.toggle('active', false)
                oNav.classList.toggle('active', false)
            }
        }); 

        iDiv.addEventListener('animationend', (event) => {
            if(event.animationName == 'fadeOut') {
                iDiv.style.display = 'none';
                pDiv.style.display = 'block';
                pDiv.style.animation= 'fadeIn 1s ease-in 1 forwards running';
                getProjects();
            }
        }); 

        //View Projects
        document.getElementById('projects').addEventListener('click', () => {
            iDiv.style.animation='fadeOut 1s ease-in 1 forwards running';
        });

        //Go Back
        document.getElementById('backNav').addEventListener('click', () => {
            pDiv.style.animation='fadeOut 1s ease-in 1 forwards running';
        });

        //All Projects
        aNav.addEventListener('click', () => {
            if(!aNav.classList.contains('active')) {
                pNav.classList.toggle('active', false)
                hNav.classList.toggle('active', false)
                jNav.classList.toggle('active', false)
                oNav.classList.toggle('active', false)
                aNav.classList.toggle('active', true)
                getProjects();
            }
        });

        //Python Projects
        pNav.addEventListener('click', () => {
            if(!pNav.classList.contains('active')) {
                aNav.classList.toggle('active', false)
                hNav.classList.toggle('active', false)
                jNav.classList.toggle('active', false)
                oNav.classList.toggle('active', false)
                pNav.classList.toggle('active', true)
                getProjects('PYTHON');
            }
        });

        //Java Projects
        jNav.addEventListener('click', () => {
            if(!jNav.classList.contains('active')) {
                pNav.classList.toggle('active', false)
                hNav.classList.toggle('active', false)
                aNav.classList.toggle('active', false)
                oNav.classList.toggle('active', false)
                jNav.classList.toggle('active', true)
                getProjects('JAVA');
            }
        });

        //HTML Projects
        hNav.addEventListener('click', () => {
            if(!hNav.classList.contains('active')) {
                pNav.classList.toggle('active', false)
                aNav.classList.toggle('active', false)
                jNav.classList.toggle('active', false)
                oNav.classList.toggle('active', false)
                hNav.classList.toggle('active', true)
                getProjects('HTML');
            }
        });

        //Other Projects
        oNav.addEventListener('click', () => {
            if(!oNav.classList.contains('active')) {
                pNav.classList.toggle('active', false)
                aNav.classList.toggle('active', false)
                jNav.classList.toggle('active', false)
                hNav.classList.toggle('active', false)
                oNav.classList.toggle('active', true)
                getProjects('OTHER');
            }
        });
    }
        
    function getProjects(type = 'all') {
        document.getElementById('row1').innerHTML = ''; //Reset Project Cards
        for (p of projectArray) {
            if(type == 'all' || type == p['type']) {
                //Variables
                const colDiv = document.createElement('div');
                const cardDiv = document.createElement('div');
                const cardBody = document.createElement('div');
                const title = document.createElement('h3');
                const desc = document.createElement('p');
                const github = document.createElement('a');
                const previewPic = document.createElement('img');

                //Class Assignments
                colDiv.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
                cardDiv.classList.add('card', 'mb-4');
                previewPic.classList.add('card-img-top', 'rounded-5', 'px-2', 'pt-2');
                cardBody.classList.add('card-body');
                title.classList.add('card-title');
                desc.classList.add('card-text');
                github.classList.add('btn', 'btn-primary')

                //Value Assignments
                colDiv.style.opacity = '0'
                previewPic.src = p['preview_pic'];
                title.innerHTML = p['title'];
                if ('key' in p) {
                    title.href = p['href'];
                }
                desc.innerHTML = p['desc'];
                github.innerHTML = 'View GitHub Repo';
                github.href = p['github'];
                github.target = '_blank';
                github.rel = 'noreferrer noopener';

                //Build Card
                cardBody.appendChild(title);
                cardBody.appendChild(desc);
                cardBody.appendChild(github);
                cardDiv.appendChild(previewPic);
                cardDiv.appendChild(cardBody);
                colDiv.appendChild(cardDiv);

                //Fade In Card
                document.getElementById('row1').appendChild(colDiv);
                colDiv.style.animation = 'fadeIn .5s ease-in 1 forwards running';
            }
        }
    }

    function createArray() {
        return [
            {
                "title": "Tic-Tac-Toe",
                "preview_pic": "https://jaydenpie03.github.io/portfolio/static/images/ttt.png",
                "desc": "A simple game of tic-tac-toe in Java, utilizing Swing for UI.",
                "github": "https://github.com/JaydeNpie03/portfolio/tree/main/tictactoe",
                "type": "JAVA"
            },
        
            {
                "title": "Kazeni",
                "preview_pic": "https://jaydenpie03.github.io/portfolio/static/images/kazeniLogoSquare.png",
                "desc": "A Django website that serves as a fun way to learn various Japanese Kanji. Uses KanjiAPI for kanji data.",
                "github": "https://github.com/JaydeNpie03/portfolio/tree/main/kazeni",
                "type": "HTML"
            },

            {
                "title": "Monster Hunter Dex (Click me!)",
                "href": "/mondex",
                "preview_pic": "https://jaydenpie03.github.io/portfolio/static/images/mondex.png",
                "desc": "A website built entirely with React/Bootstrap used to look up info on enemies from the game 'Monster Hunter'. Uses a self-hosted API for data (see 'MH-API').",
                "github": "https://github.com/JaydeNpie03/portfolio/tree/main/mondex",
                "type": "HTML"
            },

            {
                "title": "Monster Hunter API (MH-API)",
                "preview_pic": "https://jaydenpie03.github.io/portfolio/static/images/mhapi.png",
                "desc": "An API forked from an existing project and heavily customized. Self-hosted on an Oracle Micro Ubuntu VM, using Nginx, Docker, Go, and much more. Used for 'Monster Hunter Dex'.",
                "github": "https://github.com/JaydeNpie03/Monster-Hunter-API",
                "type": "OTHER"
            },
        
            {
                "title": "Wiki",
                "preview_pic": "https://jaydenpie03.github.io/portfolio/static/images/wiki.png",
                "desc": "A simple wiki using Django, allows user to search, add, and sort entries.",
                "github": "https://github.com/JaydeNpie03/portfolio/tree/main/wiki",
                "type": "HTML"
            },
        
            {
                "title": "Airline Booking",
                "preview_pic": "https://jaydenpie03.github.io/portfolio/static/images/airline.png",
                "desc": "A simplified version of an airline booking site using Django. Allows user to create a booking, search existing bookings, and see who's on which flights.",
                "github": "https://github.com/JaydeNpie03/portfolio/tree/main/airline",
                "type": "HTML"
            },

            {
                "title": "Maze Generator",
                "preview_pic": "https://jaydenpie03.github.io/portfolio/static/images/maze.png",
                "desc": "A Java app which generates a random maze of customizable size. Displays generation process on a Swing GUI.",
                "github": "https://github.com/JaydeNpie03/portfolio/tree/main/maze",
                "type": "JAVA"
            }


            
        ]
    }
});
