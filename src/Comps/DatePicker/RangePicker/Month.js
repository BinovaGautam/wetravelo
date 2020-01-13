'use strict'
import React from 'react';
import {
	View,
	Text
} from 'react-native';
import DayRow from './DayRow'
import moment from 'moment'

export default class Month extends React.Component {
	constructor(props) {
		super(props);
	}

	


	getDayStack(month){
		let res = [];
		let currMonth = moment(month).month(); //get this month
		let currDate = moment(month).startOf("month"); //get first day in this month

		let dayColumn = [];
		let dayRow = [];
		let dayObject = {};
		let {startDate, untilDate, availableDates, minDate, maxDate, ignoreMinDate} = this.props;
		minDate = moment()

		do{
			dayColumn = [];
			for(let i = 0; i < 7; i++){
				dayObject = {
					type : null,
					date: null
				};
				if(i == currDate.days() && currDate.month() == currMonth)
				{
					if(minDate && minDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") < minDate.format("YYYYMMDD")){
						if(startDate && startDate.format('YYYYMMDD') > currDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") > moment().format("YYYYMMDD") && ignoreMinDate){}
						else{
							dayObject.type = 'disabled';
						}
					}
					if(maxDate && maxDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") > maxDate.format("YYYYMMDD")){
						dayObject.type = 'disabled';
					}
					if(availableDates && availableDates.indexOf(currDate.format("YYYYMMDD")) == -1){
						dayObject.type = 'blockout';
					}
					if(startDate && startDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')){
						if(!untilDate)
							dayObject.type = 'single';
						else{
							dayObject.type = 'first';
						}
					}
					if(untilDate && untilDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')){
						dayObject.type = 'last';
					}
					if((startDate && startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD')) && 
						(untilDate && untilDate.format('YYYYMMDD') > currDate.format('YYYYMMDD')))
						dayObject.type = 'between';

					dayObject.date = currDate.clone().format('YYYYMMDD');
					dayColumn.push(dayObject);
					currDate.add(1, 'day');
				}
				else{
					if(startDate && untilDate &&
						(
							startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD')  && 
							untilDate.format('YYYYMMDD') >= currDate.format('YYYYMMDD')
						)
					)
						dayObject.type = 'between';

					dayColumn.push(dayObject);
				}
			}

			dayRow.push(dayColumn);
		} while (currDate.month() == currMonth);

		return dayRow;
	}

	render() {
		const { month, dayProps , buttonColor } = this.props;
		const dayStack = this.getDayStack(moment(month, 'YYYYMM'));
		return (
			<View>
				<Text style={{fontSize: 24,letterSpacing:1,letterSpacing:1,color:'#303133',fontWeight:'500', padding: 14}}>{moment(month, 'YYYYMM').format("MMMM YYYY")}</Text>
				<View>
					{
						dayStack.map((days, i) => {
							return (
								<DayRow days={days} dayProps={dayProps} key={i} onSelectDate={this.props.onSelectDate}/>
							)
						})
					}
				</View>
			</View>
		);
	}
}
