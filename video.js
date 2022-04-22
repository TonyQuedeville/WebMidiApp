/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    Gestion des vidéos en incrustation
*/

const urlVideo = "https://www.youtube.com/embed/ro3e6WaOZdE";
//const urlVideo = "https://www.youtube.com/watch?v=wNgm5mPsWVA";
//const urlVideo = "https://www.youtube.com/watch?v=BKy7bHe5hgg";

/* Retour */
$('main').click(function(){
    //console.log("video off")
    $('#icnVideo').removeClass('invisible');
    $('.video').addClass('invisible');
    $('#video').remove();
    /*-*/
});
/*---*/

/* Vidéo */
$('#icnVideo').click(function(){
    //console.log("video on")
    $('#icnVideo').addClass('invisible');
    $('.video').removeClass('invisible');
    $('.video').prepend(`
        <iframe
            id="video" 
            width="50%" 
            height="50%" 
            src="${urlVideo}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `);
});

