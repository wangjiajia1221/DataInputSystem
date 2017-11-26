import Mock from 'mockjs';

let BASE_URL = '/api/v1';
let MockConf = {
	'/mock/get': {
		a: 'aha'
	},
	'/zhengcechuangzhi/get': {'data': [
    {
  		'province': '北京市',
      'docName': '《关于进下一步加快推进天津市青少年事务社会工作专业人才队伍建设的通知》',
      'docRef': '（津团发〔2016〕73号）'
  	},
    {
      'province': '北京市',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '津市场监管标准〔2016〕33号'
    },
    {
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '津市场监管标准〔2016〕33号'
    },
    {
      'province': '河北省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '内蒙古自治区',
      'docName': '关于印发《内蒙古自治区社会工作专业人才队伍建设“十三五”规划》的通知',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '辽宁省',
      'docName': '《关于进下一步加快推进天津市青少年事务社会工作专业人才队伍建设的通知》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '辽宁省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '辽宁省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '辽宁省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'province': '陕西省',
      'docName': '无',
      'docRef': ''
    },
    {
      'province': '黑龙江省',
      'docName': '《关于完善社会服务体系提升社会治理水平，实施社区、社会组织、社会工作“三社联动”的意见》',
      'docRef': '（黑办发〔2016〕24号）'
    }
  ]}
}

Object.keys(MockConf).forEach((url) => {
  let mockData = Mock.mock(MockConf[url]);
  Mock.mock(new RegExp(BASE_URL + url), () => {
  	console.warn('Mock:', url, mockData);
  	return mockData;
  });
});