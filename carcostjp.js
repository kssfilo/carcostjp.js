function CarCostJp(specs)
{
	var defaults={
		price:1000000,   //取得価格円
		cylinderCc:660,  //排気量cc
		weightKg:800,    //車両重量kg（トラックの場合は総重量)
		fuelCostKmpl:15, //燃費km/l
		isEco:false,     //エコカーか
		isTrack:false,   //貨物か
		carryKg:1000,    //貨物の場合の積載量kg
		passedYears:0,   //経過年数
		gettingTax:-1    //取得税(-1の場合は新車として計算) 
	};
	for(var i in specs)defaults[i]=specs[i];
	specs=defaults;
	this.price=function(){return(specs.price)};
	this.cylinderCc=function(){return(specs.cylinderCc)};
	this.weightKg=function(){return(specs.weightKg)};
	this.fuelCostKmpl=function(){return(specs.fuelCostKmpl)};
	this.isEco=function(){return(specs.isEco)};
	this.isTrack=function(){return(specs.isTrack)};
	this.carryKg=function(){return(specs.carryKg)};
	this.passedYears=function(){return(specs.passedYears)};
	this.gettingTax=function(){
		if(specs.gettingTax==-1)
			return(Math.round(this.price()*0.9*(this.isK()?0.03:0.05)));
		else
			return(specs.gettingTax)
	}
}

CarCostJp.prototype=
{
	carTax:function()
	{
		var tbl=
		[
			29500,
			34500,
			39500,
			45000,
			41000,
			58000,
			66500,
			76500,
			88000,
			111000
		];
		var trackTbl=
		[
			8000,
			11500,
			16000,
			20500,
			25500,
			30000,
			35000,
			40500,
		];
		if(this.isK())return(this.isTrack()?4000:7200);
		else if(this.isTrack()){
			var t=Math.floor(this.carryKg()/1000);
			if(this.carryKg()<=8000)return(trackTbl[t]);
			return(this.carryKg()>20000?122400:40500+(t-7)*6300);
		}
		else
		{
			var i=Math.floor((this.cylinderCc()-500-1)/500);
			i=Math.min(9,i);
			return(tbl[i]);
		}
	},
	weightTax:function()
	{
		var tbl={
			eco:[5000,10000,15000,20000,25000,30000],
			generic:[8200,16400,24600,32800,41000,49200],
			over13:[10000,20000,30000,40000,50000,60000],
			over18:[12600,25200,37800,50400,63000,75600]
		}
		var kTbl={
			eco:5000,
			generic:6600,
			over13:7600,
			over18:8800
		}
		var trackTbl=
		{
			eco:[2500,5000,7500,7500,10000,12500,15000,17500,20000],
			generic:[3300,6600,9900,12300,16400,20500,24600,28700,32800],
			over13:[3800,7600,11400,15000,20000,25000,30000,35000,40000],
			over18:[4400,8800,13200,18900,25200,31500,37800,44100,50400]

		}
		var sign=this.passedYears()>=18?'over18':this.passedYears()>=13?'over13':this.isEco()?'eco':'generic';

		if(this.isK())return(kTbl[sign]/2);
		else if(this.isTrack()){
			var i=Math.floor(this.weightKg()/1000);
			if(this.weightKg()>=2500)i++;
			return(trackTbl[sign][i])
		}
		else
		{
			var i=Math.floor(this.weightKg()/500);
			i=Math.min(5,i);
			return(tbl[sign][i]/2);
		}
	},
	carInsurance:function(years)
	{
		var tbl=
		[
			{
				3:39120,
				2:27840
			},
			{
				3:36920,
				2:26370
			}
		]
		return(tbl[this.isK()?1:0][years]);
	},
	isK:function()
	{
		return(this.cylinderCc()==660);
	},
	initialFee:function()
	{
		var t=0;
		t+=this.price();
		t+=this.carInsurance(3);
		t+=this.isEco()?0:this.gettingTax();
		t+=this.isEco()?0:this.weightTax()*3;
		t+=this.carTax();
		
		return(t);
	},
	paidFee:function(year)
	{
		var r=this.initialFee();
		var y=year;
		if(y<1)return(r);
		r+=y*this.carTax();
		if(y<3)return(r);
		y-=3;
		y=Math.floor(y/2)+1;
		r+=y*(this.carInsurance(2)+this.weightTax()*2);
		if(y==1&&this.isEco())r-=this.weightTax();
		return(r);
	},
	value:function(year)
	{
		return(this.price()*Math.pow(0.8,year));
	},
	fuelFee:function(distanceKmpy,fuelPricePl)
	{
		return(Math.round(distanceKmpy/this.fuelCostKmpl()*fuelPricePl));
	},
	toString:function()
	{
		var out="";
		out+="Price="+this.price()+",";
		out+="Cylinder="+this.cylinderCc()+"cc,";
		out+="InitialFree="+this.initialFee()+",";
		out+="GettingTax="+this.gettingTax()+",";
		out+="Insurance/y="+(this.carInsurance(2)/2)+",";
		out+="WeightTax/y="+this.weightTax(1)+",";
		out+="CarTax/y="+this.carTax()+",";
		out+="BasicCost/y="+(this.carTax()+this.weightTax(1)+this.carInsurance(2)/2)+',';
		out+="\n";
		o=this;

		return(out);
	}
};

if(typeof module!='undefined'&&module.parent!=null)
	module.exports=CarCostJp;
