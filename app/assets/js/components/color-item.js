import React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"


export default class ColorItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = { copied: false }
        this.copied = this.copied.bind(this)
    }

    copied () {
        this.setState({ copied: true })
        setTimeout(() => {
            this.setState({ copied: false })
        }, 500);
        this.props.copied(this.props.color)
    }


    render () {
        const sty = {
            backgroundColor: this.props.color
        }
        return <CopyToClipboard text={this.props.color} onCopy={this.copied}>
            <div className={"color-item col" + (this.state.copied ? " copied" : "")} style={sty}>
                { this.state.copied ? null : <div className="copy-btn">Copy</div> }
            </div>
        </CopyToClipboard>
    }
}

