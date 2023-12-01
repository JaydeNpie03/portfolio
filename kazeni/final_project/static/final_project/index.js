document.addEventListener('DOMContentLoaded', () => {

    let KANJI = [];
    let LENGTH = 0;
    let timerInstances = [];
    let postKanji = [];
    let displayFullTimer;
    let clickTimer;
    let canClick = true;
    const screenW = window.screen.availWidth;
    bgInit();
    setFontSizes();
    setEventListeners();
    populate();

    setTimeout(() => {
        document.querySelector('#tips').innerHTML = "Click a Kanji to view more info about it!";
    }, 5000)

    class CreateTimer1 {
        constructor(timer) {
            timerInstances.push(this);
            this.t = setTimeout(() => {
                generate1();
                const index = timerInstances.indexOf(this);
                if (index > -1) {
                    timerInstances.splice(index, 1);
                }
                delete this;
            }, timer)
        }
    }

    class CreateTimer2 {
        constructor(timer) {
            timerInstances.push(this);
            this.t = setTimeout(() => {
                generate2();
                const index = timerInstances.indexOf(this);
                if (index > -1) {
                    timerInstances.splice(index, 1);
                }
                delete this;
            }, timer)
        }
    }

    class CreateTimer3 {
        constructor(timer) {
            timerInstances.push(this);
            this.t = setTimeout(() => {
                generate3();
                const index = timerInstances.indexOf(this);
                if (index > -1) {
                    timerInstances.splice(index, 1);
                }
                delete this;
            }, timer)
        }
    }


    async function populate() {
        //Populate Kanji list to pull from
    
        await fetch('https://kanjiapi.dev/v1/kanji/jouyou')
        .then(response => response.json())
        .then(joyoList => {
            KANJI = KANJI.concat(joyoList);
        })
        .catch(error => { console.log(`Error: ${error}`) } )

        await fetch('https://kanjiapi.dev/v1/kanji/jinmeiyou')
        .then(response => response.json())
        .then(jinmeiyouList => {
            KANJI = KANJI.concat(jinmeiyouList);
        })
        .catch(error => { console.log(`Error: ${error}`) } )

        LENGTH = KANJI.length - 1;

        //Begin generation loop
        t1 = new CreateTimer1(0, 1000);
        t2 = new CreateTimer2(750, 2750);
        t3 = new CreateTimer3(2500, 4500);
    }

    function bgInit() {
        if (document.body.dataset.isDay === 'true') {
            document.querySelector('#np-button').style.color = '#8A9FDF'
        } else {
            document.querySelector('#np-button').style.color = '#C3BAE6'
        }
    }

    function setFontSizes() {
        const kanji = document.getElementsByClassName('floating-kanji');
        const stc = document.querySelector('#top-container');
        const ktp = document.querySelector('#kanji-to-post');
        const bc = document.querySelector('#bottom-container');
        const isF = document.querySelector('#is-full');

        for (const k of kanji) {
            k.style.fontSize = `${window.innerWidth * (48 / screenW)}px`   //48 font size
        }

        stc.style.fontSize = `${window.innerWidth * (28 / screenW)}px`
        stc.style.marginTop = `-${window.innerWidth * (56 / screenW)}px`    // -2x the font size
        ktp.style.fontSize = `${window.innerWidth * (72 / screenW)}px`
        bc.style.left = `${(window.innerWidth - bc.offsetWidth) / 2}px`;
        isF.style.fontSize = `${window.innerWidth * (28 / screenW)}px`

        if (document.querySelector('#info-night') !== null) {
            const children = document.querySelector('#info-night').children;
            
            for (c of children) {
                const f = parseInt(c.dataset.basesize);   //Returns font size an an int, without the 'px' at the end
                c.style.fontSize = `${window.innerWidth * (f / screenW)}px`;
            }
        }
        
    }
    
    function setEventListeners() {

        const msg1 = document.querySelector('#user-button').innerHTML;
        const overlays = document.getElementsByClassName('overlay')
        if (msg1.includes('Log In')) {
            //User login/register modal
            document.querySelector('#login').display = 'block';
            document.querySelector('#login').opacity = '1';
        } 
        else {
            //TODO Redirect user to their profile
            document.querySelector('#register').display = 'block';
            document.querySelector('#register').opacity = '1';
        }
    
        for (o of overlays) {
            o.addEventListener('click', () => {
                o.style.display = 'none';
                o.style.opacity = '0';
            })
            o.querySelector('.card').addEventListener('click', (e) => {
                //Prevents disappear when clicking modal
                e.stopPropagation();
            })
        }

        window.addEventListener('resize', setFontSizes);

        document.querySelector('#goto-login').addEventListener('click', () => {
            document.querySelector('#register').style.display = 'none';
            document.querySelector('#register').style.opacity = '0';
    
            document.querySelector('#login').style.display = 'block';
            document.querySelector('#login').style.opacity = '1';
        });
    
        document.querySelector('#goto-register').addEventListener('click', () => {
            document.querySelector('#login').style.display = 'none';
            document.querySelector('#login').style.opacity = '0';
            
            document.querySelector('#register').style.display = 'block';
            document.querySelector('#register').style.opacity = '1';
        });
    
        document.querySelector('#login-button').addEventListener('click', () => {
            const user = document.querySelector('#in-user').value;
            const pass = document.querySelector('#in-pass').value;
            fetch('/login', {
                method: 'POST',
                body: JSON.stringify({
                  email: user,
                  password: pass
                }),
                headers: { "X-CSRFToken": getCookie("csrftoken")},
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(result => {
                document.querySelector('#login-msg').innerHTML = result['message'];
                if (result['status'] === 200) {
                    window.location.reload();
                }
            })
            .catch(error => { alert(`Error: ${error}`)});
        });

        document.querySelector('#register-button').addEventListener('click', () => {
            const user = document.querySelector('#new-user').value;
            const email = document.querySelector('#new-email').value;
            const pass = document.querySelector('#new-pass').value;
            const conf = document.querySelector('#confirmation').value;
            const avatar = document.querySelector('#new-avatar').files[0];

            const fd = new FormData();
            fd.append("username", user);    
            fd.append("email", email);   
            fd.append("password", pass);   
            fd.append("confirmation", conf);      
            fd.append("profile_img", avatar);

            console.log(fd.get("profile_img"));
            

            fetch('/register', {
                method: 'POST',
                body: fd,
                headers: { "X-CSRFToken": getCookie("csrftoken") },
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(result => {
                document.querySelector('#register-msg').innerHTML = result['message'];
                if (result['status'] === 200) {
                    window.location.reload();
                }
            })
            .catch(error => { alert(`Error: ${error}`)});
        });
        
        document.querySelector('#user-button').addEventListener('click', () => {
            const s = document.querySelector('#user-button').innerHTML
            if (s.includes('Log In')) {    //If user is NOT logged in
                document.querySelector('#login').style.display = 'block';
                document.querySelector('#login').style.opacity = '1';
    
            } else {
                document.querySelector('#dw')
                document.querySelector('#profile').style.display = 'block';
                document.querySelector('#profile').style.opacity = '1';
            }
        });

        document.querySelector('#info-popup').addEventListener('click', () => {
            document.querySelector('#info-popup').style.display = 'none';
            document.querySelector('#info-popup').innerHTML = "";   //Clears the children
        });
    
        document.querySelector('#np-button').addEventListener('click', () => {
            canClick = false;
    
            for (timer of timerInstances) {
                clearTimeout(timer.t);
            }
    
            document.querySelector('#kanji-container').style.animation = 'fadePage 1s 0s ease-in-out 1 forwards running';
            document.querySelector('#bottom-container').style.animation = 'fadePage 1s 0s ease-in-out 1 forwards running';
        });
    
        document.querySelector('#kanji-container').addEventListener('animationend', (event) => {
            if (event['animationName'] === 'fadePage') {
                document.querySelector('#kanji-container').style.display = 'none';
                document.querySelector('#bottom-container').style.display = 'none';
                document.querySelector('#post-container').style.opacity = '0';
                document.querySelector('#post-container').style.display = 'flex';
                document.querySelector('#selected-kanji').innerHTML = postKanji.join(', ');
                document.querySelector('#hidden-kanji').value = postKanji.join(', ');
                document.querySelector('#post-container').style.animation = 'fadePage 1s 0s ease-in-out reverse 1 forwards running';
            }
        });
    
        document.querySelector('#bottom-container').addEventListener('animationend', () => {
            document.querySelector('#bottom-container').style.color = document.body.style.color;
            document.querySelector('#bottom-container').style.animation = '';
        });

        document.addEventListener('visibilitychange', () => {
            if(document.hidden) {
                console.log("Lost focus! Pausing generation...");
                for (timer of timerInstances) {
                    clearTimeout(timer.t);
                }
            } else {
                console.log('Focus regained! Resuming generation...');
                t1 = new CreateTimer1(0, 1000);
                t2 = new CreateTimer2(750, 2750);
                t3 = new CreateTimer3(2500, 4500);
            }
        });
    }
 
    function generate() {
        //Generates kanji divs using the KanjiDev API
        
        const screenW = window.screen.availWidth;
        const overlay = document.querySelector('#info-popup')
        const index = Math.floor(Math.random() * LENGTH);
        const kanjiDiv = document.createElement('span');
        const kanji = KANJI[index];

        kanjiDiv.innerHTML = kanji;
        kanjiDiv.classList.add('floating-kanji', 'hover-scale');
        kanjiDiv.style.fontSize = `${window.innerWidth * (48 / screenW)}px`

        kanjiDiv.style.color = randomColor(overlay.dataset.isDay);
        kanjiDiv.style.outlineStyle = 'none';
        kanjiDiv.style.outlineColor = 'none';
        kanjiDiv.addEventListener('animationend', (event) => {
            if (event['animationName'] === 'drop') {

                const isDay = document.body.dataset.isDay;
                const cardSpan = document.createElement('div');
                cardSpan.innerHTML = kanjiDiv.innerHTML;
                cardSpan.style.setProperty('--w', cardSpan.offsetWidth);
                
                if (isDay === 'true') {
                    cardSpan.style.backgroundColor = '#5C496D';
                    cardSpan.style.border = '1px solid #393939'
                    //box-shadow: inset 0 0 0 10px rgba(0, 255, 0, 0.5);
                } else {
                    cardSpan.style.backgroundColor = '#393939';
                    cardSpan.style.border = '1px solid #C3BAE6'
                }

                const bc = document.querySelector('#bottom-container');
                const ktp = document.querySelector('#kanji-to-post');
                const npb = document.querySelector('#np-button');
                cardSpan.classList.add('kanjiCard', 'hover-scale');
                cardSpan.onanimationend = () => {
                    cardSpan.remove();
                    if (ktp.children.length === 0) {
                        npb.style.display = 'none';
                    }

                    bc.style.left = ((window.innerWidth - bc.offsetWidth) / 2) + 'px';
                }
                cardSpan.addEventListener('click', (event) => {
                    if (event.detail === 1 && canClick) {
                        canClick = false;
                        clickTimer = setTimeout( () => {
                            kanjiInfoPopup(cardSpan.innerHTML);
                        }, 200);
                    }
                })
                cardSpan.addEventListener('dblclick', () => {
                    
                    canClick = true;
                    clearTimeout(clickTimer);
                    const i = postKanji.indexOf(cardSpan.innerHTML);
                    postKanji.splice(i, 1);
                    cardSpan.style.pointerEvents = 'none';
                    cardSpan.style.position = 'relative';
                    cardSpan.style.setProperty('--mb', `${cardSpan.offsetHeight}px`)
                    cardSpan.style.setProperty('--w', `${cardSpan.offsetWidth}px`)
                    cardSpan.style.animation = 'deleteCard 0.5s 0s ease-in-out 1 forwards running'
                })
                ktp.appendChild(cardSpan);
                npb.style.display = 'block';
                bc.style.left = ((window.innerWidth - bc.offsetWidth) / 2) + 'px';
            }

            kanjiDiv.remove();
        });

        kanjiDiv.addEventListener('click', (event) => {

            //Prevent popup if kanji is double clicked
            if (event.detail === 1 && canClick) {

                //Prevents user from opening multiple info-popup's in rapid succession
                canClick = false;

                clickTimer = setTimeout( () => {
                    kanjiInfoPopup(kanjiDiv.innerHTML);
                }, 200);
            }
        });

        kanjiDiv.addEventListener('dblclick', () => {
            
            canClick = true;
            clearTimeout(clickTimer);

            if (postKanji.length < 5) {
                postKanji.push(kanjiDiv.innerHTML);
                kanjiDiv.style.pointerEvents = 'none';              //Prevent hover scale event from messing with pathing
                const ktp = document.querySelector('#kanji-to-post');
                const bc = document.querySelector('#bottom-container').getBoundingClientRect();
                const p = kanjiDiv.getBoundingClientRect();         //Absolute coords of the clicked Kanji
                const x1 = (p.left + p.right) / 2;     //The "visual" x coords
                const y1 = ((p.bottom - p.top) / 2) + p.top - ((document.body.offsetHeight + window.innerHeight) / 2);    //The "visual" y coords
                const x2 = document.body.offsetWidth / 2;                   //End x coords (middle of screen)
                const y2 = (bc.top - document.body.getBoundingClientRect().bottom);         //End y coords (top of bottom container)
                const cx = (x1 + x2) / 2;                           //Curve point x coords
                const cy = y1 - 150;                                //Curve point y coords
                document.body.appendChild(kanjiDiv);

                kanjiDiv.style.offsetPath = `path("M${x1},${y1} Q${cx},${cy} ${x2},${y2}")`;  //"Start coords, coords of curve point, end coords"
                kanjiDiv.style.setProperty('--fs1', `${kanjiDiv.style.fontSize}`);
                kanjiDiv.style.setProperty('--fs2', `${ktp.style.fontSize}`);
                kanjiDiv.style.animation = 'drop 0.7s 0s ease-in-out 1 forwards running';
            } else {
                // Play shake animation on post kanji holder, pop-up to alert user it is full.
                const bc = document.querySelector('#bottom-container');
                const isf = document.querySelector('#is-full');

                if (displayFullTimer) {
                    clearTimeout(displayFullTimer);
                }
                
                isf.innerHTML = 'Kanji box is full! Click it to delete the last addition!';
                bc.style.left = ((window.innerWidth - bc.offsetWidth) / 2) + 'px';
                bc.style.setProperty('--l0', `${bc.style.left}`);
                bc.style.setProperty('--l1', `${parseFloat(bc.style.left) * 0.99}px`);
                bc.style.setProperty('--l2', `${parseFloat(bc.style.left) * 1.01}px`);
                bc.style.color = 'darkred';
                isf.style.color = document.body.style.color;
                isf.style.opacity = '1';
                displayFullTimer = setTimeout(() => {
                    isf.style.opacity = '0';
                    bc.style.left = ((window.innerWidth - bc.offsetWidth) / 2) + 'px';
                }, 3000);
                bc.style.animation = 'shake 0.1s 0s ease-in-out 3 forwards running';
            }
        })

        return kanjiDiv;
    }

    function generate1() {
        div = generate();
        document.querySelector('#kanji-1').appendChild(div);
        const waitTime = randomNumber(4500, 8000); 
        let t = new CreateTimer1(waitTime);
    }

    function generate2() {
        div = generate();
        document.querySelector('#kanji-2').appendChild(div);
        const waitTime = randomNumber(4500, 8000); 
        let t = new CreateTimer2(waitTime);
    }

    function generate3() {
        div = generate();
        document.querySelector('#kanji-3').appendChild(div);
        const waitTime = randomNumber(4500, 8000); 
        let t = new CreateTimer3(waitTime);
    }

    function randomColor(isDay) {
        let base = [0,0,0,0];
        const v = 30;
        const sign1 = (Math.random() < 0.5) ? -1: 1;
        const sign2 = (Math.random() < 0.5) ? -1: 1;
        const sign3 = (Math.random() < 0.5) ? -1: 1;
        const cvar1 = sign1 * Math.floor(Math.random() * v);
        const cvar2 = sign2 * Math.floor(Math.random() * v);
        const cvar3 = sign3 * Math.floor(Math.random() * v);
        const avar = Math.floor(Math.random() * 120);

        if (isDay === 'true') {
            base = [152, 206, 228, 255];
        } else {
            base = [175, 136, 191, 255];
        }

        base[0] += cvar1;
        base[1] += cvar2;
        base[2] += cvar3;
        base[3] -= avar;

        return `rgb(${base[0]}, ${base[1]}, ${base[2]}, ${base[3]})`;
    }

    function randomNumber(start, end) {
        return end - Math.floor(Math.random() * (end - start))
    }

    function kanjiInfoPopup(kanji) {
        const div = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');
        const overlay = document.querySelector('#info-popup')
        const screenW = window.screen.availWidth;

        div.setAttribute('id', 'info-night');
        div.style.backgroundColor = (overlay.dataset.isDay === 'true') ? '#D9B872' : '#2B2231';
        div.style.color = (overlay.dataset.isDay === 'true') ? '#3051b2' : '#C3BAE6';
        const bc = (overlay.dataset.isDay === 'true') ? '#604B6C' : '#C3BAE6';
        div.style.border = `2px solid ${bc}`;
        div.style.top = '50%';
        div.style.transform = 'translateY(-50%)';
        div2.style.width = '100%';
        div2.style.textAlign = 'center';
        div2.style.fontSize = `${window.innerWidth * (250 / screenW)}px`;
        div2.setAttribute('data-basesize', '250');
        div2.innerHTML = ". . ."    //Placeholder while the fetch info loads
        div3.style.width = '100%';
        div3.style.textAlign = 'center';
        div3.style.fontSize = `${window.innerWidth * (60 / screenW)}px`;
        div3.setAttribute('data-basesize', '60');
        div4.style.width = '100%';
        div4.style.textAlign = 'center';
        div4.style.fontSize = `${window.innerWidth * (60 / screenW)}px`;
        div4.setAttribute('data-basesize', '60');

        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        document.querySelector('#info-popup').appendChild(div);
        document.querySelector('#info-popup').style.display = 'flex';

        fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`)
        .then(response => response.json())
        .then(data => {
            div2.innerHTML = data['kanji'];
            div3.innerHTML = data['meanings'].slice(0, 1);
            div4.innerHTML = data['on_readings'].slice(0, 1) + ', ' + data['kun_readings'].slice(0, 1);
            canClick = true;
        });
    }

    function calculatePoints(postAmnt, userComments, userPostComments) {
        const pts = (postAmnt * 150) + (userComments * 80) + (userPostComments * 95)

        return pts.toString().replace("/\B(?=(\d{3}))+(?!\d))/g", ",");   //Returns comma formatted number
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
   
});