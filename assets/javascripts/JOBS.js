(function() {
	window.JOBS = [
		{
			id: 1,
			category: 'RDG(零售业务部)',
			positions: [
				{id: 101, nameEN: 'Store Manager', name: '专卖店店长', locationEN:'Shenyang', location:'上海'},
				{id: 102, nameEN: 'Store Manager', name: '专卖店店长', locationEN:'Wuxi', location:'无锡'},
				{id: 104, nameEN: 'Store Sales', name: '专卖店店员', locationEN:'Hangzhou', location:'杭州'},
				{id: 105, nameEN: 'Store Sales', name: '专卖店店员', locationEN:'Suzhou', location:'苏州'},
				{id: 106, nameEN: 'Store Sales', name: '专卖店店员', locationEN:'Wuxi', location:'无锡'},
				{id: 108, nameEN: 'Store Sales', name: '专卖店店员', locationEN:'Shanghai', location:'上海'},
				{id: 107, nameEN: 'Store Sales', name: '专卖店店员', locationEN:'Shenyang', location:'沈阳'},
				{id: 109, nameEN: 'Store Sales', name: '专卖店店员', locationEN:'Changchun', location:'长春'}
			]
		}, {
			id: 2,
			category: 'Function',
			positions: [
				{id: 200, nameEN: 'Sales Training Manager', name: '培训经理', locationEN: 'Shanghai', location:'上海'},
				{id: 201, nameEN: 'Assistant Repair Engineer', name: '助理维修工程师', locationEN: 'Shanghai', location:'上海'},
				{id: 202, nameEN: 'Online Business Supervisor', name: '电子商务主管', locationEN: 'Shanghai', location:'上海'}
			]
		}/*, {
			id: 3,
			category: 'PSD(专业系统部)',
			positions: [
				{id: 300, nameEN: 'Dealer Account Manager', name: '渠道客户经理（江苏、安徽区域）', locationEN: 'Shanghai', location:'上海'},
				{id: 301, nameEN: 'Dealer Account Manager', name: '渠道客户经理（浙江区域）', locationEN: 'Shanghai', location:'上海'},
				{id: 302, nameEN: 'Operation Assistant', name: '业务助理', locationEN: 'Shanghai', location:'上海'}
			]
		}*/
	];
	window.JOBSALL = [
		{
			id: 1,
			category: 'RDG(零售业务部)',
			positions: [
				//{id: 1001, nameEN: 'District Manager', name: '区域零售业务经理', locationEN: 'Shanghai', location:'上海'},
				//{id: 1002, nameEN: 'District Manager', name: '区域零售业务经理', locationEN: 'Guangzhou', location:'上海'},
				//{id: 1003, nameEN: 'District Manager', name: '区域零售业务经理', locationEN: 'Beijing', location:'上海'},
				{id: 1004, nameEN: 'Store Manager', name: '专卖店店长', locationEN: 'Shenyang', location:'沈阳'},
				{id: 1005, nameEN: 'Store Manager', name: '专卖店店长', locationEN: 'Wuxi', location:'无锡'},
				{id: 1007, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Shanghai', location:'上海'},
				{id: 1008, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Hangzhou', location:'杭州'},
				{id: 1009, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Suzhou', location:'苏州'},
				{id: 1010, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Wuxi', location:'无锡'},
				{id: 1012, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Changzhou', location:'常州'},
				{id: 1013, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Yangzhou', location:'扬州'},
				{id: 1014, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Xuzhou', location:'徐州'},
				{id: 1016, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Dongguan', location:'东莞'},
				{id: 1017, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Guangzhou', location:'广州'},
				{id: 1020, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Kunming', location:'昆明'},
				{id: 1025, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Shenyang', location:'沈阳'},
				{id: 1027, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Changchun', location:'长春'},
				{id: 1031, nameEN: 'Store Sales', name: '专卖店店员', locationEN: 'Qingdao', location:'青岛'}
			]
		}, {
			id: 2,
			category: 'Function',
			positions: [
				{id: 2001, nameEN: 'Sales Training Manager', name: '培训经理', locationEN: 'Shanghai', location:'上海'},
				{id: 2002, nameEN: 'Assistant Repair Engineer', name: '助理维修工程师', locationEN: 'Shanghai', location:'上海'},
				{id: 2003, nameEN: 'Online Business Supervisor', name: '电子商务主管', locationEN: 'Shanghai', location:'上海'},
				{id: 2004, nameEN: 'Sales Assistant', name: '销售助理', locationEN: 'Shanghai', location:'上海'},
				{id: 2005, nameEN: 'Customer Service Representative', name: '客户服务代表', locationEN: 'Shanghai', location:'上海'},
				{id: 2006, nameEN: 'Logistic Assistant', name: '物流助理', locationEN: 'Shanghai', location:'上海'}
			]
		}/*, {
			id: 3,
			category: 'PSD(专业系统部)',
			positions: [
				{id: 3001, nameEN: 'Dealer Account Manager', name: '渠道客户经理（北方地区）', locationEN: 'Shanghai', location:'上海'},
				{id: 3002, nameEN: 'Dealer Account Manager', name: '渠道客户经理（江苏、安徽区域）', locationEN: 'Shanghai', location:'上海'},
				{id: 3003, nameEN: 'Dealer Account Manager', name: '渠道客户经理（浙江区域）', locationEN: 'Shanghai', location:'上海'},
				{id: 3004, nameEN: 'Dealer Account Manager', name: '渠道客户经理（湖北、湖南、江西区域）', locationEN: 'Shanghai', location:'上海'},
				{id: 3005, nameEN: 'Dealer Account Manager', name: '渠道客户经理（西北区域）', locationEN: 'Shanghai', location:'上海'},
				{id: 3006, nameEN: 'Dealer Account Manager', name: '渠道客户经理（中南区域）', locationEN: 'Shanghai', location:'上海'},
				{id: 3007, nameEN: 'Senior Design Engineer', name: '高级系统设计工程师', locationEN: 'Shanghai', location:'上海'},
				{id: 3008, nameEN: 'Operation Assistant', name: '业务助理', locationEN: 'Shanghai', location:'上海'},
				{id: 3009, nameEN: 'Trainer', name: '专业产品培训师', locationEN: 'Shanghai', location:'上海'}
			]
		}*/
	];
	window.JOB_POSITIONS = {};
	_.each(JOBS, function(category) {
		_.each(category.positions, function(position) {
			JOB_POSITIONS[position.id] = position;
		});
	});
	_.each(JOBSALL, function(category) {
		_.each(category.positions, function(position) {
			JOB_POSITIONS[position.id] = position;
		});
	});
})();
