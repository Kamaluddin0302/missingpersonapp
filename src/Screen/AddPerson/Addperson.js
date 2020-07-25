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
  Alert,
} from "react-native";
import { Container, Header, Content, Textarea, Form } from "native-base";
import DatePicker from "../../Component/DatePicker";
import { AddPersonFunc } from "../../config/function";
// import { Textarea } from 'native-base';
import ImagePicker from "./../../Component/imagePicker/imagePicker";
import BackHeader from "./../../Component/backheader";
import { FirebaseApp } from "./../../config/firebase";
import uuid from "uuid";

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
      show: "flex",
      hide: "none",
    };
  }

  // imageFunc = async (e) => {
  //   console.log(e);
  //   let imagename = e.target.files[0].name;
  //   console.log(imagename);
  //   let ref = FirebaseApp.storage()
  //     .ref("/")
  //     .child("image/" + imagename);
  //   await ref.put(e.target.files[0]);
  //   ref.getDownloadURL().then((url) =>
  //     this.setState({
  //       image: url,
  //     })
  //   );
  // };

  imageFunc = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = FirebaseApp.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    let down = await snapshot.ref.getDownloadURL();
    console.log(down);
  };
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
    let chl = lang ? lang : "en";
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
      this.setState({
        show: "none",
        hide: "flex",
      });

      if (
        name &&
        dateOfBirth &&
        missingDate &&
        age &&
        city &&
        eyes_color &&
        height &&
        lastSeenLocation &&
        contact_No &&
        description &&
        Year
      ) {
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
        }).then(() => {
          Alert.alert(
            "✔️ Data Added Successfully",
            "",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );

          this.setState({
            show: "flex",
            hide: "none",
          });
        });
      } else {
        Alert.alert(
          "Please fill All Data ❌",
          "",
          [{}, { text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        this.setState({
          show: "flex",
          hide: "none",
        });
      }
    } catch (err) {
      Alert.alert(
        "Something is wrong ❌",
        "",
        [{}, { text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      this.setState({
        show: "flex",
        hide: "none",
      });
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

            <ImagePicker imageFunc={this.imageFunc} />

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
              style={{
                width: "80%",
                alignSelf: "center",
                flexDirection: "row",
              }}
              onPress={() => this.AddData()}
              disabled={false}
            >
              <Text style={[styles.show, { display: this.state.show }]}>
                {i18n.t("contact.button")}
              </Text>
              <Text style={[styles.hide, { display: this.state.hide }]}>
                Please Wait....
              </Text>
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
  show: {
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
  hide: {
    color: "white",
    backgroundColor: "#452d9a",
    width: "100%",
    padding: "5%",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 50,
    elevation: 10,
    marginTop: 20,
    opacity: 0.5,
  },
  load: {
    color: "white",
    backgroundColor: "#452d9a",
    padding: "5%",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 50,
    elevation: 10,
    marginTop: 20,
  },
  none: {
    display: "none",
  },
});

export default AddPerson;
