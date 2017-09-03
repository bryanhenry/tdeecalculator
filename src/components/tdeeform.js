import React from 'react';
import { AppRegistry, StyleSheet, Text,View,ScrollView } from 'react-native';
import { Form, Separator,InputField, LinkField, SwitchField, PickerField,DatePickerField,TimePickerField } from 'react-native-form-generator';
import { TDEE_ACTIVITY, TDEE_GENDERS, TdeeCalc } from './tdeecalc';

export default class TdeeForm extends React.Component {

  /**
   * @param prototype props - we all know its a prototype.
   * @return void
   */
  constructor(props) {

    super(props);
    this.state = { formData:{}, tdee: 0 };
    this.tdeecalc = new TdeeCalc();
  }

  /**
   * Handles form change, and most basic of validation -- ie, there has to be a complete set of data, then we can calculate a TDEE.
   *
   * @param prototype formData
   * @return void
   */
  handleFormChange = (formData) => {

    let tdee;

    if(formData.gender != undefined && formData.height!= undefined && formData.weight!= undefined && formData.age!= undefined && formData.activity) {

      tdee = this.tdeecalc.getTDEE(formData.gender, formData.height, formData.weight, formData.age, formData.activity);

    } else {

      tdee = 0;

    }

    this.setState({formData:formData, tdee: tdee});
    this.props.onFormChange && this.props.onFormChange(formData);

  }

  /**
   * Constructors a height range for the user to choose from.
   * @return void
   */
  getHeights = () => {

    let height_in_inchs = 48;  // Start around 4 foot.
    const stop = 84; // Stop around 7 foot.

    let height_map = {};

    while(height_in_inchs <= stop ) {

      height_map[height_in_inchs] = Math.trunc(height_in_inchs / 12) + "\' " + height_in_inchs % 12 + "\"";

      height_in_inchs++;

    }

    return height_map;

  }

  /**
   * Render the component.
   */
  render = () => {

    return (
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.ScrollView}>

      <Form
        ref='registrationForm'
        onChange={this.handleFormChange.bind(this)}
        >

          <Text>Age in Years</Text>

          <InputField ref='age' placeholder='Age'/>

          <Text>Select Gender</Text>

          <PickerField ref='gender'
                options={TDEE_GENDERS} />

         <Text>Height</Text>

          <PickerField ref='height'
                options={this.getHeights()} />

         <Text>Weight in LBs</Text>
          <InputField ref='weight' placeholder='164'/>

          <Text>Activity Level</Text>

          <PickerField ref='activity'
                options={TDEE_ACTIVITY} />

        <Text>Your TDEE: {this.state.tdee}</Text>

      </Form>
      </ScrollView>
          );
    }

}

// Style sheet for the component view.
const styles = StyleSheet.create({
  ScrollView: {
    paddingLeft:10,
    paddingRight:10,
    height:400,
    width: 300
  }
});
