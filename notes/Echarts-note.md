#### 1.markPoint
```
markPoint: {
    symbol:'circle',
    symbolSize: 20,
    itemStyle: {
        normal:{
            color: '#fff',
            borderColor:'red',
            opacity:0.5
        },
        emphasis:{
            opacity:1
        }
    },
    // coord [2,30]:第二个元素为30；coord:['周二',30]:周二这个元素对应值为30
    data: [{coord:['周二',11]},{coord:['周三',15]}]
}
```
#### 2.鼠标单击事件
```
myChart.on('click', function (params) {
    console.log(params);
});
```
鼠标事件返回params：

```
{
    // 当前点击的图形元素所属的组件名称，
    // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
    componentType: string,
    // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
    seriesType: string,
    // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
    seriesIndex: number,
    // 系列名称。当 componentType 为 'series' 时有意义。
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
    // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
    // 其他大部分图表中只有一种 data，dataType 无意义。
    dataType: string,
    // 传入的数据值
    value: number|Array
    // 数据图形的颜色。当 componentType 为 'series' 时有意义。
    color: string
}
```
#### 3.xAxis

```
// 自定义某个标签样式
xAxis:  {
        type: 'category',
        // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
        // boundaryGap: ['20%', '20%']
        boundaryGap: false,
        data: [{
            value: '周一',
            // 突出周一
            textStyle: {
            color:'rgba(0,0,0,0)',
            fontSize: 20
            }
        },
        '周二','周三','周四','周五','周六','周日']
    },
```
#### 4.markLine

```
markLine: {
    label:{
        normal: {
            show:true,
            // 模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
            formatter:'{c}k',
            position: 'middle'
        },
        emphasis: {
            show:true,
            formatter:'{b}: {c}k',
            position: 'middle'
        }
    },
    lineStyle:{
        normal: {
            color:'#6ab',
            type:'solid'
        }
    },
     data: [[
        {
            name: '预警值',
            value: 19,
            symbol:'circle',
            // [x轴对应位置, 对应的y值]
            coord: [0, 12],
        },
        {
            coord: [6, 12]
        }
    ]],
}
```
#### 5. tooltip

```
var option = {
    tooltip: {
      trigger: "axis",
      formatter: function(params, ticket, callback) {
        let htmlstring = "";
        params.forEach(function(param) {
          // let name = param.seriesName;
          // let index = param.dataIndex;
          let value = param.value;
          let color = param.color;
          htmlstring +=
            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
            color +
            ";'></span>" +
            "偏离度" +
            ":" +
            value +
            "</br>";
        });
        htmlstring +=
          "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#E80013" +
          ";'></span>" +
          "预警" +
          ":" +
          20 +
          "%" +
          "</br>";
        return htmlstring;
      }
    }
}
```
**formatter:** 第一个参数 params 是 formatter 需要的数据集。
格式如下
```
{
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值
    value: number|Array,
    // 数据图形的颜色
    color: string,
    // 饼图的百分比
    percent: number,
    // 
    galleryViewPath: ,
    // 
    galleryEditorPath: ,
    // 
    imagePath: ,
    // 
    gl: ,
}
```


**在 trigger 为 'axis' 的时候**，或者 tooltip 被 axisPointer 触发的时候，**params**是多个系列的数据数组。其中每项内容格式同上，并且
```
{
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值
    value: number|Array,
    // 数据图形的颜色
    color: string,
}
```








