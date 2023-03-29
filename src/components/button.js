import React from 'react';
import { TouchableOpacity, Text, View} from 'react-native';
import styles from '../styles/layer1';

export default function FormButton({ buttonTitle, ...rest}) {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}
