(function() {
	window.JOBS = [
		{
			id: 1,
			category: 'RDG(零售业务部)',
			positions: [
				{id: 100, nameEN: 'District Manager', name: '区域零售业务经理', location:'Shanghai'},
				{id: 101, nameEN: 'Store Manager', name: '专卖店店长', location:'Shenyang'},
				{id: 102, nameEN: 'Store Manager', name: '专卖店店长', location:'Wuxi'},
				{id: 103, nameEN: 'Store Manager', name: '专卖店店长', location:'Shanghai'},
				{id: 104, nameEN: 'Store Sales', name: '专卖店店员', location:'Hangzhou'},
				{id: 105, nameEN: 'Store Sales', name: '专卖店店员', location:'Suzhou'},
				{id: 106, nameEN: 'Store Sales', name: '专卖店店员', location:'Wuxi'},
				{id: 107, nameEN: 'Store Sales', name: '专卖店店员', location:'Shenyang'},
				{id: 108, nameEN: 'Store Sales', name: '专卖店店员', location:'Tianjin'},
				{id: 109, nameEN: 'Store Sales', name: '专卖店店员', location:'Changchun'}
			]
		}, {
			id: 2,
			category: 'Function',
			positions: [
				{id: 200, nameEN: 'Sales Training Manager', name: '培训经理', location: 'Shanghai'},
				{id: 201, nameEN: 'Logistic Assistant', name: '物流助理', location: 'Shanghai'}
			]
		}, {
			id: 3,
			category: 'PSD(专业系统部)',
			positions: [
				{id: 300, nameEN: 'Dealer Account Manager', name: '渠道客户经理（江苏、安徽区域）', location: 'Shanghai'},
				{id: 301, nameEN: 'Dealer Account Manager', name: '渠道客户经理（浙江区域）', location: 'Shanghai'},
				{id: 302, nameEN: 'Operation Assistant', name: '业务助理', location: 'Shanghai'}
			]
		}
	];
	window.JOB_POSITIONS = {};
	_.each(JOBS, function(category) {
		_.each(category.positions, function(position) {
			JOB_POSITIONS[position.id] = position;
		});
	});
})();
