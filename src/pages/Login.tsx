/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const auth = FIREBASE_AUTH;
  const history = useHistory();

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/app/home");
      showToastMessage("Signed in successfully!");
    } catch (error: any) {
      showToastMessage("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle className="ion-text-center">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonImg src="/src/images/pokegene.svg"></IonImg>
        <IonText className="ion-text-center">
          <p>Please log in to your account to generate your Pokémon!</p>
        </IonText>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <IonItem style={{ width: "80%" }}>
            <IonInput
              color="danger"
              type="email"
              placeholder="Email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem style={{ width: "80%" }}>
            <IonInput
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </IonItem>

          {loading ? (
            <IonLoading
              isOpen={loading}
              message="Loading..."
              duration={2000}
              spinner="circles"
            />
          ) : (
            <>
              <IonButton
                shape="round"
                expand="block"
                color="secondary"
                style={{ marginTop: "10px", width: "80%" }}
                onClick={signIn}
              >
                Login
              </IonButton>
              <IonButton
                shape="round"
                expand="block"
                color="light"
                style={{ marginTop: "10px", width: "80%" }}
                onClick={() => history.push("/register")}
              >
                Create an Account
              </IonButton>
            </>
          )}

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={2000}
            position="bottom"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
