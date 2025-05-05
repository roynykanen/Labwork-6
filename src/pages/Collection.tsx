/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";

const Collection: React.FC = () => {
  const [collection, setCollection] = useState<any[]>([]);

  useEffect(() => {
    const loadCollection = async () => {
      const { value } = await Preferences.get({ key: "pokemonList" });
      if (value) {
        try {
          const parsedValue = JSON.parse(value);
          console.log("Loaded collection:", parsedValue);
          setCollection(parsedValue);
        } catch (error) {
          console.error("Error parsing saved Pokémon list:", error);
          setCollection([]);
        }
      } else {
        console.log("No Pokémon saved yet.");
        setCollection([]);
      }
    };

    loadCollection();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My collection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        {collection.length === 0 ? (
          <p>
            View all the Pokémon you've generated and saved. Each one comes with
            key stats like <strong>HP</strong>, <strong>Attack</strong>,{" "}
            <strong>Defense</strong>, and <strong>Speed</strong>. Tap{" "}
            <strong>Show More</strong> to unlock even deeper details – feature{" "}
            <strong>coming soon!</strong>
          </p>
        ) : (
          <IonList>
            {collection.map((poke, index) => (
              <IonItem
                button
                detail={true}
                key={index}
                routerLink={`/app/collection/${poke.name}`}
              >
                <IonAvatar slot="start">
                  <IonImg src={poke.img} />
                </IonAvatar>
                <IonLabel className="ion-text-wrap">
                  <h2>{poke.name.toUpperCase()}</h2>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Collection;
