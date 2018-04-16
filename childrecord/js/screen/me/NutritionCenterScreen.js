import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    ListView,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
import EpidemicDetailScreen from './EpidemicDetailScreen';
import NutritionItem from './NutritionItem';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
let category = ['', '奶类', '水果', '蔬菜', '', '', '', '', '', ''];
let categoryColor = ['white', '#EC6867', '#A5D621', '#09CA3F', 'white', 'white', 'white', 'white', 'white', 'white'];
class NutritionCenterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [[], [], [], [], [], [], [], [], [], []],
            ene_per: 0,      //能量(g/g)
            pro_per: 0,      //蛋白质(g/g)
            fat_per: 0,      //脂肪(g/g)
            cal_per: 0,      //钙(g/g)
            car_per: 0,      //碳水化合物(g/g)
            vtm_per: 0,      //维生素(g/g)

            ene: 0,      //能量(g)
            pro: 0,      //蛋白质(g)
            fat: 0,      //脂肪(g)
            cal: 0,      //钙(g)
            car: 0,      //碳水化合物(g)
            vtm: 0      //维生素(g)
        };
    }

    componentDidMount() {
        this.getNutritionList();
    }

    //获取食物列表
    getNutritionList() {
        let foods = [[], [], [], [], [], [], [], [], [], []];
        let url = StaticData.servlet + 'GetAllFoodsServlet?';
        let params_json = {};
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                for (let i = 0; i < json.length; i++) {
                    foods[parseInt(json[i].type)].push(json[i]);
                }
                this.setState({
                    foods: foods
                });
            }
        });
    }

    upDateBottomNum(rowDate) {
        this.setState({
            ene: this.state.ene + parseInt(rowDate.ene_per) * rowDate.weight,      //能量(g)
            pro: this.state.pro + parseFloat(rowDate.pro_per) * rowDate.weight,      //蛋白质(g)
            fat: this.state.fat + parseFloat(rowDate.fat_per) * rowDate.weight,      //脂肪(g)
            cal: this.state.cal + parseFloat(rowDate.cal_per) * rowDate.weight,      //钙(g)
            car: this.state.car + parseFloat(rowDate.car_per) * rowDate.weight,      //碳水化合物(g)
            vtm: this.state.vtm + parseFloat(rowDate.vtm_per) * rowDate.weight      //维生素(g)
        })
    }

    renderItem(rowData) {
        return (
            <NutritionItem rowData={rowData} upDateBottomNum={this.upDateBottomNum.bind(this)}/>
        );
    }

    renderSection(arr) {
        if (arr.length === 0) {
            return null;
        }
        let type = parseInt(arr[0].type);
        let showItems = [];
        for (let i = 0; i < arr.length; i++) {
            showItems.push(
                <View key={i}>{this.renderItem(arr[i])}</View>
            )
        }
        return (
            <View>
                <View style={{
                    height: 50,
                    width: widths,
                    backgroundColor: categoryColor[type],
                    justifyContent: 'center',
                    paddingLeft: 15
                }}>
                    <Text style={{fontSize: 16, color: 'white'}}>{category[type]}</Text>
                </View>
                {showItems}
            </View>
        );
    }

    renderView() {
        let showSections = [];
        for (let i = 0; i < this.state.foods.length; i++) {
            if (this.state.foods[i] && this.state.foods[i].length > 0) {
                showSections.push(
                    <View key={i}>
                        {this.renderSection(this.state.foods[i])}
                    </View>
                );
            }
        }
        return showSections;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title={'营养中心'} leftText={'返回'} leftPress={()=> {
                    this.props.navigator.pop()
                }}/>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: Colors.commonBG
                }}>
                    <View style={{width: widths / 6, height: widths / 6, padding: 2.5, justifyContent: 'center'}}>
                        <View style={styles.showNum}>
                            <Text style={{fontSize: 12, color: Colors.primaryText}}>能量</Text>
                            <Text style={{
                                fontSize: 12,
                                color: Colors.primaryText,
                                marginTop: 5
                            }}>{this.state.ene/1000}kJ</Text>
                        </View>
                    </View>
                    <View style={{width: widths / 6, height: widths / 6, padding: 2.5, justifyContent: 'center'}}>
                        <View style={styles.showNum}>
                            <Text style={{fontSize: 12, color: Colors.primaryText}}>蛋白质</Text>
                            <Text style={{
                                fontSize: 12,
                                color: Colors.primaryText,
                                marginTop: 5
                            }}>{this.state.pro.toFixed(3)}g</Text>
                        </View>
                    </View>
                    <View style={{width: widths / 6, height: widths / 6, padding: 2.5, justifyContent: 'center'}}>
                        <View style={styles.showNum}>
                            <Text style={{fontSize: 12, color: Colors.primaryText}}>脂肪</Text>
                            <Text style={{
                                fontSize: 12,
                                color: Colors.primaryText,
                                marginTop: 5
                            }}>{this.state.fat.toFixed(3)}g</Text>
                        </View>
                    </View>
                    <View style={{width: widths / 6, height: widths / 6, padding: 2.5, justifyContent: 'center'}}>
                        <View style={styles.showNum}>
                            <Text style={{fontSize: 12, color: Colors.primaryText}}>钙</Text>
                            <Text style={{
                                fontSize: 12,
                                color: Colors.primaryText,
                                marginTop: 5
                            }}>{this.state.cal.toFixed(3)}g</Text>
                        </View>
                    </View>
                    <View style={{width: widths / 6, height: widths / 6, padding: 2.5, justifyContent: 'center'}}>
                        <View style={styles.showNum}>
                            <Text style={{fontSize: 12, color: Colors.primaryText}}>碳水化合物</Text>
                            <Text style={{
                                fontSize: 12,
                                color: Colors.primaryText,
                                marginTop: 5
                            }}>{this.state.car.toFixed(3)}g</Text>
                        </View>
                    </View>
                    <View style={{width: widths / 6, height: widths / 6, padding: 2.5, justifyContent: 'center'}}>
                        <View style={styles.showNum}>
                            <Text style={{fontSize: 12, color: Colors.primaryText}}>维生素</Text>
                            <Text style={{
                                fontSize: 12,
                                color: Colors.primaryText,
                                marginTop: 5
                            }}>{this.state.vtm.toFixed(3)}g</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        {this.renderView()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    showNum: {
        borderWidth: 1,
        borderColor: Colors.separatorLine,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default NutritionCenterScreen;