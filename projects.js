document.addEventListener('DOMContentLoaded', () => {
    setupListeners();
    
    function setupListeners() {
        const pDiv = document.getElementById('projectsDiv');
        const iDiv = document.getElementById('introDiv');
        const aNav = document.getElementById('allNav');
        const pNav = document.getElementById('pythonNav');
        const hNav = document.getElementById('htmlNav');
        const jNav = document.getElementById('javaNav');

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
                hNav.classList.toggle('active', true)
                getProjects('HTML');
            }
            
        });
    }

    function getProjects(type = 'all') {
        fetch('/getprojects')
        .then(response => response.json())
        .then(data => {
            document.getElementById('row1').innerHTML = ''; //Reset Project Cards
            for (p of data) {
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
        });
    }
});
