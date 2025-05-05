/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonText,
  IonBackButton,
  IonItem,
  IonIcon,
  IonLabel,
  IonModal,
  IonFooter,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { clipboardOutline, bodyOutline, trophyOutline } from "ionicons/icons";

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

const Details: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const API_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`${API_URL}${pokemonName}`);
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
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/collection" />
          </IonButtons>
          <IonTitle>{pokemon?.name.toUpperCase()}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-text-center">
        {!pokemon && (
          <IonText color="medium">
            <p>Loading Pokémon details...</p>
          </IonText>
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

        <IonModal
          trigger="open-modal"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent className="ion-padding">
            <IonItem lines="none">
              <IonIcon icon={clipboardOutline} slot="start" color="white" />
              <IonLabel>Special Moves (coming soon)</IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={bodyOutline} slot="start" color="white" />
              <IonLabel className="ion-text-wrap">
                Abilities (coming soon)
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={trophyOutline} slot="start" color="white" />
              <IonLabel className="ion-text-wrap">
                Achievements (coming soon)
              </IonLabel>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>

      <IonFooter>
        <div className="bottom-button">
          <IonButton
            shape="round"
            expand="full"
            color="secondary"
            id="open-modal"
          >
            Show more
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Details;
