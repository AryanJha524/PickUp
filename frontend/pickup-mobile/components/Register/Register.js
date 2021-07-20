import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Chip } from 'react-native-paper';
import { useHistory } from "react-router-dom";
import Firebase from '../../config/firebase';

export const Register = () => {

    let history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [userType, setUserType] = useState("player");

    const api_url = 'https://localhost:3001/';

    const createMongoUser = async (uobject) => {
        const response = await fetch(api_url + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uobject),
        })
        return await response.json();
    }

    const doRegister = (email, password) => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                createMongoUser({uid: user.user.id, utype: userType})
                .then(res => console.log(res))
                .catch(err => console.log(err))
            });
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
                <Chip>Player</Chip>
                <Chip>Captain</Chip> 
                <Chip>Leader</Chip>
                <Button
                    title="Register an Account"
                    onPress={handlePress}
                />
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