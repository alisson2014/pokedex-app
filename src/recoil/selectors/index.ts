import { selector } from "recoil"
import { requester } from "../../api/requester"
import { IPokemon, IPokemonFetch } from "../../interface"
import {
  atomPokemonFetch,
  atomPokemonOffset,
  atomPokemonSearch,
} from "../atoms"
import {
  atomHashPokemon,
  atomHashPokemonsFetch,
  atomHashPokemonsList,
} from "../hashs"

export const selectorFetchPokemons = selector({
  key: "selectorFetchPokemons",
  get: async ({ get }) => {
    get(atomHashPokemonsFetch)
    const offset = get(atomPokemonOffset)
    const { data } = await requester({
      baseURL: "https://pokeapi.co/api/v2/",
    }).get(`pokemon?limit=15&offset=${offset}`)

    return data
  },
})

export const selectorGetPokemons = selector({
  key: "selectorGetPokemons",
  get: async ({ get }) => {
    get(atomHashPokemonsList)
    const pokemonFetch = get(atomPokemonFetch)

    if (pokemonFetch.length > 0) {
      const list = pokemonFetch.map((pokemon: IPokemonFetch) => pokemon.name)

      const result = list.map(async (pokemon) => {
        const { data } = await requester({
          baseURL: "https://pokeapi.co/api/v2/",
        }).get(`pokemon/${pokemon.toLowerCase().trim()}`)

        return data
      })

      const pokemonsList = Promise.all(result)

      return pokemonsList
    }
  },
})

export const selectorGetPokemon = selector<IPokemon>({
  key: "selectorGetPokemon",
  get: async ({ get }) => {
    get(atomHashPokemon)
    const pokemon = get(atomPokemonSearch)
    if (pokemon) {
      const { data } = await requester({
        baseURL: "https://pokeapi.co/api/v2/",
      }).get(`pokemon/${pokemon.toLowerCase().trim()}`)

      return data
    }
  },
})
