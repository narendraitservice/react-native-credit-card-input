import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const width = Dimensions.get('window').width

const INFINITE_WIDTH = Dimensions.get('window').width;
//const INFINITE_WIDTH = 1000;

const s = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop : 10,
    //flexDirection: "row",
    //alignItems: "center",
    //overflow: "hidden",
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: "contain",
  },
  expanded: {
    flex: 1,
  },
  hidden: {
    width: 0,
  },
  leftPart: {
    overflow: "hidden",
  },
  rightPart: {
    overflow: "hidden",
    flexDirection: "row",
  },
  last4: {
    flex: 1,
    justifyContent: "center",
  },
  numberInput: {
    width: INFINITE_WIDTH,
    //marginLeft: 10,
    //backgroundColor:'red'
  },
  expiryInput: {
    width: 80,
  },
  cvcInput: {
    width: width/2.6,
  },
  last4Input: {
    width: 60,
    marginLeft: 20,
  },
  input: {
    height: 40,
    color: "black",
  },
  mainview:{
    flexDirection:'row',
    justifyContent: 'space-between',
    borderBottomWidth:0.6,
    borderBottomColor:'#d7d7d7'
  },
  monthcontainer:{
    flexDirection:'row',
    marginTop:10
    // borderBottomWidth:0.6,
    // borderBottomColor:'#d7d7d7'
  },
  expiryview:{
    width:width/2,
    // borderRightWidth:0.6,
    // borderRightColor:'#d7d7d7'
    borderBottomWidth:0.6,
    borderBottomColor:'#d7d7d7'
  },
  cvcview:{
     marginLeft: 10,
    borderBottomWidth:0.6,
    borderBottomColor:'#d7d7d7'
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  nameinput:{
    borderBottomWidth:0.6,
    borderBottomColor:'#d7d7d7',
    marginTop:10
  }
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class LiteCreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,

    placeholders: PropTypes.object,

    inputStyle: Text.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    additionalInputsProps: PropTypes.objectOf(PropTypes.shape(TextInput.propTypes)),
  };

  static defaultProps = {
    placeholders: {
      number: "Card Number",
      expiry: "MM/YY",
      cvc: "CVC",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
    additionalInputsProps: {},
  };

  componentDidMount = () => {
    this._focus(this.props.focused);
  }

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

   _focusNumber = () => this._focus("number");
   _focusExpiry = () => this._focus("expiry");

  _focus = field => {
    if (!field){
      return;
    }
    //if(field != 'name'){
      this.refs[field].focus();
    //}

    LayoutAnimation.easeInEaseOut();
  }

  _inputProps = field => {

    const {
      inputStyle, validColor, invalidColor, placeholderColor,
      placeholders, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputsProps,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputProps: additionalInputsProps[field],
    };
  };

  _iconToShow = () => {
    const { focused, values: { type } } = this.props;
    if (focused === "cvc" && type === "american-express") return "cvc_amex";
    //if (focused === "cvc") return "cvc";
    if (type) return type;
    return "placeholder";
  }

  render() {
    const { focused, values: { number }, inputStyle, status: { number: numberStatus } } = this.props;
    const showRightPart = focused && focused !== "number";

    return (
      <View style={s.container}>

        <View style={s.mainview}>
                <View>
                  <CCInput {...this._inputProps("number")}
                           keyboardType="numeric"
                           containerStyle={s.numberInput} />
                </View>
                {/*<View>*/}
                {/*  <Image style={s.icon} source={Icons[this._iconToShow()]} />*/}
                {/*</View>*/}
        </View>

        <View style={s.monthcontainer}>
          <View style={s.expiryview}>
              <CCInput {...this._inputProps("expiry")}
                     keyboardType="numeric"
                     containerStyle={s.expiryInput} />
          </View>
          <View style={s.cvcview}>
              <CCInput

                  {...this._inputProps("cvc")}
                     keyboardType="numeric"
                  placeholder={'Security Code'}
                     containerStyle={s.cvcInput} />
          </View>
        </View>
        <View style={s.nameinput}>
          <CCInput {...this._inputProps("name")}
            placeholder={'Name'}
                   containerStyle={s.numberInput} />
        </View>

        <View style={s.nameinput}>
          <CCInput {...this._inputProps("postalCode")}
                   placeholder={'Zip code'}
                   keyboardType="numeric"
                   containerStyle={s.numberInput} />
        </View>


        {/*<View style={[*/}
          {/*s.leftPart,*/}
          {/*showRightPart ? s.hidden : s.expanded,*/}
        {/*]}>*/}
          {/*<CCInput {...this._inputProps("number")}*/}
            {/*keyboardType="numeric"*/}
            {/*containerStyle={s.numberInput} />*/}
        {/*</View>*/}
        {/*<TouchableOpacity onPress={showRightPart ? this._focusNumber : this._focusExpiry }>*/}
          {/*<Image style={s.icon} source={Icons[this._iconToShow()]} />*/}
        {/*</TouchableOpacity>*/}
        {/*<View style={[*/}
          {/*s.rightPart,*/}
          {/*showRightPart ? s.expanded : s.hidden,*/}
        {/*]}>*/}
          {/*<TouchableOpacity onPress={this._focusNumber}*/}
            {/*style={s.last4}>*/}
            {/*<View pointerEvents={"none"}>*/}
              {/*<CCInput field="last4"*/}
                {/*keyboardType="numeric"*/}
                {/*value={ numberStatus === "valid" ? number.substr(number.length - 4, 4) : "" }*/}
                {/*inputStyle={[s.input, inputStyle]}*/}
                {/*containerStyle={[s.last4Input]} />*/}
            {/*</View>*/}
          {/*</TouchableOpacity>*/}
          {/*<CCInput {...this._inputProps("expiry")}*/}
            {/*keyboardType="numeric"*/}
            {/*containerStyle={s.expiryInput} />*/}
          {/*<CCInput {...this._inputProps("cvc")}*/}
            {/*keyboardType="numeric"*/}
            {/*containerStyle={s.cvcInput} />*/}
        {/*</View>*/}
      </View>
    );
  }
}
