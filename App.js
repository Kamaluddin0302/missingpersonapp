import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/config/Navigation";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return <Navigation />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import { Updates } from "expo";
// import React, { Component } from "react";
// import {
//   View,
//   StyleSheet,
//   ActivityIndicator,
//   I18nManager as RNI18nManager,
// } from "react-native";

// import i18n from "./src/services/i18n";
// import MyStack from "./src/config/Navigation.js";

// import { Spinner } from "native-base";

// export default class App extends Component {
//   state = {
//     isI18nInitialized: false,
//     isReady: false,
//   };

//   async componentDidMount() {
//     await Font.loadAsync({
//       Roboto: require("native-base/Fonts/Roboto.ttf"),
//       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//       ...Ionicons.font,
//     });
//     this.setState({ isReady: true });

//     i18n
//       .init()
//       .then(() => {
//         const RNDir = RNI18nManager.isRTL ? "RTL" : "LTR";

//         // RN doesn't always correctly identify native
//         // locale direction, so we force it here.
//         if (i18n.dir !== RNDir) {
//           const isLocaleRTL = i18n.dir === "RTL";

//           RNI18nManager.forceRTL(isLocaleRTL);

//           // RN won't set the layout direction if we
//           // don't restart the app's JavaScript.
//           Updates.reloadFromCache();
//         }

//         this.setState({ isI18nInitialized: true });
//       })
//       .catch((error) => console.warn(error));
//   }

//   //

//   //   render() {
//   //     if (!this.state.isReady) {
//   //       return <AppLoading />;
//   //     }
//   //     return <Navigation />;
//   //   }

//   render() {
//     if (!this.state.isReady) {
//       return <AppLoading />;
//     }
//     else if (this.state.isI18nInitialized) {
//       return <MyStack />
//     }
//     else {
//       return <Spinner />
//     }
//   }
// }

// const styles = StyleSheet.create({
//   loadingScreen: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
