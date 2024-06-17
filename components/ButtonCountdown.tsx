'use client';
import { Button } from '@chakra-ui/react';
import React, { Component } from 'react';


export default class ButtonCountdown extends Component<
	{ initialTimer: number; isStart: boolean },
	{ seconds: number; started: boolean }
> {
	constructor(props: any) {
		super(props);

		this.state = {
			seconds: this.props.initialTimer,
			started: false
		};
	}

	componentDidMount(): void {
		if (this.props.isStart && !this.state.started) {
			this.setState({
				started: true
			});
			this.startCountdown();
		}
	}

	startCountdown() {
        console.log("Start countdown")
		const timerId = setInterval(() => {
			if (this.state.seconds < 1) {
				this.setState({
					started: false
				});
				clearInterval(timerId);
			} else {
				const newSeconds = this.state.seconds - 1;
				this.setState({
					seconds: newSeconds
				});
			}
		}, 1000);
	}


	render() {
		return (
			<Button
				w={'full'}
				p={7}
				transition={'all .5s ease-in-out'}
				color={'primary.text'}
				bgColor={'bg.button.secondary'}
				disabled
			>
				Please wait { this.state.seconds }s
			</Button>
		);
	}
}