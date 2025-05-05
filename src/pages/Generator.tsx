/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonText,
  IonImg,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";

type PokemonStats = {
  hp: number;
  attack: number;
  defence: number;
  speed: number;
};

type Pokemon = {
  name: string;
  img: string;
  stats: PokemonStats;
};

const Generator: React.FC = () => {
  const API_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const getPokeData = async () => {
    try {
      const id = Math.floor(Math.random() * 150) + 1;
      const response = await fetch(`${API_URL}${id}`);
      const data = await response.json();

      const newPokemon: Pokemon = {
        name: data.name,
        img:
          data.sprites?.other?.dream_world?.front_default ||
          data.sprites.front_default,
        stats: {
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defence: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
        },
      };

      setPokemon(newPokemon);
      setHasGenerated(true);
      await savePokemon(newPokemon);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const savePokemon = async (pokemon: Pokemon) => {
    const { value } = await Preferences.get({ key: "pokemonList" });
    const currentList = value ? JSON.parse(value) : [];

    const isDuplicate = currentList.some(
      (existingPokemon: Pokemon) => existingPokemon.name === pokemon.name
    );

    if (!isDuplicate) {
      const updatedList = [...currentList, pokemon];
      await Preferences.set({
        key: "pokemonList",
        value: JSON.stringify(updatedList),
      });
    } else {
      console.log(`${pokemon.name} is already in the list.`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Generator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-text-center">
        {!hasGenerated && (
          <>
            <IonImg src="/src/images/pokegene.svg"></IonImg>
            <IonText color="white">
              <h4>Generate a Pokémon – Classic Style!</h4>
              <p>
                Click the "Generate" button to discover a randomly selected
                Pokémon from the original 150.
              </p>
              <p>
                Every Pokémon you generate is automatically added to{" "}
                <strong>Collection</strong>, so you can revisit your discoveries
                anytime.
              </p>
            </IonText>
          </>
        )}

        {pokemon && (
          <IonCard className="ion-padding">
            <IonCardTitle className="ion-text-center">
              {pokemon.name.toUpperCase()}
            </IonCardTitle>
            <IonCardContent>
              {pokemon.img && (
                <img
                  src={pokemon.img}
                  alt={pokemon.name}
                  height={296}
                  width={293}
                />
              )}
              <p>HP: {pokemon.stats.hp}</p>
              <p>Attack: {pokemon.stats.attack}</p>
              <p>Defence: {pokemon.stats.defence}</p>
              <p>Speed: {pokemon.stats.speed}</p>
            </IonCardContent>
          </IonCard>
        )}

        <div className="bottom-button">
          <IonButton
            onClick={getPokeData}
            shape="round"
            expand="full"
            color="secondary"
          >
            Generate
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Generator;
