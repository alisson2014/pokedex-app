import { useState } from "react"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { atomPokemon } from "../../recoil/atoms"
import { selectorGetPokemon } from "../../recoil/selectors"

import Card from "../../components/Card"

const HomePage = () => {
  //local: state
  const [searchPokemon, setSearchPokemon] = useState("")
  const [pokemon, setPokemon] = useRecoilState(atomPokemon)

  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon)

  return (
    <div>
      <input type="text" onChange={(e) => setSearchPokemon(e.target.value)} />
      <button onClick={() => setPokemon(searchPokemon)}>Buscar</button>
      {getLoadablePokemon?.state === "loading" && <div>Loading ...</div>}
      {getLoadablePokemon?.state === "hasValue" &&
        getLoadablePokemon?.contents !== undefined && (
          <Card
            type={getLoadablePokemon?.contents.types[0]?.type?.name}
            id={getLoadablePokemon?.contents.id}
            preview={
              getLoadablePokemon?.contents.sprites?.versions?.[
                "generation-v"
              ]?.["black-white"].animated?.front_default
            }
            image={
              getLoadablePokemon?.contents?.sprites?.other?.dream_world
                ?.front_default
            }
            name={getLoadablePokemon?.contents?.name}
          />
        )}
    </div>
  )
}

export default HomePage
