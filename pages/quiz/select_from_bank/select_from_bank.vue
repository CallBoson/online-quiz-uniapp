<template>
	<view class="container">
		<tn-tabs class="tabbar" :list="tabList" isScroll :current="currentTab" name="tab-name" @change="changeTab"></tn-tabs>
		<view class="bank-list">
			<view class="bank-item" v-for="item in bankList" :key="item.id" @click="toBank(item.id)">
				<view class="cover-wrap">
					<image v-if="item.cover" :src="item.cover" mode="aspectFill"></image>
					<view v-else class="cover-name">{{ item.name }}</view>
				</view>
				<view class="info-wrap">
					<view class="bank-name">{{ item.name }}</view>
					<view class="question-count">共{{ item.questionCount }}题</view>
				</view>
				<view class="select-btn">选用题目</view>
			</view>
		</view>
		<tn-load-more :status="loadStatus"></tn-load-more>
	</view>
</template>

<script>
import select_from_bank from './select_from_bank'
export default select_from_bank
</script>

<style lang="scss" scoped>
@import './select_from_bank.scss';
</style>
