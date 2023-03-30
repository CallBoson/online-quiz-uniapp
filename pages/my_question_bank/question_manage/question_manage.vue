<template>
	<view class="container">
		<view class="header-wrap">
			<view class="question-bank-name">{{ question_bank_name }}</view>
			<view class="info-wrap">
				<view class="owner">出题人：
					<text class="owner-name">{{ owner_info.username }}</text>
				</view>
				<view class="question-count">总题数：{{ questions.length }}题</view>
			</view>
			<input class="search-wrap" placeholder="输入题库关键字搜搜" />
		</view>
	</view>
</template>

<script>
import question_manage from './question_manage'
export default question_manage
</script>

<style lang="scss">
@import './question_manage.scss';
</style>
