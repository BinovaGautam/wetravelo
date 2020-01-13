import React, { Component } from 'react'
import { Text, View,TouchableOpacity, FlatList} from 'react-native'
import moment from 'moment'
import Month from './Month'

export default class RangePicker extends Component {
    constructor(props){
        super(props)
        this.state = { maxMonth : 12, initialMonth : moment(), isHistorical:false}
    }

    componentDidMount() {
       let res = this.getMonthStack()

       console.warn(res)
    }

    getMonthStack =() =>{
		let res = [];
		const { maxMonth, initialMonth, isHistorical } = this.state;
		let initMonth = moment();
		if(initialMonth && initialMonth != '')
			initMonth = moment(initialMonth, 'YYYYMM');

		for(let i = 0; i < maxMonth; i++){
			res.push(
        !isHistorical ? (
          initMonth.clone().add(i, 'month').format('YYYYMM')
        ) : (
          initMonth.clone().subtract(i, 'month').format('YYYYMM')
        )
      );
		}

		return res;
	}
   

    handleRenderRow(month, index) {
		const { selectedBackgroundColor, selectedTextColor, todayColor, ignoreMinDate, minDate, maxDate , buttonColor } = this.props;
		let { availableDates, startDate, untilDate } = this.state;



		if(availableDates && availableDates.length > 0){
			availableDates = availableDates.filter(function(d){
				if(d.indexOf(month) >= 0)
					return true;
			});
		}

		return (
			<Month
				onSelectDate={this.onSelectDate}
				startDate={startDate}
				untilDate={untilDate}
				availableDates={availableDates}
				minDate={minDate ? moment(minDate, 'YYYYMMDD') : minDate}
				maxDate={maxDate ? moment(maxDate, 'YYYYMMDD') : maxDate}
				ignoreMinDate={ignoreMinDate}
				dayProps={{selectedBackgroundColor, selectedTextColor, todayColor , buttonColor}}
            	month={month} />
            
          
		)
	}


    render() {
        return (
            <View style={{flex:1,backgroundColor: "#fff",}}>
                <FlatList
						style={{ flex: 1 }}
			            data={this.getMonthStack()}
			            renderItem={ ({item, index}) => { 
							return this.handleRenderRow(item, index)
						}}
						keyExtractor = { (item, index) => index.toString() }
			            showsVerticalScrollIndicator={false}
					/>
            </View>
        )
    }
}
