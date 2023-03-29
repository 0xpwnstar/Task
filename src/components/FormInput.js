import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import styles from '../styles/layer1'

export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      {...rest}
    />
  );
}