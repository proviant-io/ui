import * as React from "react";
import {Classes, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";

class MenuCategories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {title: "Fridge"},
                {title: "Freezer"},
                {title: "Storage"},
            ]
        };
    }

    render() {
        return (
            <Menu
                className={`${
                    Classes.ELEVATION_0
                } page-header__navigation-list page-header__navigation-list--side-bar`}
            >
                <MenuDivider title="Categories"/>
                {this.state.items.map(item => (
                    <MenuItem icon="dot" text={item.title}/>
                ))}
            </Menu>
        );
    }
}

export default MenuCategories