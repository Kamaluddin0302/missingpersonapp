import React, { Component } from "react";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
} from "native-base";
export default class Search extends Component {
  render() {
    return (
      <Item
        style={{
          width: 150,
          borderColor: "black",
          borderWidth: 2,
          marginLeft: 10,
        }}
      >
        <Icon name="ios-search" />
        <Input
          style={{ fontSize: 13 }}
          placeholder={this.props.name}
          keyboardType={this.props.keyboardType}
          onChangeText={(text) =>
            this.props.getSearchData(text, this.props.value)
          }
        />
        <Icon name="ios-people" />
      </Item>
    );
  }
}
