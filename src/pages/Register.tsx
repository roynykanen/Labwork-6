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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const auth = FIREBASE_AUTH;
  const history = useHistory();

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const register = async () => {
    if (password !== confirmPassword) {
      showToastMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showToastMessage("Registration successful! Check your email.");
      history.push("/");
    } catch (error: any) {
      showToastMessage("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle className="ion-text-center">Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonImg src="/src/images/pokegene.svg"></IonImg>
        <IonText className="ion-text-center">
          <p>Please create an account to generate your Pokémon!</p>
        </IonText>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <IonItem style={{ width: "80%" }}>
            <IonInput
              type="email"
              placeholder="Email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
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

          <IonItem style={{ width: "80%" }}>
            <IonInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </IonItem>

          {password && confirmPassword && password !== confirmPassword && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              ⚠ Passwords do not match
            </p>
          )}

          {loading ? (
            <IonLoading
              isOpen={loading}
              message="Loading..."
              duration={3000}
              spinner="circles"
            />
          ) : (
            <>
              <IonButton
                shape="round"
                expand="block"
                color="secondary"
                style={{ marginTop: "10px", width: "80%" }}
                onClick={register}
                disabled={!email || !password || password !== confirmPassword}
              >
                Register
              </IonButton>
              <IonButton
                shape="round"
                expand="block"
                color="light"
                style={{ marginTop: "10px", width: "80%" }}
                onClick={() => history.push("/")}
              >
                Back to Login
              </IonButton>
            </>
          )}

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={4000}
            position="bottom"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
