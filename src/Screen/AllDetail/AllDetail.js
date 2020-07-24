import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import BackHeader from "./../../Component/backheader";

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
class AllDetail extends React.Component {
  componentDidMount = async () => {
    let lang = await AsyncStorage.getItem("lang");
    console.log(lang);
    let chl = lang ? lang : "en";
    i18n.locale = chl;
  };

  render() {
    let {
      name,
      dateOfBirth,
      missingDate,
      age,
      city,
      eyes_color,
      height,
      lastSeenLocation,
      contact_No,
      description,
      Year,
      approve,
      image,
    } = this.props.route.params;
    return (
      <View style={styles.Container}>
        <BackHeader
          navigation={this.props.navigation}
          name={i18n.t("detail")}
        />
        <View style={styles.Card}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: image,
            }}
          />
          <Text style={styles.text}>
            <Text style={styles.title}>{i18n.t("contact.name")} : </Text>
            <Text> {name}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>{i18n.t("contact.city")} : </Text>
            <Text> {city}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>{i18n.t("contact.age")} : </Text>
            <Text> {age}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>{i18n.t("contact.eyesColor")} : </Text>
            <Text> {eyes_color}</Text>
          </Text>
          {/* <Text style={styles.text}>{dateOfBirth}</Text> */}
          {/* <Text style={styles.text}>{missingDate}</Text> */}
          <Text style={styles.text}>
            <Text style={styles.title}>{i18n.t("contact.height")} : </Text>
            <Text> {height}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>{i18n.t("contact.lastLocation")} :</Text>
            <Text> {lastSeenLocation}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}> {i18n.t("contact.contact")} : </Text>
            <Text> {contact_No}</Text>
          </Text>

          <Text style={styles.text}>
            <Text style={styles.title}>{i18n.t("contact.description")} : </Text>
            <Text> {description}</Text>
          </Text>
          <TouchableOpacity activeOpacity={0.5} style={styles.button}>
            <Text style={styles.Btn}>{i18n.t("contactus")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    // margin: 15,
  },
  tinyLogo: {
    width: 160,
    height: 160,
  },
  Card: {
    padding: 15,
    margin: 20,
    // borderWidth : 2,
    borderRadius: 10,
    width: "85%",
    height: "85%",
    // paddingLeft: 60,

    alignItems: "center",
    alignSelf: "center",
    elevation: 4,
  },
  Btn: {
    backgroundColor: "#452d9a",
    padding: 15,
    borderRadius: 50,
    width: 220,
    textAlign: "center",
    color: "white",
  },
  text: {
    // fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
  },

  button: {
    marginTop: 10,
  },
});

export default AllDetail;
