import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./stackNavigation";
import React from "react";

interface MainNavigationProps {
    initialRouteName: string;
};

const MainNavigation = (props: MainNavigationProps) => {
    return (
        <NavigationContainer>
            <StackNavigation initialRouteName={props.initialRouteName} />
        </NavigationContainer>
    );
};

export default MainNavigation;