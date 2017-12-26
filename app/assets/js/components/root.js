import React from "react"
import DropdownMenu from "react-dd-menu"
import CuteColors from "cute-colors"
import ColorsList from "./list"
import Tooltip from 'rc-tooltip';
import AboutPopup from './about-popup';
import Slider, { Handle, createSliderWithTooltip } from 'rc-slider';

const Range = createSliderWithTooltip(Slider.Range);

const handle = (props) => {
    const { value, dragging, index } = props;
    delete props.value
    delete props.dragging
    delete props.index
    return (
        <Handle value={value} {...props} />
    );
}


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isMenuOpen: false,
            palettes: CuteColors.getPalettes(),
            simplicity: 0.2
        }
        this.state.selectedPalette = this.state.palettes[0]
        this.click = this.click.bind(this);
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.changeSimplicity = this.changeSimplicity.bind(this);
        this.copied = this.copied.bind(this)
        this.showAbout = this.showAbout.bind(this)
    }

    showAbout () {
        this.refs.aboutPopup.open()
    }

    changeSimplicity (simplicity) {
        this.setState({ simplicity })
    }

    toggle() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    close() {
        this.setState({ isMenuOpen: false });
    }

    click(selectedPalette) {
        console.log('You clicked an item');
        this.setState({ isMenuOpen: false, selectedPalette });
    }

    copied (color) {
        setTimeout(() => {
            this.setState({ copied: color })
            setTimeout(() => {
                this.setState({ copied: "" })
            }, 500);
        }, 100);
    }

    render() {
        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <button className="btn" type="button" onClick={this.toggle}>
                Palette: {this.state.selectedPalette[0].toUpperCase() + this.state.selectedPalette.slice(1)}
            </button>,
            align: 'right'
        }

        const $items = this.state.palettes.map((cPalette, index) => {
            return <li key={index}>
                <button onClick={this.click.bind(this, cPalette)}>
                    {cPalette[0].toUpperCase() + cPalette.slice(1)}
                </button>
            </li>
        })

        const colors = CuteColors.getColors(this.state.selectedPalette, this.state.simplicity)
        const sty = {
            backgroundColor: this.state.copied
        }

        return (
            <div>
                <AboutPopup ref="aboutPopup" />
                <div className="app-content">
                    <div className="text-center">
                        <DropdownMenu {...menuOptions}>
                            {$items}
                        </DropdownMenu>
                        <div className="slider-wrapper">
                            Amount of colors:
                            <Slider step={0.1} min={0} max={1} defaultValue={0.2} handle={handle} onChange={this.changeSimplicity} />
                        </div>
                        <button className="btn" onClick={this.showAbout}>?</button>
                    </div>
                    <ColorsList items={colors} copied={this.copied} />
                    <div style={sty} className={"copied-overlay " + (this.state.copied ? "visible" : "")}>
                        <div className="overlay-content">
                            Copied!
                        </div>
                    </div>
                    <div className="footer text-center">
                        Coded with
                        <span className="emoji-icon">
                            💖
                        </span>
                        and JavaScript.<br/>
                        <a target="_blank" href="https://bloggify.org" className="footer-icon">
                            <span className="icon-bloggify-mark "></span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
