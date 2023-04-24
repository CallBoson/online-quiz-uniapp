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

		<!-- 答题 -->
		<block v-if="current_tab === 0">
			<tn-empty style="margin-top: 300rpx;"></tn-empty>
			<view class="add-wrap">
				<text class="tn-icon-add-fill"></text>
			</view>
		</block>

		<!-- 资料 -->
		<block v-else-if="current_tab === 1">
			<tn-empty style="margin-top: 300rpx;"></tn-empty>
			<view class="add-wrap">
				<text class="tn-icon-add-fill"></text>
			</view>
		</block>

		<!-- 成员 -->
		<block v-else-if="current_tab === 2">
			<view class="member-list">
				<view class="member-item" v-for="item in member_list" :key="item.id">
					<view class="avatar" :style="{ backgroundImage: `url(${item.user.avatar})` }"></view>
					<view class="info-wrap">
						<view class="name">群昵称：{{item.name}}</view>
						<view class="role">{{item.authority | roleTypeFilter}}</view>
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
export default {
	data() {
		return {
			tab_list: [
				{ "tab-name": '答题' },
				{ "tab-name": '资料' },
				{ "tab-name": '成员' },
			],
			current_tab: 0,
			member_list: [],
			group_id: '',
		}
	},
	onLoad(options) {
		this.group_id = options.id
	},
	methods: {
		// 切换tab
		changeTab(e) {
			this.current_tab = e
			if (e === 2) {
				this.getMembers()
			}
		},
		getMembers() {
			// 获取成员列表
			uni.post('/group/getMembers', {
				group_id: this.group_id
			}).then(res => {
				console.log(res)
				this.member_list = res.data
			})
		}
	},
	filters: {
		// 角色类型过滤
		roleTypeFilter(type) {
			type = Number(type)
			switch (type) {
				case 1:
					return '团主'
				case 2:
					return '管理员'
				case 3:
					return '成员'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.add-wrap {
    position: fixed;
    right: 30rpx;
    bottom: 150rpx;
    font-size: 100rpx;
    color: #568bffa9;
}

.member-list {
	.member-item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-size: cover;
			background-position: center;
			margin-right: 30rpx;
		}

		.info-wrap {

			.name {
				font-size: 32rpx;
				color: #333;
				margin-bottom: 20rpx;
			}

			.role {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
}
</style>
