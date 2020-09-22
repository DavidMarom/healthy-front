import React, { Component } from "react";
import socketService from "../services/socketService";

export class Chat extends Component {
    state = {
        msg: { from: "Me", txt: "" },
        msgs: [],
        topic: this.props.topic
    };

    componentDidMount() {
        socketService.setup();
        socketService.emit("chat topic", this.props.topic);
        socketService.on("chat addMsg", this.addMsg);
    }

    componentWillUnmount() {
        socketService.off("chat addMsg", this.addMsg);
        socketService.terminate();
    }

    addMsg = (newMsg) => {
        this.setState((prevState) => ({ msgs: [...prevState.msgs, newMsg] }));
    };

    sendMsg = (ev) => {
        ev.preventDefault();
        socketService.emit("chat newMsg", this.state.msg.txt);
        this.setState({ msg: { from: "Me", txt: "" } });
    };

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value }, () => this.changeTopic(value));
    };

    msgHandleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState((prevState) => {
            return {
                msg: {
                    ...prevState.msg,
                    [name]: value,
                },
            };
        });
    };

    render() {
        return (
            <section>
                <div>
                    {this.state.msgs.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))}
                </div>

                <form onSubmit={this.sendMsg}>
                    <input className="chat-input"
                        type="text"
                        value={this.state.msg.txt}
                        onChange={this.msgHandleChange}
                        name="txt"
                    />
                    <button className="chat-button"><i className="far fa-paper-plane fa-2x"></i></button>
                </form>
            </section>
        )
    }
}