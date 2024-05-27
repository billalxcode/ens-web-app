'use client';
import {
	Box,
	CircularProgress,
	CircularProgressLabel,
	Text
} from '@chakra-ui/react';
import React, { Component } from 'react';

export default class CircularCountdown extends Component<
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

	componentDidUpdate(): void {
		if (this.props.isStart && !this.state.started) {
			this.setState({
				started: true
			});
			this.startCountdown();
		}
	}

	startCountdown() {
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

	getProgressValue() {
		return (this.state.seconds / this.props.initialTimer) * 100;
	}

	render() {
		return (
			<Box textAlign={'center'}>
				<CircularProgress
					value={this.getProgressValue()}
					size={60}
					thickness={5}
					color={'bg.button.primary'}
					trackColor={'bg.card2'}
				>
					<CircularProgressLabel>
						<Text fontSize={60}>{this.state.seconds}</Text>
					</CircularProgressLabel>
				</CircularProgress>
			</Box>
		);
	}
}
