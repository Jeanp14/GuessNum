import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import InstructionText from "../components/InstructionText";
import Card from "../components/Card";
import GuessLogItem from "../components/GuessLogItem";
import { logItem } from "../utils/types";

function generateRandomBetween(min: number, max: number, exclude: number): number{
    const randomNum = Math.floor(Math.random() * (max - min)) + min;

    if(randomNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return randomNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen(this: any, {userNumber, onGameOver}: any){
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction: any){
        if((direction === 'lower' && currentGuess < userNumber) || 
            (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert("Don't lie!", 'You know that is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }

        if(direction === 'lower'){
            maxBoundary = currentGuess;    
        }else{
            minBoundary = currentGuess + 1;    
        }
        const newRandomNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNum);
        setGuessRounds(previousGuessRounds => [...previousGuessRounds, newRandomNum]);
    }

    const guessRoundsListLength = guessRounds.length;

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                           <Ionicons name="md-add" size={24} color="white"/> 
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white"/>    
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    if(width > 500){
        content = (
            <> 
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                           <Ionicons name="md-remove" size={24} color="white"/> 
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white"/>    
                        </PrimaryButton>
                    </View>
                </View> 
            </>
        )
    }

    return(
        <View style={styles.screen}>
            <Title>Opponent's guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item}/>}
                    keyExtractor={(item) => item.toString()}
                />
            </View>
        </View>
        
    );
    
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },   
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        padding: 16
    },
});

export default GameScreen;