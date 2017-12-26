import React from "react"

export default class AboutPopup extends React.Component {
    constructor() {
        super();
        this.state = {
            open: localStorage.getItem("about_popup") !== "hidden"
        }
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
    }

    open () {
        this.setState({
            open: true
        })
    }

    close () {
        document.body.classList.remove("popup-opened")
        try {
            localStorage.setItem("about_popup", "hidden")
        } catch (e) {}
        this.setState({
            open: false
        })
    }

    render() {
        const sty = { opacity: 0 }
        if (this.state.open) {
            document.body.classList.add("popup-opened")
            sty.opacity = 1
        } else {
            sty.pointerEvents = "none"
        }
        return (
            <div className="popup-overlay about-popup" style={sty}>
                <div className="popup-content">
                    <img src="https://i.imgur.com/B30pd39.png" />
                    <h1><span className="icon-bloggify-logo"></span> Colors</h1>
                    <p><i>Colors</i> is a collection of color palettes. You can easily select the color palette you want, then choose the color you like to use, and copy by tapping/clicking it.</p>
                    <p>If you want to add a new palette, <a href="https://bloggify.org/contact">contact us</a> or open a pull request <a href="https://github.com/Bloggify/cute-colors">here</a>.</p>
                    <p>Check out the <a href="https://github.com/Bloggify/colors">source code</a>.</p>
                    <button className="btn" onClick={this.close}>Get started</button>
                </div>
            </div>
        )
    }
}
