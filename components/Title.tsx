import { Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function Title({children}: any){
    return(
        <Text style={styles.title}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        //fontWeight: 'bold',
        fontFamily: 'open-sans-bold',
        color: Colors.accent500,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
        maxWidth: '80%'
    }
})


export default Title;