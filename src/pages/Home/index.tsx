//use state
import { useEffect, useState } from "react"

//use recoil
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { atomPokemonFetch, atomPokemonList, atomPokemonOffset, atomPokemonSearch, atomPokemon } from "../../recoil/atoms"
import { selectorFetchPokemons, selectorGetPokemon, selectorGetPokemons } from "../../recoil/selectors"

//card
import Card from "../../components/Card"

const HomePage = () => {
  //local: state
  const [searchPokemon, setSearchPokemon] = useState("")

  //recoil: states
  const setPokemon = useSetRecoilState(atomPokemonSearch)
  const setFetchPokemons = useSetRecoilState(atomPokemonFetch)
  const [pokemonsOffset, setPokemonsOffset] = useRecoilState(atomPokemonOffset)
  const [pokemonList, setPokemonList] = useRecoilState(atomPokemonList)

  //recoil: loadable
  const getLoadablePokemons = useRecoilValueLoadable(selectorGetPokemons)
  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon)
  const fetchLoadablePokemon = useRecoilValueLoadable(selectorFetchPokemons)

  useEffect(() => {
    if (fetchLoadablePokemon.state === "hasValue" && fetchLoadablePokemon.contents !== undefined) {
      setFetchPokemons(fetchLoadablePokemon.contents.results)
    }
  }, [fetchLoadablePokemon.state, fetchLoadablePokemon.contents])

  useEffect(() => {
    if (getLoadablePokemons.state === "hasValue" && getLoadablePokemon.contents !== undefined) {
      if (pokemonList.length > 0) {
        setPokemonList(pokemonList.concat(getLoadablePokemons?.contents))
      } else {
        setPokemonList(getLoadablePokemons.contents)
      }
    }

  }, [getLoadablePokemons.state, getLoadablePokemons.contents])

  console.log(pokemonList)

  return (
    <header>
      <input type="text" onChange={(e) => setSearchPokemon(e.target.value)} />
      <button onClick={() => setPokemon(searchPokemon)}>Buscar</button>
      {getLoadablePokemon?.state === "loading" && <div>Loading ...</div>}
      {getLoadablePokemon?.state === "hasValue" &&
        getLoadablePokemon?.contents !== undefined && (
          <Card
            type={getLoadablePokemon?.contents.types[0]?.type?.name}
            id={getLoadablePokemon.contents.id}
            preview={
              getLoadablePokemon?.contents.sprites?.versions?.[
                "generation-v"
              ]?.["black-white"]?.animated?.front_default
            }
            image={
              getLoadablePokemon?.contents?.sprites?.other?.dream_world
                ?.front_default || getLoadablePokemon?.contents.sprites.other?.["official-artwork"]?.front_default || ""
            }
            name={getLoadablePokemon?.contents?.name}
          />
        )}
      <button onClick={() => setPokemonsOffset(pokemonsOffset + 15)}>Carregar mais</button>
    </header>
  )
}

export default HomePage
