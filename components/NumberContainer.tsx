import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/colors";

function NumberContainer({children}: any) {
    return(
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      padding: deviceWidth < 380 ? 12 : 24,
      margin: deviceWidth < 380 ? 12 : 24,
      borderColor: Colors.accent500,
      borderWidth: 4,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    numberText: {
        fontSize: deviceWidth < 380 ? 28 : 36,
        color: Colors.accent500,
        //fontWeight: 'bold',
        fontFamily: 'open-sans-bold'  
    },
    
  });

export default NumberContainer;