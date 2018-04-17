import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    ListView,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
import Echarts from 'native-echarts';
import EditPointScreen from './EditPointScreen';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class FirstPageScreen extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            babyInfo: undefined,
            points: [],
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        this.getBabyInfo(JSON.parse(Application.getUserInfo()).uid);
    }

    //获取对应baby信息
    getBabyInfo(uid) {
        let url = StaticData.servlet + 'GetBabyInfoByUidServlet?';
        let params = JSON.stringify({
            uid: uid
        });
        API.call(url, params, (json)=> {
            if (json) {
                this.setState({
                    babyInfo: json
                });
                this.getGrowList(json.bid);
                Application.setBabyInfo(JSON.stringify(json));
            }
        });
    }

    //获取输入的grow
    getGrowList(bid) {
        let url = StaticData.servlet + 'GetGrowByUidServlet?';
        let params_json = {
            bid: bid
        };
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    points: json,
                    dataSource: ds.cloneWithRows(json)
                })
            }
        });
    }

    pushAddPoint() {
        this.props.navigator.push({
            component: EditPointScreen,
            passProps: {
                bid: this.state.babyInfo.bid,
                type: 'add',
                getGrowList: this.getGrowList.bind(this)
            }
        })
    }

    pushEditPoint(rowData) {
        this.props.navigator.push({
            component: EditPointScreen,
            passProps: {
                bid: this.state.babyInfo.bid,
                getGrowList: this.getGrowList.bind(this),
                gid: rowData.gid,
                age: rowData.age,
                weight: rowData.weight
            }
        })
    }

    containInArr(arr, age) {

    }

    showOption(points) {
        let ageArr = [];
        let weightArr = [];
        if (points && points.length > 0) {
            for (let j = 0; j < points[0].age; j++) {
                weightArr.push(0);
            }
            for (let i = points[0].age; i <= points[points.length - 1].age; i++) {
                if(points[i - points[0].age]){
                    weightArr.push(points[i - points[0].age].weight);
                }else{
                    weightArr.push(0);
                }
            }
        }
        var option = {
            title: {
                text: '儿童成长曲线图',
                subtext: '记录孩子生长的全过程'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
            //右上角工具条
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        formatter: '{value} *月'
                    },
                    data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
                        "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
                        "30", "31", "32", "33", "24", "35", "36"]
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} kg'
                    }
                }
            ],
            series: [
                {
                    name: '偏低',
                    type: 'line',
                    data: [2.5, 3, 3.3, 4, 4.8, 5.4, 5.8, 6, 6.2, 6.3,
                        6.4, 6.48, 6.55, 6.6, 6.65, 6.7, 6.84, 6.96, 7.11, 7.26,
                        7.40, 7.53, 7.65, 7.77, 7.89, 8.01, 8.13, 8.25, 8.37, 8.49,
                        8.6, 8.70, 8.79, 8.87, 8.94, 9.0],
                    markPoint: {
                        data: []
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#FF5F13'
                            }
                        }
                    }
                },
                {
                    name: '正好',
                    type: 'line',
                    data: [3.5, 4.5, 5.0, 6, 6.8, 7.3, 7.8, 8.2, 8.5, 8.75,
                        9.00, 9.25, 9.5, 9.73, 9.95, 10.15, 10.40, 10.65, 10.90, 11.14,
                        11.37, 11.60, 11.82, 12.03, 12.25, 12.48, 12.65, 12.81, 12.96, 13.10,
                        13.23, 13.35, 13.46, 13.59, 13.68, 13.8],
                    markPoint: {
                        data: []
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#57B847'
                            }
                        }
                    }
                },
                {
                    name: '偏高',
                    type: 'line',
                    data: [5.0, 6.5, 7.8, 9.6, 10.4, 11, 11.5, 12, 12.4, 12.8,
                        13.1, 13.6, 13.9, 14.2, 14.5, 14.8, 15.06, 15.22, 15.45, 15.68,
                        15.90, 16.18, 16.48, 16.86, 17.30, 17.72, 18.12, 18.50, 18.86, 19.28,
                        19.60, 19.90, 20.18, 20.44, 20.68, 20.8],
                    markPoint: {
                        data: []
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#DD4E42'
                            }
                        }
                    }
                }
            ]
        };

        if (points && points.length > 0) {
            option.series.push({
                name: '宝宝',
                type: 'line',
                data: weightArr,
                markPoint: {
                    data: []
                },
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: 'black'
                        }
                    }
                }
            });
        }

        return option;
    }

    renderRow(rowData, seactionID, rowID) {
        return (
            <TouchableWithoutFeedback onPress={()=> {
                this.pushEditPoint(rowData);
            }}>
                <View style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.separatorLine,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 18}}>年龄：{rowData.age}个月</Text>
                    <Text style={{fontSize: 18, marginLeft: 30}}>体重：{rowData.weight}kg</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        let showView =
            <View style={{flex: 1}}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
                <View style={{
                    width: widths,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    backgroundColor: Colors.commonBG
                }}>
                    <Text style={{fontSize: 18, color: Colors.buttonBG}} onPress={()=> {
                        this.pushAddPoint();
                    }}>增加</Text>
                </View>
            </View>
        if (!this.state.babyInfo) {
            showView =
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        style={{
                            width: widths / 2,
                            height: widths / 640 * 448 / 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        source={require('../../img/login/placehold.jpg')}/>
                    <Text style={{color: Colors.primaryText, fontSize: 16, marginTop: 10}}>
                        还没有输入宝宝信息哦~
                    </Text>
                    <Text style={{color: Colors.primaryText, fontSize: 16, marginTop: 5}}>
                        快到“我的”里面登记宝宝信息
                    </Text>
                </View>
        }
        if (this.state.points && this.state.points.length == 0) {
            showView =
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: Colors.primaryText, fontSize: 16}}>
                        还没有输入宝宝生长点哦~
                    </Text>
                    <View style={{
                        width: widths,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        backgroundColor: Colors.commonBG
                    }}>
                        <Text style={{fontSize: 18, color: Colors.buttonBG}} onPress={()=> {
                            this.pushAddPoint();
                        }}>增加</Text>
                    </View>
                </View>
        }
        return (
            <View style={styles.container}>
                <NavigatorBar title={'首页'}/>
                <Echarts option={this.showOption(this.state.points)} height={300}/>
                {showView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default FirstPageScreen;