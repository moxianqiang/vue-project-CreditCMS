<template>
    <div>
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main" ref="chart" style="width: 100%;height:400px;"></div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
    data(){
        return {
            lists:[],
            myChart:''
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(this.$refs.chart);

            // 指定图表的配置项和数据
            var option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    //data: this.lists,
                    data:[200,355,342,643,523,635,546],
                    type: 'line',
                    areaStyle: {}
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option);
        },
    }
}
</script>

<style>
  
</style>