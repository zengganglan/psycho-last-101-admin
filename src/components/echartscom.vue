<template>
   <div class="charttest">
     <div style="width:800px;height:300px;" :id="echarts" class="echarts" ref="echarts">
     </div>
   </div>
 </template>
  
 <script>
 import $ from "jquery";
import echarts from 'echarts'
   export default {
     name:'echartscom',
     props: {
       chartData: {
         type: Array,
         default: () => []
       },
        index: ''
     },
     data() {
       return {
           option:"",
           xarr:"",
           yarr:""
       };
     },
     watch:{
         option(){
             //childByValue是一个注册事件，调用这个事件父组件会监听
                 this.$emit('childByValue', this.option,this.index)
         }
     },
     mounted(){
         console.log(this.chartData)
         var xarr=[]
         var yarr=[]
         this.chartData.map((item,index)=>{
             xarr.push(item.name)
             var obj={}
             obj['name']=item.name
             obj['value']=item.count || 0
             yarr.push(obj)
         })
         this.xarr=xarr
         this.yarr=yarr
         console.log(xarr,yarr)
         this.drawCharts();
   
     },
     methods: {
       drawCharts() {
         var myChart = echarts.init(document.getElementById(this.echarts));
         var option={
           tooltip: {
             trigger: 'item',
             formatter: '{a} <br/>{b}: {c} ({d}%)'
           },
           legend: {
             orient: 'vertical',
             x: 'left',
             data: this.xarr
           },
           series: [
             {
               name: '访问来源',
               type: 'pie',
               radius: ['50%', '70%'],
               avoidLabelOverlap: false,
               label: {
                 normal: {
                   show: false,
                   position: 'center'
                 },
                 emphasis: {
                   show: true,
                   textStyle: {
                     fontSize: '20',
                     fontWeight: 'bold'
                   }
                 }
               },
               labelLine: {
                 normal: {
                   show: false
                 }
               },
               data: this.yarr
             }
           ]
         }
         this.option=option
         myChart.setOption(option);
       }
     },
     computed: {
       echarts() {
         return 'echarts' + Math.random() * 100000;
       }
     },
   
     components: {}
   };
 </script>
  
 <style></style>