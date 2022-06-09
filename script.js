let photosArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
let photosFavourite = [];
let photosBin = [];
let photosSelect = [];

// define arrays
let page = 1;

function foundArray() {
    let array;
    if (page == 1) { array = photosArray };
    if (page == 2) { array = photosFavourite };
    if (page == 3) { array = photosBin };
    return array;
}

// start mainpage
function loadPhotos(current) {
    let photos = document.getElementById('photos');
    photos.innerHTML = '';

    for (let i = 0; i < current.length; i++) {
        photos.innerHTML += `
        <div class="pictureFrame" id="pictureFrame">
            <img class="currentPhoto" id="photo" onclick="currentPhoto(${i})" src="./img/${current[i]}.webp">
            <img id="mark${i}" class="mark" onclick="markSelection(${i})" src="./img/task.png">
        </div>
        `;
        photoNr();
    }
}

// diaShow page
function diaShow(i) {
    let photo = document.getElementById('diabox');
    document.getElementById('body').classList.add('hide');

    let array = foundArray();

    photo.innerHTML = `
        <div class="diaShow">
            <div class="icon">
                <div onclick="backCurrent()"><a href="#"><img src="./img/return.png"></a></div>
                <!-- <H2>Fotos ${array.length}</H2> -->
                <div id="favouriteHide" onclick="favourite(${i})"><a href="#"><img src="./img/faforit.png"></a></div>
                <div id="binHide" onclick="bin(${i})"><a href="#"><img src="./img/bin.png"></a></div>
                <div id="deleteBinHide" onclick="deleteBin(${i})"><a href="#"><img src="./img/delete.png"></a></div>
            </div>
            <div class="diaLeft" onclick="diaLeft(${i})">
                <a href="#"><img src="./img/arrow.png"></a>
            </div>
            <img class="diaPhoto" id="pictureEnd" src="./img/${array[i]}.webp">
            <div class="diaRight" onclick="diaRight(${i})">
                <a href="#"><img src="./img/arrow.png"></a>
            </div>
        </div>
        `;
    photoNr();

    // if array null -> pucture black
    if (array[i] == null) {
        document.getElementById('pictureEnd').removeAttribute('src');
    }

    // photo
    if (page == 1) {
        let a = document.getElementById('deleteBinHide');
        a.parentNode.removeChild(a);
    }
    // favourite
    if (page == 2) {
        let a = document.getElementById('favouriteHide');
        a.parentNode.removeChild(a);
        let b = document.getElementById('deleteBinHide');
        b.parentNode.removeChild(b);
    }
    // bin
    if (page == 3) {
        let a = document.getElementById('binHide');
        a.parentNode.removeChild(a);
    }
}

function photoNr() {
    document.getElementById('photoNr1').innerHTML = photosArray.length;
    document.getElementById('photoNr2').innerHTML = photosFavourite.length;
    document.getElementById('photoNr3').innerHTML = photosBin.length;
}

// photo select Section
function photoSelection(i) {
    document.getElementById('selectMenu').classList.remove('d-none');
    let select = document.getElementById('selectMenu');

    select.innerHTML = `
    <div class="selectIcons">
        <a href="#"><img onclick="favouriteSelector(${i})" src="./img/faforitB.png"></a>
        <a href="#"><img onclick="binSelector(${i})" src="./img/binB.png"></a>
        <a href="#"><img onclick="deleteBinSelector(${i})" src="./img/delete.png"></a>
    </div>
    `;
    photoNr();
}

// photo deSelect Section
function photoDeSelection() {
    photosSelect = [];
    document.getElementById('selectMenu').classList.add('d-none');
}

// mark Select Section
function markSelection(i) {
    let array = foundArray();

    if (photosSelect.includes(array[i])) {
        let name = array[i]
        let x = photosSelect.indexOf(name);
        markSelectOut(i, x);
    } else {
        markSelectIn(i);
    }
}

// if is select
function markSelectIn(i) {
    document.getElementById('mark' + i).classList.toggle('markSelect');
    document.getElementById('mark' + i).style.opacity = '1';

    photoSelection(i);

    let array = foundArray();
    photosSelect.push(array[i])
}

// if not select
function markSelectOut(i, x) {
    document.getElementById('mark' + i).classList.toggle('markSelect');
    document.getElementById('mark' + i).style.opacity = '1';

    photosSelect.splice(x, 1)
}

// buttons for select Section
function favouriteSelector() {
    for (let i = 0; i < photosSelect.length; i++) {
        photosFavourite.push(photosSelect[i]);

        let array = foundArray();
        let x = array.indexOf(photosSelect[i]);
        array.splice(x, 1);
    }
    photosSelect = [];
    backCurrent()
}

function binSelector() {
    for (let i = 0; i < photosSelect.length; i++) {
        photosBin.push(photosSelect[i]);

        let array = foundArray();
        let x = array.indexOf(photosSelect[i]);
        array.splice(x, 1);
    }
    photosSelect = [];
    backCurrent()
}

function deleteBinSelector() {
    for (let i = 0; i < photosSelect.length; i++) {
        let array = foundArray();
        let x = array.indexOf(photosSelect[i]);
        array.splice(x, 1);
    }
    photosSelect = [];
    backCurrent()
}

// select phote -> diaShow
function currentPhoto(i) {
    photoDeSelection();

    document.getElementById('diabox').classList.remove('d-none');
    diaShow(i);
}

// Photos move left
function diaLeft(i) {
    if (i > 0) {
        let x = i - 1;
        diaShow(x);
    }
}

// Photos move right
function diaRight(i) {
    let array = foundArray();
    if (i < array.length - 1) {
        let x = i + 1;
        diaShow(x);
    }
}

// button diaShow
function favourite(i) {
    let array = foundArray();
    if (array[i]) {
        photosFavourite.push(array[i]);
        array.splice(i, 1);
        diaShow(i);
    }
}

function bin(i) {
    let array = foundArray();
    if (array[i]) {
        photosBin.push(array[i]);
        array.splice(i, 1);
        diaShow(i);
    }
}

function deleteBin(i) {
    let array = foundArray();
    if (array[i]) {
        array.splice(i, 1);
        diaShow(i);
    }
}

// back selection pages
function backCurrent() {
    document.getElementById('body').classList.remove('hide');
    if (page == 1) { backPage(); }
    if (page == 2) { favouritePage(); }
    if (page == 3) { binPage(); }
}

// button open Pages
function backPage() {
    photoDeSelection();

    document.getElementById('titleText').innerHTML = 'Fotos ' + photosArray.length;
    document.getElementById('marked1').classList.add('marked');
    document.getElementById('marked2').classList.remove('marked');
    document.getElementById('marked3').classList.remove('marked');

    document.getElementById('diabox').classList.add('d-none');
    loadPhotos(photosArray);
    page = 1;
}

function favouritePage() {
    photoDeSelection();

    document.getElementById('titleText').innerHTML = 'Favoriten ' + photosFavourite.length;
    document.getElementById('marked2').classList.add('marked');
    document.getElementById('marked1').classList.remove('marked');
    document.getElementById('marked3').classList.remove('marked');

    document.getElementById('diabox').classList.add('d-none');
    loadPhotos(photosFavourite);
    page = 2;
}

function binPage() {
    photoDeSelection();

    document.getElementById('titleText').innerHTML = 'Papierkorb ' + photosBin.length;
    document.getElementById('marked3').classList.add('marked');
    document.getElementById('marked1').classList.remove('marked');
    document.getElementById('marked2').classList.remove('marked');

    document.getElementById('diabox').classList.add('d-none');
    loadPhotos(photosBin);
    page = 3;
}

function help() {
    document.getElementById('help').classList.remove('d-none');
    document.getElementById('body').classList.add('hide');
}

function close2(){
    console.log('ok')
    document.getElementById('help').classList.add('d-none');
    document.getElementById('body').classList.remove('hide');
}