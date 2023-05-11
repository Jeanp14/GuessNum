import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function PrimaryButton({children, onPress}: any) {

    /* function pressHandler() {
        onPress();
    } */

    return(
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                style={({pressed}) => pressed 
                    ? [styles.buttonInnerContainer, styles.pressed] 
                    : styles.buttonInnerContainer
                } 
                onPress={onPress} 
                android_ripple={{color: Colors.primary600}}>
                
                <Text style={styles.buttonText}>{children}</Text>
                
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonInnerContainer: {
      //flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: Colors.primary500,
      //borderRadius: 28,
      elevation: 2
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    buttonOuterContainer: {    
        margin: 4,
        borderRadius: 28,
        overflow: 'hidden'
      },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }
  });

export default PrimaryButton;