# 1. 实现效果
实现效果分解：需实现的几个关键功能点有： 立方体，圆柱体，箭头，动画效果。

![img](https://github.com/leafsu3340/Blogs/blob/master/img/22.png)

# 2.功能实现
考虑每个功能实现方式尽可能简单及后续动画效果的可扩展性，界面元素都采用html5+css3+svg实现。

## 2.1 立方体
CSS3+html5实现立方体：定义立方体的6个面及样式，使用css3的新特性transform实现div的位置转换。
```
/* html 脚本 */
        <ul class="box-3d outside-bank">
          <li class="box-font box-font-back">外部银行</li>
          <li class="box-up box-up-down"></li>
          <li class="box-down box-up-down"></li>
          <li class="box-right box-left-right"></li>
          <li class="box-left box-left-right"></li>
          <li class="box-back box-font-back"></li>
        </ul>
/* less 脚本 */
/*3d-box 位置转换 */
      .box-3d {
        -webkit-transform: rotateX(-30deg) rotateY(-45deg) rotateZ(0deg);
        transform: rotateX(-30deg) rotateY(-45deg) rotateZ(0deg);
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;


        &>li {
          position: absolute;
          list-style: none;
          transform-origin: 0 0 0;
          -webkit-transform-origin: 0 0 0;
        }
      }


      /* 外部银行 */
      .outside-bank {
        z-index: 2;
        position: absolute;
        top: 530px;
        left: 420px;
        -webkit-transform: rotateX(-30deg) rotateY(-48deg) rotateZ(0deg);
        transform: rotateX(-30deg) rotateY(-48deg) rotateZ(0deg);


        .box-font-back {
          width: 150px;
          height: 45px;
        }


        .box-up-down {
          width: 150px;
          height: 10px;
        }


        .box-left-right {
          width: 10px;
          height: 45px;
        }


        .box-font {
          background: #0bb68b;
          line-height: 45px;
          color: #fff;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          -webkit-transform: translateZ(0px);
          transform: translateZ(0px);
        }


        .box-back {
          background: #0bb68b;
          -webkit-transform: translateZ(-10px);
          transform: translateZ(-10px);
        }


        .box-up {
          background: #25e3b3;
          -webkit-transform: rotateX(90deg) translateY(-10px) translateZ(0px);
          transform: rotateX(90deg) translateY(-10px) translateZ(0px);
        }


        .box-down {
          background: #25e3b3;
          -webkit-transform: rotateX(90deg) translateY(-10px) translateZ(-45px);
          transform: rotateX(90deg) translateY(-10px) translateZ(-45px);
        }


        .box-left {
          background: #009570;
          -webkit-transform: rotateY(90deg) translateZ(0px);
          transform: rotateY(90deg) translateZ(0px);
        }


        .box-right {
          background: #009570;
          -webkit-transform: rotateY(90deg) translateZ(150px);
          transform: rotateY(90deg) translateZ(150px);
        }
      }
```
2.2 圆柱体实现
圆柱体采用多个div，画出各自形状，再通过position：absolute层叠拼接可以实现。

![img](https://github.com/leafsu3340/Blogs/blob/master/img/f75767a2-748b-4521-991d-99f80ab90e9a.jpg)

html片段：
```
<div class="total-container">
          <div class="top-text">
            归集账户
          </div>
          <div class="bar-text bar-txt-position0">
            余额
          </div>
          <div class="bar-text bar-txt-position1 text-ellipsis"
            :title="transformMoney(bbjtnbgjFund)">
            {{transformMoney(bbjtnbgjFund)}}</div>
          <div class="top-column">
            <div class="column-cover"></div>
            <div class="column-bar"></div>
            <div class="column-banyuan"></div>
            <div class="column-shadow"></div>
          </div>
          <div class="bottom-column">
            <div class="column-cover"></div>
            <div class="column-bar"></div>
            <div class="column-banyuan">
              <div class="circle-shadow shadow-ps1"></div>
              <div class="circle-shadow shadow-ps2"></div>
            </div>
            <div class="column-shadow"></div>
          </div>
          <div class="bottom-box">
            <ul class="box-3d box-foundation">
              <li class="box-font box-font-back"></li>
              <li class="box-up box-up-down"></li>
              <li class="box-down box-up-down"></li>
              <li class="box-right box-left-right"></li>
              <li class="box-left box-left-right"></li>
              <li class="box-back box-font-back"></li>
            </ul>
          </div>
        </div>
```
less片段
```
.total-container {
        z-index: 3;
        position: absolute;
        top: 0px;
        left: 1000px;
        width: 280px;
        height: 300px;

        .top-text {
          position: absolute;
          color: #f4dd4c;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          text-align: center;
          width: 150px;
          font-weight: bold;
          z-index: 5;
          position: absolute;
          bottom: 235px;
          left: 68px;
        }

        .bar-text {
          &:extend(.pool-textshadow1);
          font-weight: bold;
          color: #cba310;
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          line-height: 22px;
          width: 150px;
          z-index: 5;
          position: absolute;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .bar-txt-position0 {
          left: 68px;
          bottom: 195px;
        }

        .bar-txt-position1 {
          left: 68px;
          bottom: 168px;
        }

        .top-column {
          z-index: 3;
          position: absolute;
          bottom: 142px;
          left: 68px;

          .column-cover {
            width: 150px;
            height: 50px;
            background: rgba(255, 254, 182, 0.5);
            border-radius: 50% 50%;
            position: absolute;
            bottom: 80px;
            z-index: 1;
          }

          .column-bar {
            position: absolute;
            bottom: 58px;
            width: 150px;
            height: 50px;
            background-image: linear-gradient(to top, rgba(255, 254, 182, 0.2) 0%, rgba(255, 254, 182, 0) 100%);
          }

          .column-banyuan {
            &:extend(.pool-textshadow1);
            font-weight: bold;
            width: 150px;
            height: 50px;
            background-image: linear-gradient(to top, rgba(255, 254, 182, 0.3) 0%, rgba(255, 254, 182, 0.2) 100%);
            border-radius: 0 0 100% 100%;
            position: absolute;
            bottom: 8px;
          }

          .column-shadow {
            width: 150px;
            height: 50px;
            background: rgba(230, 192, 20, 0.5);
            border-radius: 50% 50%;
          }

        }

        .bottom-column {
          z-index: 2;
          position: absolute;
          bottom: 78px;
          left: 68px;

          .column-shadow {
            width: 150px;
            height: 50px;
            background: rgba(5, 5, 5, 0.1);
            border-radius: 50% 50%;
          }

          .column-cover {
            width: 150px;
            height: 50px;
            background: #d79b28;
            border-radius: 50% 50%;
            border: 1px solid #fff;
            position: absolute;
            bottom: 55px;
            z-index: 1;
          }

          .column-banyuan {
            &:extend(.pool-textshadow1);
            font-weight: bold;
            width: 150px;
            height: 50px;
            background-image: linear-gradient(to right, #f7f151 0%, #f4dd4c 50%, #f2cc47 100%);
            border-radius: 0 0 100% 100%;
            position: absolute;
            bottom: 8px;

            .circle-shadow {
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 100%;
              background: #3E2502;
            }

            .shadow-ps1 {
              left: 25px;
              bottom: 15px;
            }

            .shadow-ps2 {
              left: 110px;
              bottom: 10px;
            }
          }

          .column-bar {
            &:extend(.pool-textshadow1);
            font-weight: bold;
            color: #fff;
            text-align: center;
            line-height: 80px;
            position: absolute;
            bottom: 58px;
            width: 150px;
            height: 25px;
            background-image: linear-gradient(to right, #f7f151 0%, #f4dd4c 50%, #f2cc47 100%);
          }

        }

        .bottom-box {
          width: 280px;
          height: 110px;
          z-index: 1;
          bottom: 15px;
          position: absolute;

          .box-foundation {
            margin-top: 10px;
            position: absolute;

            &>li {
              border: 1px solid rgba(127, 219, 138, 0.5);
            }

            .box-font-back {
              width: 200px;
              height: 35px;
            }

            .box-up-down {
              width: 200px;
              height: 200px;
            }

            .box-left-right {
              width: 200px;
              height: 35px;
            }

            .box-font {
              background: #148d83;
              -webkit-transform: translateZ(0px);
              transform: translateZ(0px);
            }

            .box-back {
              background: #148d83;
              transform: translateZ(-200px);
              -webkit-transform: translateZ(-200px);
            }

            .box-up {
              background: #26b5a9;
              -webkit-transform: rotateX(90deg) translateY(-200px) translateZ(0px);
              transform: rotateX(90deg) translateY(-200px) translateZ(0px);
            }

            .box-down {
              background: #26b5a9;
              -webkit-transform: rotateX(90deg) translateY(-200px) translateZ(-35px);
              transform: rotateX(90deg) translateY(-200px) translateZ(-35px);
              box-shadow: rgba(0, 0, 0, 0.35) 10px 10px 20px;
            }

            .box-left {
              background: #0e736b;
              -webkit-transform: rotateY(90deg) translateZ(0px);
              transform: rotateY(90deg) translateZ(0px);
            }

            .box-right {
              background: #0e736b;
              -webkit-transform: rotateY(90deg) translateZ(200px);
              transform: rotateY(90deg) translateZ(200px);
            }
          }
        }
      }
```
2.3 箭头

![img](https://github.com/leafsu3340/Blogs/blob/master/img/e639ff4f-5d33-4d0b-97e1-e48cca016c9b.jpg)

因箭头需要实现根据数据大小变换颜色，箭头采用svg实现：
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
            class="triangle-up"
            style="height: 15px;width: 30px;top: 10px;left: 2px;">
            <polygon points="0,10 30,0 20,15"
              :style="{'fill':computeColor(zhejgjFund)}" />
          </svg>
```
使用vue动态赋背景色。

箭身则为普通div，同样vue动态赋背景色
```
<div class="triangle-bar" style="width: 6px;"
            :style="{'background-image':computeBgColor(zhejgjFund)}"></div>
```
在以上两者上再包一层div，使用transform控制箭头的角度即可。完全示例：
```
<div class="vertical-angle va-position2">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
            class="triangle-up"
            style="height: 15px;width: 30px;top: 10px;left: 2px;">
            <polygon points="0,10 30,0 20,15"
              :style="{'fill':computeColor(zhejgjFund)}" />
          </svg>
          <div class="triangle-bar" style="width: 6px;"
            :style="{'background-image':computeBgColor(zhejgjFund)}"></div>
          <div class="angle-text sa-angle-text"
            :title="transformMoney(zhejgjFund)">{{transformMoney(zhejgjFund)}}
          </div>
        </div>
```
```
.vertical-angle {
        z-index: 3;
        position: absolute;
        width: 30px;
        transform: rotate(60deg);
        -webkit-transform: rotate(60deg);

        .triangle-up {
          width: 45px;
          -webkit-transform: rotate(-59deg);
          transform: rotate(-59deg);
          height: 30px;
          position: absolute;
          left: 0;
          top: 0;
        }

        .triangle-bar {
          z-index: 4;
          margin: auto;
          width: 8px;
          height: 100px;
          position: absolute;
          left: 15px;
          top: 20px;
          background-image: linear-gradient(to top, #f8fca9 0%, #fff 50%, #f8fca9 100%);
          // box-shadow: 6px 6px 12px 0px #5d5d5d;
          border-radius: 5px;
        }

        .sa-angle-text {
          &:extend(.angle_text__base);
          width: 50px;
          text-align: left;
          left: -30px;
          top: 10px;
          font-size: 14px;
        }
      }
```
2.4 动画（animation）
应用css3的新特性animation实现动画效果，需要注意的地方是考虑兼容性问题。

可采用less函数自动编译为有兼容性的css代码：
```
/**
* animation - function
*/
.keyframes (@prefix, @name, @content) when (@prefix=def) {
  @keyframes @name {
    @content();
  }
}

.keyframes (@prefix, @name, @content) when (@prefix=moz) {
  @-moz-keyframes @name {
    @content();
  }
}

.keyframes (@prefix, @name, @content) when (@prefix=o) {
  @-o-keyframes @name {
    @content();
  }
}

.keyframes (@prefix, @name, @content) when (@prefix=webkit) {
  @-webkit-keyframes @name {
    @content();
  }
}

.keyframes (@prefix, @name, @content) when (@prefix=all) {
  .keyframes(moz, @name, @content);
  .keyframes(o, @name, @content);
  .keyframes(webkit, @name, @content);
  .keyframes(def, @name, @content);
}
```
动画定义：
```
/* 动画定义 */
.keyframes(all, wave0, {
  0% {
    opacity: 1;
    left: 420px;
    top: 220px;
    transform: rotate(68deg);
    -webkit-transform: rotate(68deg);
  }

  16.6% {
    opacity: 1;
    transform: rotate(68deg);
    -webkit-transform: rotate(68deg);
    left: 610px;
    top: 325px;
  }

  33.2% {
    opacity: 1;
    left: 800px;
    top: 430px;
    transform: rotate(68deg);
    -webkit-transform: rotate(68deg);
  }

  // 拐点1
  49.8% {
    opacity: 1;
    left: 970px;
    top: 525px;
    transform: rotate(68deg);
    -webkit-transform: rotate(68deg);
  }

  50% {
    left: 1010px;
    top: 535px;
    transform: rotate(8deg);
    -webkit-transform: rotate(8deg);
  }

  66.6% {
    left: 1190px;
    top: 435px;
    transform: rotate(8deg);
    -webkit-transform: rotate(8deg);
  }

  // 拐点2
  83.4% {
    left: 1370px;
    top: 330px;
    transform: rotate(8deg);
    -webkit-transform: rotate(8deg);
  }

  83.5% {
    left: 1370px;
    top: 300px;
    transform: rotate(248deg);
    -webkit-transform: rotate(248deg);
  }

  to {
    left: 1200px;
    top: 195px;
    transform: rotate(248deg);
    -webkit-transform: rotate(248deg);
  }
}

);
```
使用：
```
.angle {
      height: 15px;
      width: 20px;
      position: absolute;
      background-image: url(../../../../../img/account-pool/move-angle.png);
      background-repeat: no-repeat;
    }

    .move0 {
      animation: wave0 9s linear infinite;
      -webkit-animation: wave0 9s linear infinite;
    }
```
2.5 布局
画面的元素都实现后，应用position：absolute布局。这部分工作量较繁琐。采用@media媒体查询准备多套css样式的方式以解决适配分辨率问题。
