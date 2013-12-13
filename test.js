#!/usr/bin/env node

var CarCostJp=require('./carcostjp.js');
var cars=[
	{
			price:1000000,   //取得価格円
			cylinderCc:660,  //排気量cc
			weightKg:800,    //車両重量kg（トラックの場合は総重量)
			fuelCostKmpl:15, //燃費km/l
			isEco:false,     //エコカーか
			isTrack:true,    //貨物か
			carryKg:350,     //貨物の場合の積載量kg
			passedYears:0    //経過年数
	},
	{
			price:2000000,   //取得価格円
			cylinderCc:1500, //排気量cc
			weightKg:900,    //車両重量kg（トラックの場合は総重量)
			fuelCostKmpl:30, //燃費km/l
			isEco:true,      //エコカーか
			isTrack:false,   //貨物か
			carryKg:1000,    //貨物の場合の積載量kg
			passedYears:0    //経過年数
	},
	{
			price:2000000,   //取得価格円
			cylinderCc:1500, //排気量cc
			weightKg:900,    //車両重量kg（トラックの場合は総重量)
			fuelCostKmpl:30, //燃費km/l
			isEco:true,      //エコカーか
			isTrack:false,   //貨物か
			carryKg:1000,    //貨物の場合の積載量kg
			passedYears:0,   //経過年数
			gettingTax:52000 //取得税
	}
	];

for(var i=0;i<cars.length;i++){
	console.log(new CarCostJp(cars[i]).toString());
}


