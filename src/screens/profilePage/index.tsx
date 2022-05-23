import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ProfileView from "./view";


interface ProfilePageProps {
    navigation: NavigationProp<ParamListBase>
    route: NavigationRoute<ParamListBase>
}

const ProfilePage: FC<ProfilePageProps> = ({ navigation, route }) => {
    return (
        <ProfileView navigation={navigation} route={route} />
    )
}

export default ProfilePage;