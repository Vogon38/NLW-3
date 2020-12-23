//create map
const map = L.map('mapid').setView([-27.2197025,-49.6517827], 15);

//create an add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

//create an add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

//add space for photos
function addPhotoField() {
    //get photos container #images
    const container = document.querySelector('#images')

    //get container to duplicate it .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')

    //clone the last add image
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    //verify if the field is null, if yes, do not add to the images container
    const input = newFieldContainer.children[0]

    if(input.value == '') {
        return
    }

    //clear the field before add to images container
    newFieldContainer.children[0].value = ''

    //add clone to the #image container
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length < 2) {
        //clear the field value
        span.parentNode.children[0].value = ''
        return
    }

    // delete the field
    span.parentNode.remove()
}

//select yes or no
function toggleSelect(event) {
    //take the .active class (buttons)
    document.querySelectorAll('.button-select button')
    .forEach(function(button) {
        button.classList.remove('active')
    })
    
    //put .active class on the clicked button
    const button = event.currentTarget
    button.classList.add('active')

    //update the select value to my hidden input
    const input = document.querySelector('[name="open_on_weekends"]')
    console.log(input)

    input.value = button.dataset.value
    
}