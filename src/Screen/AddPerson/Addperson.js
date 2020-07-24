import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Container, Header, Content, Textarea, Form } from "native-base";
import DatePicker from "../../Component/DatePicker";
import { AddPersonFunc } from "../../config/function";
// import { Textarea } from 'native-base';
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
class AddPerson extends React.Component {
  constructor() {
    super();
    this.state = {
      dateOfBirth: new Date("2014-08-18T21:11:54"),
      missingDate: new Date("2014-08-18T21:11:54"),
    };
  }

  // imageFunc = async (e) => {
  //   let imagename = e.target.files[0].name;
  //   console.log(imagename);
  //   let ref = FirebaseApp.storage()
  //     .ref('/')
  //     .child('image/' + imagename);
  //   await ref.put(e.target.files[0]);
  //   ref.getDownloadURL().then((url) =>
  //     this.setState({
  //       image: url,
  //     }),
  //   );
  // };
  // // Get Input value Function

  GataInputValue = (text, name) => {
    this.setState({
      [name]: text,
    });
  };

  // // date of Birth Function
  handleDateofBirthChange = (date) => {
    this.setState({ dateOfBirth: date });
  };
  // missing Date Function
  handleDatemissingChange = (date) => {
    this.setState({ missingDate: date, Year: date.getFullYear() });
  };
  componentDidMount = async () => {
    let lang = await AsyncStorage.getItem("lang");
    console.log(lang);
    let chl = lang ? lang : "fr";
    i18n.locale = chl;
    this.setState({});
  };

  AddData = async () => {
    let {
      name,
      dateOfBirth,
      missingDate,
      age,
      city,
      eyes_color,
      height,
      lastSeenLocation,
      image,
      contact_No,
      description,
      Year,
    } = this.state;

    try {
      // if (
      //   name &&
      //   dateOfBirth &&
      //   missingDate &&
      //   age &&
      //   city &&
      //   eyes_color &&
      //   height &&
      //   lastSeenLocation &&
      //   contact_No &&
      //   description &&
      //   Year
      // ) {
      await AddPersonFunc({
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
        approve: false,
        image:
          "https://flexgroup.nz/wp-content/uploads/2018/05/dummy-image.jpg",
      });
      // } else {
      //   alert('Fill All Data');
      // }
    } catch (err) {
      console.log("err ===========>", err.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <BackHeader
          navigation={this.props.navigation}
          name={i18n.t("addperson")}
        />
        <ScrollView>
          <View style={styles.AddPerson}></View>

          <View style={styles.addPersonForm}>
            <Text style={styles.addPersonTitle}>{i18n.t("contact.title")}</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t("contact.name")}
              placeholderTextColor="#452d9a"
              onChangeText={(text) => this.GataInputValue(text, "name")}
            />
            <DatePicker
              onchange={this.handleDateofBirthChange}
              data={i18n.t("contact.dateofbirth")}
            />

            <TextInput
              style={styles.input}
              placeholder={i18n.t("contact.age")}
              placeholderTextColor="#452d9a"
              keyboardType="numeric"
              onChangeText={(text) => this.GataInputValue(text, "age")}
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t("contact.height")}
              placeholderTextColor="#452d9a"
              keyboardType="numeric"
              onChangeText={(text) => this.GataInputValue(text, "height")}
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t("contact.eyesColor")}
              placeholderTextColor="#452d9a"
              onChangeText={(text) => this.GataInputValue(text, "eyes_color")}
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t("contact.city")}
              placeholderTextColor="#452d9a"
              onChangeText={(text) => this.GataInputValue(text, "city")}
            />

            <TextInput
              style={styles.input}
              placeholder={i18n.t("contact.contact")}
              placeholderTextColor="#452d9a"
              keyboardType="numeric"
              onChangeText={(text) => this.GataInputValue(text, "contact_No")}
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t("contact.lastLocation")}
              placeholderTextColor="#452d9a"
              onChangeText={(text) =>
                this.GataInputValue(text, "lastSeenLocation")
              }
            />

            <DatePicker
              onchange={this.handleDatemissingChange}
              data={i18n.t("contact.missingDate")}
            />
            <Textarea
              rowSpan={3}
              bordered
              placeholder={i18n.t("contact.description")}
              style={styles.textArea}
              placeholderTextColor="#452d9a"
              onChangeText={(text) => this.GataInputValue(text, "description")}
            />
            <TouchableOpacity
              style={{ width: "80%", alignSelf: "center" }}
              onPress={() => this.AddData()}
            >
              <Text style={styles.addBtn}>{i18n.t("contact.button")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AddPerson: {
    backgroundColor: "#452d9a",
    padding: 150,
    fontSize: 20,
    borderBottomRightRadius: 100,
  },
  container: {
    // paddingBottom: 50,
    flex: 1,
  },
  addPersonTitle: {
    color: "#452d9a",
    fontSize: 30,
    textAlign: "center",
  },
  addPersonForm: {
    borderRadius: 5,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    elevation: 10,
    marginTop: -200,
    padding: "5%",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    color: "#452d9a",
    borderRadius: 5,
    borderColor: "#452d9a",
    borderWidth: 1,
    marginTop: 20,
    paddingLeft: 20,
    height: 50,
  },
  textArea: {
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    color: "#452d9a",
    borderRadius: 5,
    borderColor: "#452d9a",
    borderWidth: 1,
    marginTop: 20,
  },
  addBtn: {
    color: "white",
    backgroundColor: "#452d9a",
    width: "100%",
    padding: "5%",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 50,
    elevation: 10,
    marginTop: 20,
  },
});

export default AddPerson;
