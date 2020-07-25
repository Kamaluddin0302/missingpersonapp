import * as React from "react";
import { Button, Image, View, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Entypo } from "@expo/vector-icons";
export default class ImagePickerExample extends React.Component {
  state = {
    image:
      "https://nichemodels.co/wp-content/uploads/2019/03/user-dummy-pic.png",
  };

  render() {
    let { image } = this.state;

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        )}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            padding: 10,
            flex: 1,
            marginTop: -60,
            marginLeft: 80,
          }}
        >
          <Entypo
            name="edit"
            size={30}
            color="#452d9a"
            onPress={this._pickImage}
          />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.props.imageFunc(result.uri);
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
