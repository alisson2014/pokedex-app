import { useState } from "react"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { atomPokemon } from "../../recoil/atoms"
import { selectorGetPokemon } from "../../recoil/selectors"

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
          <div>
            <img
              width="150px"
              src={getLoadablePokemon?.contents?.sprites?.front_default}
              alt={getLoadablePokemon?.contents?.name}
            />
            <h3>{getLoadablePokemon?.contents?.name}</h3>
          </div>
        )}
    </div>
  )
}

export default HomePage
