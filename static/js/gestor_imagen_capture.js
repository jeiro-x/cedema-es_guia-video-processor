export function saludar() {
    console.log('Hola desde el modulo de gestor_imagen_capture.js');
}

// ANCHOR : CAPTURE SECOND
export function capture_second(id) {
    var video = document.getElementById(id);
    var rondedNum = Math.round(video.currentTime);
    return rondedNum;
}

// ANCHOR : CREATE ENLACE OF DOWNLOAD
function DownloadImageCaptured(base64Image) {
    console.log('DESDE DOWNLOAD:', base64Image);

    var link = document.createElement('a');
    link.href = base64Image;
    link.download = 'static/temp/frame.jpg'; // establece el nombre del archivo de la imagen
    link.click(); // inicia la descarga

    // Muestra la imagen en una etiqueta <img>
    var img = document.getElementById('img_capture');
    img.src = base64Image;
}

// ANCHOR : CREATE ELEMENT CAPTURE
export function create_elemet_capture(url, second){
    // Crea un elemento de video y carga el video
    var video = document.createElement('video');
    video.src = url;
    video.className = 'video_styles';
    // Crea un elemento de canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    video.currentTime = second; // busca hasta ese segundo

    video.addEventListener('loadeddata', function() {
        // Asegúrate de que el canvas tenga el mismo tamaño que el video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Dibuja el frame actual del video en el canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Obtiene la imagen en formato base64
        var base64Image = canvas.toDataURL('image/jpeg');
    });
    document.getElementById('captura_output').innerHTML = '';
    document.getElementById('captura_output').appendChild(video);
    // console.log('Imagen capturada:', base64Image);
    // console.log(base64Image)
    // return base64Image;
}

// ANCHOR : CREATE ELEMENT VIDEO
export function create_element_video(url){
    // Crea el elemento <video>
    var video = document.createElement('video');
    video.id = 'video_reproductor';
    video.controls = true;

    // Crea el elemento <source>
    var source = document.createElement('source');
    source.src = url;
    source.type = 'video/mp4';

    // Agrega el elemento <source> al elemento <video>
    video.appendChild(source);

    // Agrega el elemento <video> al cuerpo del documento
    document.getElementById('video_output').innerHTML = '';
    document.getElementById('video_output').appendChild(video)
}


function capture() {
    alert("Capturando video...")
    console.log("Capturando video...");
    var fileInput = document.getElementById('video_file');
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo


    var numSecond = capture_second('video_reproductor');
    console.log(numSecond);

    create_elemet_capture(url, numSecond);

}