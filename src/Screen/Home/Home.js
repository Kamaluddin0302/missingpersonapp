import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from "react-native";
import { Spinner, Row } from "native-base";
import Card from "../../Component/Cards/cards";
import { GetData } from "../../config/function";
import Header from "../../Component/header";
import Search from "./../../Component/searchInput/SearchInput";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { en, fr, ht } from "./../../lang/index";
i18n.translations = {
  en,
  fr,
  ht,
};
// Set the locale once at the beginning of your app.

i18n.fallbacks = true;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      AllPersons: [],
      lan: "en",
      Year: "",
      City: "",
    };
  }

  componentDidMount = async () => {
    let { AllPersons } = this.state;
    try {
      let getData = await GetData();
      await getData.forEach((val) => {
        console.log(val.data().name);
        AllPersons.push(val.data());
      });
      let lang = await AsyncStorage.getItem("lang");
      console.log(lang);
      let chl = lang ? lang : "en";
      i18n.locale = chl;
      await this.setState({
        AllPersons: AllPersons,
      });
    } catch (err) {
      this.setState({
        err: err,
      });
    }
  };

  changeLang = (e) => {
    AsyncStorage.setItem("lang", e);
    i18n.locale = e;
    this.setState({});
  };

  getSearchData = (e, name) => {
    this.setState({
      [name]: e,
    });
  };
  render() {
    let { AllPersons, City, Year } = this.state;
    const filterPerson = AllPersons.filter((users) => {
      console.log(typeof Year);
      return (
        users.city.toLowerCase().includes(City.toLowerCase()) &&
        users.Year &&
        toString(users.Year)
          .toLowerCase()
          .includes(toString(users.Year).toLowerCase())
      );
    });
    return (
      <>
        <Header
          navigation={this.props.navigation}
          name={i18n.t("Home.1")}
          changeLan={this.changeLang}
        />
        {!AllPersons.length ? (
          <View style={{ flex: 1, marginTop: "50%" }}>
            <Spinner color="blue" />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.Container}>
              <View style={styles.search}>
                <Search
                  name={i18n.t("Home.city")}
                  keyboardType="default"
                  getSearchData={this.getSearchData}
                  value="City"
                />
                <Search
                  name={i18n.t("Home.year")}
                  keyboardType="numeric"
                  getSearchData={this.getSearchData}
                  value="Year"
                />
              </View>
              {filterPerson && filterPerson.length ? (
                filterPerson.map((val, i) => (
                  <>
                    <Card navigate={this.props} data={val} />
                    <Card navigate={this.props} data={val} />
                    <Card navigate={this.props} data={val} />
                    <Card navigate={this.props} data={val} />
                  </>
                ))
              ) : (
                <View style={styles.notfound}>
                  <Text style={styles.notfoundtext}>
                    {i18n.t("Home.found")}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  search: {
    // flex: 1,
    width: "100%",
    padding: 10,
    color: "white",
    flexDirection: "row",
    alignSelf: "center",
  },
  notfound: {
    alignSelf: "center",
    marginLeft: 100,
  },
  notfoundtext: {
    fontSize: 20,
  },
});

export default Home;
