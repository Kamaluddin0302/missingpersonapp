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
export default class HeaderIconExample extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: "#452d9a" }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.name}</Title>
        </Body>
        <Right>
          <Button transparent>{/* <Icon name="menu" /> */}</Button>
        </Right>
      </Header>
    );
  }
}
