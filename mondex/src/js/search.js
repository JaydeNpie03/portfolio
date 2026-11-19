document.addEventListener('DOMContentLoaded', () => {
    
    const screenW = window.screen.availWidth;

	document.getElementById('searchBtn').addEventListener('click', () => {
		let monsterName = document.getElementById('searchTxt').value;
		search(monsterName);
	});

    async function search(monster) {
        //Search for given monster name and update infoBody div with info
		console.log(`Fetch link: https://mhw-db.com/monsters?q={"name":"${monster}"}`);
		
        await fetch(`https://mhw-db.com/monsters?q={"name":"${monster}"}`)
        .then(response => response.json())
        .then(monsterInfo => {
            console.log(monsterInfo);
        })
        .catch(error => { console.log(`Error: ${error}`) } )
    }


    function randomNumber(start, end) {
        return end - Math.floor(Math.random() * (end - start))
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
	
	//======================================================
	//================== REACT COMPONENTS ==================
	
	function
   
});