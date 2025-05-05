import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonText className="ion-text-center">
          <h4>Welcome to the </h4>
          <IonImg src="/src/images/pokegene.svg"></IonImg>
          <h5>Are you ready to discover your next favorite Pokémon?</h5>

          <p>
            With PokéGene, you can explore, generate, and collect classic
            Pokémon with just a tap. <br></br>
            <br></br> Start your journey now and see what Pokémon awaits you!
          </p>
        </IonText>
        <IonButton
          routerLink="/app/generator"
          shape="round"
          color={"secondary"}
          expand="full"
        >
          Go to Generator
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
