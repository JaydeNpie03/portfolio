document.addEventListener('DOMContentLoaded', () => {

    setBG();
    
    function setBG() {
        //Changes website theme depending on the user's local time
        const now = new Date();
        document.body.style.fontFamily = "'Times New Roman', Times, serif";

        if (now.getHours() < 6 || now.getHours() >= 20) {
            //Night theme
            document.body.style.backgroundImage = "url('static/final_project/media/bgNight.png')";
            document.body.style.backgroundColor = '#2C49BA'
            document.querySelector('#logo').setAttribute('src', '/static/final_project/media/kazeniNight.png')
            document.body.style.color = '#C3BAE6'
            document.body.dataset.isDay = 'false';
        } else {
            //Day theme
            document.body.style.backgroundImage = "url('/static/final_project/media/bgDay.png')";
            document.querySelector('#logo').setAttribute('src', '/static/final_project/media/kazeniDay.png')
            document.body.style.backgroundColor = '#5C496D'
            document.body.style.color = '#8A9FDF'
            document.body.dataset.isDay = 'true';
        }
    }
});