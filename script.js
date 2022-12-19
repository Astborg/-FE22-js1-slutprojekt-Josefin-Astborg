
const small = document.getElementById('small')
const medium = document.getElementById('medium')
const large = document.getElementById('large')
const btn = document.getElementById('btn')
const fotoShow = document.getElementById('fotoShow')
const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')


btn.addEventListener('click', (e) =>{
    searchFlickr()
    e.preventDefault()
    removeItems() 
})


function searchFlickr(){
    let sorting = document.getElementById("sorting").value;
    const searchF = document.getElementById('sök').value
    const howMany = document.getElementById('number').value
    let sortingValue = '';
    let checkbox = '';

    //selecting
    if (sorting === "Date") {
        sortingValue = "date-posted-asc";
        console.log(sortingValue);
      } else if (sorting === "Interestingness") {
        sortingValue = "interestingness-asc";
        console.log(sortingValue);
      } else if (sorting === "Relevance") {
        sortingValue = "relevance";
        console.log(sortingValue);
      }
      console.log(sortingValue)

//animation
    let animation =
    anime ({
    targets: 'div.box',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    backgroundColor: 'hsl(200, 50%, 50%)',
    translateY: [
        {value: 200, duration: 1000},
        {value:0, duration: 2000}
    ],
    loop: false,
    rotate: {
    value: '1turn',
    },
    borderRadius: 50,
    direction: 'alternate',
    easing: 'easeInOutQuad',
    opacity: '0'
    });
    animation.play();

    //fetch data from Flickr
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e7e5f667179d941ec293b818e86940f6&text=${searchF}&per_page=${howMany}&sort=${sortingValue}&format=json&nojsoncallback=1`)
    .then((response) => response.json())
    .then ((data) => {
    console.log(data)
    data.photos.photo.forEach((phot) => {
    fotoShow.innerHTML += `<img src="https://live.staticflickr.com/${phot.server}/${phot.id}_${phot.secret}_${checkbox}.jpg"/>`

    })
})
     .catch((error) => {
    error2.innerHTML = `<p>You have forgotten to fill in all values</p>`
    console.log(error)
    })


    //checkboxes sizes
    if (small.checked){
        checkbox = 'm'
        error1.innerHTML = ''
    }else if (medium.checked){
        checkbox = 'z'
        error1.innerHTML = ''
    }else if (large.checked){
        checkbox = 'b'
        error1.innerHTML = ''
    } else{
    error1.innerHTML = `<p>You have forgotten to choose size</p>`
       console.log(error1)
    }

}

    
function removeItems(){
    fotoShow.innerHTML = ''
    error2.innerHTML = ''
    
}


