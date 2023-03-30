<template>
	<view class="container">
		<view class="cover-wrap" @click="chooseCover">
			<image v-if="form.cover" class="cover-image" :src="form.cover" mode="aspectFill"></image>
			<view v-else class="cover-image">{{ form.name }}</view>
			<view class="change-cover-btn">点击更换封面</view>
		</view>
		<tn-form style="padding: 0 30rpx;background-color: #FFF;" :model="form">
			<tn-form-item label="标题" prop="name">
				<tn-input v-model="form.name" placeholder="请输入题库名称"></tn-input>
			</tn-form-item>
			<tn-form-item label="分类" prop="tagIds">
				<tn-checkbox-group v-model="form.tagIds">
				<tn-checkbox v-for="item in tags" :key="item.id"
					:name="item.id">{{item.name}}</tn-checkbox>
				</tn-checkbox-group>
			</tn-form-item>
			<tn-form-item label="是否公开" prop="is_private" :labelWidth="150">
				<tn-radio-group v-model="form.is_private">
					<tn-radio name="0">是</tn-radio>
					<tn-radio name="1">否</tn-radio>
				</tn-radio-group>
			</tn-form-item>
		</tn-form>
		<view class="btn-wrap">
			<tn-button class="save-btn" @click="mode === 'edit' ? edit() : create()" shadow width="600rpx" height="80rpx" blockRepeatClick>{{ mode === 'create' ? '创建' : '保存' }}题库</tn-button>
		</view>
	</view>
</template>

<script>
import create from './create.js'
export default create
</script>

<style scoped lang="scss">
@import './create.scss';
</style>
