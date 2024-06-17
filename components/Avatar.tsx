import { getAvatarRecord } from '@/logic/avatar';
import { Image, SkeletonCircle } from '@chakra-ui/react';
import React, { Component } from 'react';

export default class Avatar extends Component<
	{ name: string },
	{ avatar: string; loading: boolean }
> {
	constructor(props: any) {
		super(props);

		this.state = {
			avatar: '',
			loading: true
		};
	}

	componentDidMount(): void {
		(async () => {
			const avatar = await getAvatarRecord(this.props.name);
			this.setState({
				avatar
			});
		})();
	}

	render() {
		return (
			<SkeletonCircle
				w={10}
				h={10}
				isLoaded={!this.state.loading}
				startColor={'bg.skeletonStart'}
				endColor={'bg.skeletonEnd'}
			>
				<Image
					src={this.state.avatar}
					onLoad={() => {
						this.setState({ loading: false });
					}}
					alt="AtlantaImages"
					borderRadius={'full'}
					width={10}
					height={10}
				/>
			</SkeletonCircle>
		);
	}
}
