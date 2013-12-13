##概要 

_このモジュールは開発中です。定数や計算方法はテスト用です。_

日本の自動車の維持費(税金/燃料/減価償却費)を計算するヘルパモジュールです。
2013年のデータに基づいています。
特別減税等には対応していません。あくまで概算計算です。

##導入

node.js/ブラウザ両方に対応します。

##使い方

```html
	<script src='carcostjp.js'></script>
	<script>
		var carcost=new CarCostJp({
			price:1000000,   //取得価格円
			cylinderCc:660,  //排気量cc
			weightKg:800,    //車両重量kg（トラックの場合は総重量)
			fuelCostKmpl:15, //燃費km/l
			isEco:false,     //エコカーか
			isTrack:false,   //貨物か
			carryKg:1000,    //貨物の場合の積載量kg
			passedYears:0,    //経過年数
			gettingTax:-1    //取得税(-1の場合は新車として計算) 
		});
		console.log(carcost.gettingTax());       //取得税
		console.log(carcost.weightTax());        //重量税年
		console.log(carcost.carInsurance(2));    //自賠責保険(2年または3年)
		console.log(carcost.value(3));           //三年後の残存価値(年率0.8消却)
		console.log(carcost.fuelFee(20000,150)); //20000km走って燃料が150円/lの場合の燃料費
		console.log(carcost.initialFee());       //初期費用概算
	</script>
```

```node.js
	var CarCostJp=require('carcostjp.js');
	var carcost=new CarCostJp({
			price:1000000,   //取得価格円
			cylinderCc:660,  //排気量cc
	.
	.
```

##サンプルページ

[ハイブリッドのエコカーに買い替えるのは本当に得？ 自動車コスト計算機](http://kanasys.com/tech/98)

##履歴

13/12/13:取得税の計算方法の誤りを修正。中古の場合、コンストラクタで設定出来る様にしました。
