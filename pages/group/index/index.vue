<template>
	<view class="container">
		<tn-tabs
			:height="80"
			:list="tab_list"
			:isScroll="false"
			:current="current_tab"
			name="tab-name"
			@change="changeTab">
		</tn-tabs>

		<view class="group-list">
			<view
				class="group-item"
				v-for="item in groupList"
				@click="toDetail(item.id)"
				:key="item.id">
				<view class="avatar"></view>
				<view class="info">
					<view class="title">{{item.title}}</view>
					<view class="desc">团队人数：{{ item.group_members.length }}</view>
				</view>
			</view>
		</view>

		<view class="add-wrap" @click="showMore">
			<text class="tn-icon-add-fill"></text>
		</view>
		
		<uni-popup ref="createPopup" type="center">
			<view class="create-wrap">
				<input type="text" placeholder="请输入要创建团队的名称" v-model="createTitleInput">
				<button @click="create">确定</button>
			</view>
		</uni-popup>
		<uni-popup ref="joinPopup" type="center">
			<view class="join-wrap">
				<input type="text" placeholder="请输入要加入的团队号" v-model="joinIdInput">
				<button @click="join">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import index from './index'
export default index
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
