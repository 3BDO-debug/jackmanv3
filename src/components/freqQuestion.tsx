import React, { FC, useState } from 'react'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import CustomButton from './customButton';
import CustomText from './customText';
import { ArrowIcon } from '../constants/svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface FreqQuestionProps {
    item: any
}

const FreqQuestion: FC<FreqQuestionProps> = ({
    item
}) => {
    const [ispress, setIsPress] = useState(false)

    const rotation = useSharedValue(0);




    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const handleLinkPress = async (link) => {
        await Linking.canOpenURL(link);
        Linking.openURL(link);
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
                    setIsPress(!ispress)
                    if (ispress)
                        rotation.value = withTiming(0)
                    else
                        rotation.value = withTiming(180)
                }}
            />

            {ispress &&
                item.link ?
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
                : <CustomText
                    text={item.answer}
                    color="blaceholder"
                    size={10}
                    fontFamily="regular"
                    style={styles.text3}



                />
            }
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
        height: 52,

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
