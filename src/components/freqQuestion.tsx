import React, { FC, useEffect, useState } from 'react'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import CustomButton from './customButton';
import CustomText from './customText';
import { ArrowIcon } from '../constants/svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface FreqQuestionProps {
    item: any,
    triggeredQuestionState: any
}

const FreqQuestion: FC<FreqQuestionProps> = ({
    item,
    triggeredQuestionState
}) => {
    const [ispress, setIsPress] = useState(false)

    const rotation = useSharedValue(0);

    const [triggeredQuestion, setTriggeredQuestion] = triggeredQuestionState;
    const [rotationAngle, setRotationAngle] = useState(0);



    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotationAngle}deg` }],
        };
    });

    const handleLinkPress = async (link) => {
        await Linking.canOpenURL(link);
        Linking.openURL(link);
    }

    const handleQuestionPress = () => {
        if (item.id === triggeredQuestion) {
            setTriggeredQuestion(null);

        } else {
            setTriggeredQuestion(item?.id);

        }
    };



    useEffect(() => {
        if (triggeredQuestion === item?.id) {
            setRotationAngle(180);
        } else {
            setRotationAngle(0);
        }

    }, [triggeredQuestion])



    const renderLinkComponent = () => {
        let component: any;
        if (item.link) {

            component = (
                <TouchableOpacity onPress={() => {

                    handleLinkPress(item?.answer)
                }}>
                    <CustomText
                        text={item.answer}
                        size={10}
                        fontFamily="regular"
                        style={[styles.text3, { color: Colors.BUTTON }]}
                    />
                </TouchableOpacity>

            )
        } else {

            component = (
                <CustomText
                    text={item.answer}
                    color="blaceholder"
                    size={10}
                    fontFamily="regular"
                    style={item?.link ? styles.linkStyle : styles.text3}
                />
            )
        }

        return component
    }

    return (
        <View style={styles.view}>

            <CustomButton
                containerStyle={[styles.locationBtn, styles.btn]}
                text={item.question}
                textSize={11}
                rightIcon={
                    <Animated.View style={animatedStyle}>
                        <ArrowIcon />
                    </Animated.View>
                }
                textFontFamily="regular"
                textColor="black"
                onPress={() => {
                    handleQuestionPress();

                }}
            />

            {triggeredQuestion === item.id && renderLinkComponent()}
        </View>

    )
}
export default FreqQuestion;

const styles = StyleSheet.create({

    text3: {
        marginBottom: 30,
        paddingLeft: 20,
    },
    locationBtn: {
        backgroundColor: Colors.WHITE,
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        marginBottom: 25,
        height: 80,
        maxWidth: "90%",
        minWidth: "90%"

    },
    linkStyle: {

        marginBottom: 30,
        paddingLeft: 20,
        color: Colors.BUTTON,
        textDecorationLine: 'underline'


    },
    btn: {
        marginBottom: .1,
    },
    view: {
        backgroundColor: Colors.WHITE,
        marginBottom: 25,
        borderRadius: 20,


    },
    icon: {
        marginRight: 10,

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        paddingRight: 30
    }

})
