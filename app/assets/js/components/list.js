import React from "react"
import ColorItem from "./color-item"

export default class Colors extends React.Component {
    render () {
        const items = this.props.items

        const $rows = Object.keys(items).map((cGroupName, index) => {
            const $colors = items[cGroupName].map((color, index) =>
                <ColorItem color={color} key={index} copied={this.props.copied} />
            )
            return <div className="row-colors" key={index}>
                <h4>{cGroupName}</h4>
                <div className="row">{$colors}</div>
            </div>
        })

        return <div className="colors">
            {$rows}
        </div>
    }
}

