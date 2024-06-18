'use client';
import { Button } from '@chakra-ui/react';
import React, { Component } from 'react';

interface ButtonCountdownProps {
	initialTimer: number;
	isStart: boolean;
}

interface ButtonCountdownState {
	seconds: number;
	started: boolean;
}

export default class ButtonCountdown extends Component<
	ButtonCountdownProps,
	ButtonCountdownState
> {
	timerId: NodeJS.Timeout | null = null;

	constructor(props: ButtonCountdownProps) {
		super(props);

		this.state = {
			seconds: this.props.initialTimer,
			started: false
		};
	}

	componentDidMount(): void {
		if (this.props.isStart && !this.state.started) {
			this.startCountdown();
		}
	}

	componentDidUpdate(prevProps: ButtonCountdownProps): void {
		if (this.props.isStart && !this.state.started) {
			this.startCountdown();
		}

		// Restart the countdown if the initialTimer prop changes
		if (this.props.initialTimer !== prevProps.initialTimer) {
			this.setState(
				{
					seconds: this.props.initialTimer,
					started: false
				},
				() => {
					if (this.props.isStart) {
						this.startCountdown();
					}
				}
			);
		}
	}

	componentWillUnmount(): void {
		if (this.timerId) {
			clearInterval(this.timerId);
		}
	}

	startCountdown = (): void => {
		this.setState({ started: true });
		this.timerId = setInterval(() => {
			this.setState((prevState) => {
				if (prevState.seconds <= 1) {
					if (this.timerId) {
						clearInterval(this.timerId);
					}
					return { seconds: 0, started: false };
				} else {
					return {
						seconds: prevState.seconds - 1,
						started: prevState.started
					};
				}
			});
		}, 1000);
	};

	render(): JSX.Element {
		return (
			<Button
				w={'full'}
				p={7}
				transition={'all .5s ease-in-out'}
				color={'primary.text'}
				bgColor={'bg.button.secondary'}
				disabled
			>
				Please wait {this.state.seconds}s
			</Button>
		);
	}
}
