/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import React, { useState } from "react";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokeName, setPokeName] = useState<string | null>(null);
  const [pokeImg, setPokeImg] = useState<string | null>(null);
  const [pokeStats, setPokeStats] = useState<{
    hp: number;
    attack: number;
    defence: number;
    speed: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchPokemon = async (name: string) => {
    if (!name) return;
    setHasSearched(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();

      setPokeName(data.name);
      setPokeImg(
        data.sprites.other.dream_world.front_default ||
          data.sprites.front_default
      );

      setPokeStats({
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defence: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
      });

      setError("");
    } catch (err: any) {
      setPokeName(null);
      setPokeImg(null);
      setPokeStats(null);
      setError(err.message || "Error fetching Pokémon");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-text-center">
        <IonSearchbar
          color="secondary"
          value={searchTerm}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchPokemon(searchTerm);
          }}
          debounce={300}
          placeholder="Search Pokémon by name"
        />
        {!hasSearched && (
          <IonText color="white">
            <h4>Looking for a specific Pokémon?</h4>
            <p>
              Use the search feature to find detailed information on any of the
              original 150 Pokémon.
            </p>
          </IonText>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {pokeName && (
          <IonCard className="ion-padding">
            <IonCardTitle className="ion-text-center">
              {pokeName.toUpperCase()}
            </IonCardTitle>
            <IonCardContent>
              {pokeImg && (
                <img src={pokeImg} alt={pokeName} height="270" width="290" />
              )}
              {pokeStats && (
                <>
                  <p>HP: {pokeStats.hp}</p>
                  <p>Attack: {pokeStats.attack}</p>
                  <p>Defence: {pokeStats.defence}</p>
                  <p>Speed: {pokeStats.speed}</p>
                </>
              )}
            </IonCardContent>
          </IonCard>
        )}

        <div className="bottom-button">
          <IonButton
            onClick={() => fetchPokemon(searchTerm)}
            shape="round"
            expand="full"
            color="secondary"
          >
            Search
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
