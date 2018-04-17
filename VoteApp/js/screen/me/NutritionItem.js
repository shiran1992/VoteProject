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
import Toast from 'react-native-root-toast';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
let category = ['', '奶类', '水果', '蔬菜', '', '', '', '', '', ''];
let categoryColor = ['white', '#EC6867', '#A5D621', '#09CA3F', 'white', 'white', 'white', 'white', 'white', 'white'];
class NutritionItem extends Component {
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
            vtm: 0,      //维生素(g)

            weight: 0
        };
    }

    componentDidMount() {
    }

    upDateNumber(type) {
        if (type === 'add') {
            this.setState({
                weight: this.state.weight + 10
            });
        } else {
            if (this.state.weight > 0) {
                this.setState({
                    weight: this.state.weight - 10
                })
            } else {
                Toast.show('食物重量不可小于0！');
                return;
            }
        }
        let rowData = Object.assign({}, this.props.rowData);
        rowData.weight = type === 'add' ? 10 : -10;
        this.props.upDateBottomNum(rowData);
    }

    render() {
        return (
            <View style={{
                height: 40,
                width: widths,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10
            }}>
                <Text style={{fontSize: 14, color: Colors.primaryText}}>{this.props.rowData.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 14, color: Colors.primaryText}}>重量:</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
                        <TouchableWithoutFeedback onPress={()=> {
                            this.upDateNumber('sub')
                        }}>
                            <Image source={require('../../img/login/subtract_btn.png')} style={{tintColor: '#707070'}}/>
                        </TouchableWithoutFeedback>
                        <Text style={{
                            fontSize: 14,
                            color: Colors.primaryText,
                            width: 30,
                            textAlign: 'center'
                        }}>{this.state.weight}</Text>
                        <TouchableWithoutFeedback onPress={()=> {
                            this.upDateNumber('add')
                        }}>
                            <Image source={require('../../img/login/add_btn.png')} style={{tintColor: '#707070'}}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
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
export default NutritionItem;