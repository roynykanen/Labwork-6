import {
  IonButton,
  IonContent,
  IonMenu,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonSplitPane,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonRouterOutlet,
} from "@ionic/react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import Home from "./Home";
import About from "./About";
import Generator from "./Generator";
import Search from "./Search";
import {
  homeOutline,
  infiniteOutline,
  informationOutline,
  logOutOutline,
  searchOutline,
  serverOutline,
} from "ionicons/icons";
import Collection from "./Collection";

const Menu: React.FC = () => {
  const history = useHistory();

  const logout = async () => {
    await signOut(FIREBASE_AUTH);
    history.push("/");
  };

  const paths = [
    { name: "Home", url: "/app/home", icon: homeOutline },
    { name: "Search", url: "/app/search", icon: searchOutline },
    { name: "Generator", url: "/app/generator", icon: infiniteOutline },
    { name: "Collection", url: "/app/collection", icon: serverOutline },
    { name: "About", url: "/app/about", icon: informationOutline },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index}>
                <IonItem routerLink={item.url} routerDirection="none">
                  <IonIcon
                    icon={item.icon}
                    slot="start"
                    color="white"
                  ></IonIcon>
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            <IonButton
              routerLink="/"
              routerDirection="back"
              expand="full"
              color={"danger"}
              onClick={logout}
            >
              <IonIcon icon={logOutOutline} slot="start"></IonIcon>
              Logout
            </IonButton>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/app/home" component={Home} />
          <Route exact path="/app/about" component={About} />
          <Route exact path="/app/generator" component={Generator} />
          <Route exact path="/app/search" component={Search} />
          <Route exact path="/app/collection" component={Collection} />
          <Route exact path="/app">
            <Redirect to="/app/home" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
