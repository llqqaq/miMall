<template>
  <div class="service">
    <div class="container">
      <ul>
        <li>
          <span class="icon-setting"></span>
          预约维修服务
        </li>
        <li>
          <span class="icon-7day"></span>
          七天无理由退货
        </li>
        <li>
          <span class="icon-15day"></span>
          15天免费换货
        </li>
        <li>
          <span class="icon-post"></span>
          满150元包邮
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
.service{
    .container{
        ul{
            padding: 33px 0;
            display: flex;
            li{
                width: 24.9%;
                font-size: 16px;
                color: #666666;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                }
                .icon-setting{
                    @include bgImg(20px,20px,'/imgs/icon-setting.png')
                }
                .icon-7day{
                    @include bgImg(20px,20px,'/imgs/icon-7day.png')
                }
                .icon-15day{
                    @include bgImg(20px,20px,'/imgs/icon-15day.png')
                }
                .icon-post{
                    @include bgImg(20px,20px,'/imgs/icon-post.png')
                }
            }
        }
    }
}
</style>