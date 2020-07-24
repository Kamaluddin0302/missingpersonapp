import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from "native-base";
import Dropdown from "./dropdown/dropdown";


export default class HeaderIconExample extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: "#452d9a" }}
        navigation={this.props.navigation}
      >
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.name}</Title>
        </Body>
        <Right>
          <Dropdown changeLan={this.props.changeLan} />
        </Right>
      </Header>
    );
  }
}
