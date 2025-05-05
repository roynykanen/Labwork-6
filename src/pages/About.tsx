import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonFooter,
} from "@ionic/react";

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonText>
          <h4>What is</h4>
          <IonImg src="/src/images/pokegene.svg"></IonImg>
          <p>
            PokéGene brings the nostalgia of classic Pokémon into a sleek,
            easy-to-use app. We fetch accurate data and images from a trusted
            Pokémon API to ensure every Pokémon you view is both authentic and
            informative.
          </p>
        </IonText>
      </IonContent>
      <IonFooter className="ion-padding ion-text-center">
        Roy Nykänen © 2025
      </IonFooter>
    </IonPage>
  );
};

export default About;
