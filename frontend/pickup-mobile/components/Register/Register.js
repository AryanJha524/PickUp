import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useHistory } from "react-router-dom";
import Firebase from '../../config/firebase';
import { ChooseUserRole } from './ChooseUserRole';

export const Register = () => {

    let history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [userUID, setUserUID] = useState(null);
    const [firebaseUserCreated, setFirebaseUserCreated] = useState(false);

    const doRegister = (email, password) => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                setUserUID(user.user.UID);
                setFirebaseUserCreated(true);
            })
    }

    const handlePress = () => {
        if (password !== password2) {
            console.log("Passwords don't match");
        }
        else {
            doRegister(email, password);
        }
    }

    const handleEmail = (email) => {
        setEmail(email);
    }

    const handlePassword = (password) => {
        setPassword(password);
    }

    const handlePassword2 = (password2) => {
        setPassword2(password2);
    }

    return (
        <View>
            {
                firebaseUserCreated
                    ?
                    <View>
                        <ChooseUserRole />
                    </View>
                    :
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            onChangeText={handleEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a password"
                            secureTextEntry={true}
                            onChangeText={handlePassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm your password"
                            secureTextEntry={true}
                            onChangeText={handlePassword2}
                        />
                        <Button
                            title="Register an Account"
                            onPress={handlePress}
                        />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});