import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { en, fr, ht } from "./../../lang/index";
i18n.translations = {
  en,
  fr,
  ht,
};
// Set the locale once at the beginning of your app.
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
class GetStarted extends React.Component {
  componentDidMount = async () => {
    let lang = await AsyncStorage.getItem("lang");
    console.log(lang);
    let chl = lang ? lang : "en";
    i18n.locale = chl;
    this.setState({});
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
        style={styles.tinyLogo}
        source={require('./../../assets/missingIcon.png')}
      /> */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ width: "80%" }}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.getStarted}>{i18n.t("GetStart.1")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#452d9a",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  getStarted: {
    color: "#452d9a",
    backgroundColor: "white",
    width: "100%",
    padding: "6%",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 50,
    elevation: 10,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});

export default GetStarted;

// Set the key-value pairs for the different languages you want to support.
