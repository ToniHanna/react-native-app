import {useState} from 'react'
import { View, StyleSheet,Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {auth} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { TextInput, Button } from 'react-native-paper';
export const Auth = () => {
    const { colors } = useTheme();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const signUp = async () => { //we are working with promises
        try{
            await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        } catch(err){
            console.error(err);
        }
    }
    const handleLogin = async () => {
        console.log("Email:", email);
        console.log("Password:", password);
          try{
            await signInWithEmailAndPassword(auth, email.trim(), password.trim())
        } catch(err){
            console.error(err);
        }
      }

    auth.onAuthStateChanged(user => { //we keep track of the user whether signed in or out (if logout return null)
        console.log(user)
    })
    return(
        <View style={styles.container}> 
            <TextInput  
                mode="outlined"
                label="Email" 
                style={styles.input}
                onChangeText={(text)=>setEmail(text)}
            />
            <TextInput  
                mode="outlined"
                label="Password" 
                secureTextEntry
                style={styles.input}
                right={<TextInput.Icon icon="eye" />}
                onChangeText={(text)=>setPassword(text)} 
            />
            <Button onPress={handleLogin} mode='elevated' style={styles.button}>Sign in</Button>
            <Button onPress={signUp} mode='elevated' style={styles.button}>Sign up</Button>
        </View>
    )
}
const styles=StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    input: {
        width:200,
    },
    button: {
        margin:8,
        width:200,
        height:40,
    }
})