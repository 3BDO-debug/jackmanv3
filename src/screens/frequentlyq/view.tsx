import React, { FC, useMemo } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from './styles';
import CustomText from "../../components/customText";
import FreqQuestion from "../../components/freqQuestion";


interface FrequentlyqViewProps {
    navigation: NavigationProp<ParamListBase>
}

const FrequentlyqView: FC<FrequentlyqViewProps> = ({ navigation }) => {


    const styles = useMemo(() => createStyles(), []);
    return (
        <ScrollView
            style={styles.container}
        >
            <View style={styles.text}>
                <CustomText
                    text={"Frequently asked \n " + "Questions"}
                    size={25}
                    fontFamily="bold"


                />
            </View>
            <View style={styles.text2}>
                <CustomText
                    text={"All your questions are answered here!"}
                    size={12}
                    fontFamily="regular"
                    color="placeholder"

                />
            </View>




            <FlatList
                showsVerticalScrollIndicator={false}
                data={[{
                    question: 'General', answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed \n" +
                        " diam nonummy nibh euismod tincidunt ut laoreet dolore\n" +
                        " magna aliquam erat volutpat. Ut wisi enim ad"
                }, {
                    question: 'How does it work', answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed \n" +
                        " diam nonummy nibh euismod tincidunt ut laoreet dolore\n" +
                        " magna aliquam erat volutpat. Ut wisi enim ad"
                }, {
                    question: 'How to start', answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed \n" +
                        " diam nonummy nibh euismod tincidunt ut laoreet dolore\n" +
                        " magna aliquam erat volutpat. Ut wisi enim ad"
                },]}
                renderItem={({ item }) => {
                    return (<FreqQuestion
                        item={item}
                    />)
                }}



            />

        </ScrollView>
    )
}
export default FrequentlyqView;