<template>
	<view>
		<wx-open-audio :id="id" :ref="id" :title="item.title" :singer="item.singer" :episode="item.episode" :src="item.src" :cover="item.cover">
			<script v-is="script" type="text/wxtag-template" slot="default">
				<div class="icon-font">
					<span class="iconfont icon-play" :style="{width:width,height:height,color:color}"></span>
				</div>
			</script>
			<script v-is="script" type="text/wxtag-template" slot="playing">
				<div class="icon-font">
					<span class="iconfont icon-pause" :style="{width:width,height:height,color:color}"></span>
				</div>
			</script> 
			<script v-is="script" type="text/wxtag-template" slot="style">
			    <style v-is="style">
			        @font-face {
			          font-family: "iconfont";
			          src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAN4AAsAAAAACDQAAAMqAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDIgqDPIMjATYCJAMUCwwABCAFhGcHYBtNBxEVnA/Ifg64m1k5a9v6aBrVaCRrNevLyY8W6TIzc0dQrVVZ3T3zhKCAPaFChZJIIQl5dy8UoGIPQMJ9bAD8uZ8CgUrPswQHrEac5r+k6Yfk3k9RrXq24CZJGRJyO1+hOjscOV8QaiGrSQls/3PMeOUF/NcAUBkUETjbeDTaG1DHRdId4b0DP/cbxi5oiZ8RaGuyOdKibPl0ouM2aryJvgqzP0iSY5sUdKI1VysNyaG1UHc9WsQ5Fel4eoazwc/Hb1OjNUmVmU9asjVjTdwfqR/5fLhR5DeOTFcGlydUyBi/MW1sbDZvkKPweFnbqtuKyagVIX3b9SPfaEwuygVqNsw5CC7J/zxRMxPbg3kwUvimHDrBN00n8SNHJ/Mjz/0quRVoC4uexF2MGc657mDqurGxa79qfd8eDpbiRJP6cHO7k738YXdPnGiJVkeut0sLmyt6NXVUHPv6dC3s09lhny8+tnv+Zt0e7rVte+JK5CNXuwy6bC2q3cNytaLHbrna42y3f2kmHQRevyyrdRi6et9ZVS/7GF07mpjp8P1CPXDLxOA8ryOSViJhJcXYZvijrYRIjvHYn4u8aHoy7vV+ktyUSabvfv6+bMwtnJk9PfwxEO/c3JyzGzQq75o+HBAyHyFNfpDn/0Ug2PZt499Dp1n/rdsV8P5vXAauRhbD4rSW6Mz+l5INHbsWjYkkparSMQraDjNkkNDW0vADU6Grd9NIu3UOElpnOAySVvpB1tpQRMGMhUo7U6HW2mxoa5zFp9vpZpcsShuMdAxA6KwZko5uQNbZQ0TBPIdKT9+h1tl/aGtVdLiuHcXIYCkEasAilTaRTHnclplg0mMQdYdiWeAc0JfQR6KhSD6WAw9wjB1+Q8SM4YSjckmWPg0cRxGNqgbMhKrG6Hg4zKu+JcSUO5FCoAYsotImJFMe97qb7O87BlF3KHZEnIfRl3ByIiok0gGRE3udqm7kFr8hYozhBEcQdYksXwSOowhdvagGzIRUBwR1XNjqxruKQ8tL3Rc8BG2ZX1sFQ6AwOJVdDm3Palr3YUerJqDiPMgkMgeCXDrORlNFTjUxAQAA') format('woff2');
			        }
			        .iconfont {
			          font-family: "iconfont" !important;
			          font-style: normal;
			          -webkit-font-smoothing: antialiased;
			          -moz-osx-font-smoothing: grayscale;
			        }
			        .icon-play:before {
			          content: "\e66f";
			        }
			        .icon-pause:before {
			          content: "\e670";
			        }
					.icon-font {
						text-align: center;
					}
			    </style>
			</script>
		</wx-open-audio>
	</view>
</template>

<script>
	export default {
		name:"zx-wx-open-audio",
		data() {
			return {
				
			};
		},
		props: {
			id: {
				type: String,
				default: 'audio_id'
			},
			item: {
				type: Object,
				default: function(){
					return {};
				}
			},
			width: {
				type: Number,
				default: 40
			},
			height: {
				type: Number,
				default: 40
			},
			lineHeight: {
				type: Number,
				default: 40
			},
			color: {
				type: String,
				default: '#ffffff'
			}
		}
	}
</script>

<style>

</style>