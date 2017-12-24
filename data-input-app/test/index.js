import Mock from 'mockjs';
import provinces from './provinces';

let BASE_URL = '/api/v1';
let MockConf = {
	'/mock/get': {
		a: 'aha'
	},
  '/provinces/get': provinces,
	'/zhengcechuangzhi/get': {
    'fileList': ['file1', 'file2', 'file3', 'file4'],
    'data': [
    {
      'id': 1,
  		'province': '北京市',
      'docName': '《关于进下一步加快推进天津市青少年事务社会工作专业人才队伍建设的通知》',
      'docRef': '（津团发〔2016〕73号）',
      'fileList': [{name: 'food.jpg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  	},
    {
      'id': 2,
      'province': '北京市',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '津市场监管标准〔2016〕33号'
    },
    {
      'id': 3,
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '津市场监管标准〔2016〕33号'
    },
    {
      'id': 4,
      'province': '河北省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 5,
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 6,
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 7,
      'province': '河北省',
      'docName': '《关于进一步发展民办社会工作服务机构的实施意见》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 8,
      'province': '内蒙古自治区',
      'docName': '关于印发《内蒙古自治区社会工作专业人才队伍建设“十三五”规划》的通知',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 9,
      'province': '辽宁省',
      'docName': '《关于进下一步加快推进天津市青少年事务社会工作专业人才队伍建设的通知》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 10,
      'province': '辽宁省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 11,
      'province': '辽宁省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 12,
      'province': '辽宁省',
      'docName': '《天津市养老服务机构社会工作服务规范》',
      'docRef': '（津团发〔2016〕73号）'
    },
    {
      'id': 13,
      'province': '陕西省',
      'docName': '无',
      'docRef': ''
    },
    {
      'id': 14,
      'province': '黑龙江省',
      'docName': '《关于完善社会服务体系提升社会治理水平，实施社区、社会组织、社会工作“三社联动”的意见》',
      'docRef': '（黑办发〔2016〕24号）'
    }
  ]},
  '/zhengcechuangzhi/add': {
    id: 33
  },
  '/zhengcechuangzhi/update': {},
  '/zhengcechuangzhi/delete': {},
  '/xingzhengjigou/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'type': 1,
      'level': 2
    },
    {
      'id': 2,
      'province': '天津',
      'type': '2',
      'level': 1,

    },
    {
      'id': 3,
      'province': '河北省',
      'level': '地市级',
      'independent': '保定',
      'relate': '石家庄、承德、张家口、秦皇岛、唐山、沧州、廊坊、衡水、邢台、邯郸'
    },
    {
      'id': 4,
      'province': '河北省',
      'level': '县级',
      'independent': '无',
      'relate': '无'
    },
    {
      'id': 5,
      'province': '山西省',
      'level': '地市级',
      'independent': '吕梁市',
      'relate': '太原市、大同市、长治市、阳泉市'
    },{
      'id': 6,
      'province': '山西省',
      'level': '县级级',
      'independent': '无',
      'relate': '无'
    },{
      'id': 7,
      'province': '内蒙古自治区',
      'level': '地市级',
      'independent': '呼和浩特市、包头市、鄂尔多斯市',
      'relate': '锡林郭勒盟'
    },{
      'id': 8,
      'province': '内蒙古自治区',
      'level': '县级',
      'independent': '鄂尔多斯市东胜区、康巴什区、伊金霍洛旗、达拉特旗、杭锦旗、鄂托克前旗；包头市昆区、青山区、土右旗',
      'relate': '包头市东河区、达茂旗、高新区、石拐区、白云区；鄂尔多斯市乌审旗、鄂旗'
    }]
  },
  '/xingzhengjigou/add': {id: 33},
  '/xingzhengjigou/update': {},
  '/xingzhengjigou/delete': {},
  '/hangyexiehui/add': {id: 33},
  '/gangwei/add': {id: 33},
  '/minbanjigou/add': {id: 33},
  '/zijintouru/add': {id: 33},
  '/rencaiziyuan/add': {id: 33},
  '/rencaipeixun/add': {id: 33},
  '/shehuishidian/add': {id: 33},
  '/zyfwzhengce/add': {id: 33},
  '/zyfwzuzhi/add': {id: 33},
  '/zyzzhuce/add': {id: 33},
  '/zyzpeixun/add': {id: 33},
  '/jilugongzuo/add': {id: 33},
  '/huodongkaizhan/add': {id: 33},
  '/jilibaozhang/add': {id: 33},
  '/zyfwzijin/add': {id: 33}
}

Object.keys(MockConf).forEach((url) => {
  let mockData = Mock.mock(MockConf[url]);
  Mock.mock(new RegExp(BASE_URL + url), () => {
  	console.warn('Mock:', url, mockData);
  	return mockData;
  });
});
