<template>
	<view class="cover-container" :style="{ width, height }">
		<image v-if="src" :src="src" mode="aspectFill"></image>
		<view v-else class="cover-wrap">{{ title }}</view>
	</view>
</template>

<script>
	export default {
		name:"cover",
		props: {
			title: {
				type: String,
				default: ''
			},
			src: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '240rpx'
			},
			height: {
				type: String,
				default: '140rpx'
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.cover-container {
		overflow: hidden;
		border-radius: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
        background-color: #5fa3fb;
		color: #FFF;
		font-size: 34rpx;
		text-align: center;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
