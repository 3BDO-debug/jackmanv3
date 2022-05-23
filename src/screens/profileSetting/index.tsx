import React, { FC } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ProfileSittingView from "./view";

interface ProfileSittingProps {
}

const ProfileSitting: FC<ProfileSittingProps> = ({ }) => {
    return (
        <ProfileSittingView  />
    )
}

export default ProfileSitting;