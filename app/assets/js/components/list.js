import React from "react"
import ColorItem from "./color-item"

export default class Colors extends React.Component {
    render () {
        const items = this.props.items
        const itemNames = Object.keys(items)
        const height = window.innerHeight / itemNames.length

        const $rows = itemNames.map((cGroupName, index) => {
            const $colors = items[cGroupName].map((color, index) =>
                <ColorItem color={color} key={index} copied={this.props.copied} height={height} />
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

