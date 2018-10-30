const axios = require('axios');
const Promise = require('bluebird');

axios.get('https://pokeapi.co/api/v2/pokemon/42/')
    .then(function (response) {
        console.log(`Name: ${response.data.name}\nHeight:${response.data.height}\nWeight:${response.data.weight}`);
    })
    .catch(function (error) {

        console.log(error);
    });

Object.prototype.printElements = function(){
    let self = this.data.results;
    self.forEach(function (element) {
        console.log(element.name);
    });
};

let pokemonsUrls = [];
for(let i = 1; i<4; i++){
    pokemonsUrls.push(axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${i}&offset=${i*10}`));
}
/*Promise.all(pokemonsUrls).then((resolve, reject)=>{
    resolve.forEach(function (elements) {
        elements.printElements();
    });
});

Promise.any([
    axios.get('https://pokeapi.co/api/v2/pokemon/1/'),
    axios.get('https://pokeapi.co/api/v2/pokemon/4/'),
    axios.get('https://pokeapi.co/api/v2/pokemon/7/')
    ]).then(function (resolve, reject) {
    console.log(`${resolve.data.id}: ${resolve.data.name}`);
});

Promise.props({
    pokemons: axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10'),
    items: axios.get('https://pokeapi.co/api/v2/item/?limit=10'),
    locations: axios.get('https://pokeapi.co/api/v2/location/?limit=10')
}).then(function(resolve, reject){
    console.log('///////////////////////Pokemons: ');
    console.log(resolve.pokemons.printElements());
    console.log('///////////////////////Items: ');
    console.log(resolve.items.printElements());
    console.log('///////////////////////Locations: ');
    console.log(resolve.locations.printElements());
});*/

let berries = [];
for(let berryNum = 1; berryNum<5; berryNum++){
    berries.push(`https://pokeapi.co/api/v2/berry/${berryNum}/`);
}
Promise.map(berries, function (berryUrl) {
    return axios.get(berryUrl)
}).then(function (resolve, reject) {
    resolve.forEach((berry)=>{
        console.log(berry.data.name);
    })
});