import axios from "axios"

const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/'
})

export const pokemonAPI = {
    getPokemons(){
        const promise = instance.get(``)
        return promise
    },
    getPokemon(id: number){
        const promise = instance.get(`${id}`)
        return promise    
    } 

}