import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { en, fr, ht } from "./../../lang/index";
i18n.translations = {
  en,
  fr,
  ht,
};
// Set the locale once at the beginning of your app.
i18n.locale = "ht";

i18n.fallbacks = true;

const Dropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState("en");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150, color: "white" }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          props.changeLan(itemValue);
        }}
      >
        <Picker.Item label={i18n.t("lang.en")} value="en" />
        <Picker.Item label={i18n.t("lang.fr")} value="fr" />
        <Picker.Item label={i18n.t("lang.ht")} value="ht" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: "center",
  },
});

export default Dropdown;
