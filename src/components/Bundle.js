import React, { Component } from 'react'
import Item from './Item';
import { connect } from "react-redux";

import '../css/bundle.css';
import '../css/bundleIcons.css';

export class Bundle extends Component {

    toggleAll() {

        const { bundle, completedCount } = this.props;

        let idArray = [];

        bundle.items.forEach(element => {
            idArray.push(element.id);
        });

        if (bundle.items.length === completedCount) {
            this.props.toggleAll({ idArray, allCompleted: true });
        } else {
            this.props.toggleAll({ idArray, allCompleted: false });
        }

    }

    preventScroll(event) {
        event.stopPropagation();
    }

    render() {
        const { name, reward, items, itemCount } = this.props.bundle;
        const { completedCount } = this.props;

        let progressPercentage = Math.ceil(completedCount / itemCount * 100);

        let rewardElement;
        if (reward) {
            rewardElement =
                <div className="bundle-reward-wrapper">
                    <span className="bundle-reward">
                        <div className={`sprite ${buildClassName(reward.name)}`}></div>
                        <span className="bundle-reward-text">{reward.name} ({reward.itemCount}x)</span>
                    </span>
                    <div className="sprite bg-Bundle_Reward"></div>
                </div>
        }

        return (
            <div className="bundle-item material">

                <div className="bundle-info">
                    <div className={`bundle-icon ${buildClassName(name)}`}></div>

                    <div className="bundle-info-wrapper">
                        <p className="bundle-name">{name}</p>
                        <span className="bundle-count">{completedCount}/{itemCount}</span>
                        <div className="progress-bar material">
                            <div className="cursor" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>

                {rewardElement}

                <div
                    className="bundle-items-wrapper"

                    onWheel={this.preventScroll}
                    onTouchMove={this.preventScroll}
                >
                    {
                        items.map((item, index) => (
                            <Item item={item} key={index} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

function buildClassName(name) {
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/:/g, "");
    name = name.replace(/ /g, "_");
    name = name.replace(/-/g, "_");

    return `bg-${name}`;
}


const mapStateToProps = (state, ownProps) => {

    let completeCount = 0;
    ownProps.bundle.items.forEach(element => {
        if (state.itemReducer[element.id]) {
            completeCount++;
        }
    });

    let status = false;
    if (completeCount >= ownProps.bundle.itemCount) {
        status = true;
    }

    return {
        isComplete: status,
        completedCount: completeCount
    };
};

function mapDispatchToProps(dispatch) {
    return {
        toggleAll: (options) => {
            dispatch({
                type: "TOGGLE_ALL",
                payload: options
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundle);