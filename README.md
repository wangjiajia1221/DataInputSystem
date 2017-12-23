# DataInputSystem
接口文档：
1、表1接口：（政策创制）
1.1、获取表1数据（参数如需要分页增加offset和limit）
'/zhengcechuangzhi/get': 
{'data': [
    {
      'id': 1,
  		'province': '北京市',
      'docName': '《关于进下一步加快推进天津市青少年事务社会工作专业人才队伍建设的通知》',
      'docRef': '（津团发〔2016〕73号）',
      'creator': '发布单位',
      'creatTime': '2017-12-21 09:55:33'
  	}],
    'total': 99
 }
1.2、新增表1数据（参数为formdata）
'/zhengcechuangzhi/add': {
    'id': 33,
    'province': '北京市'
  }
1.3、修改表1数据（参数为formdata）
  '/zhengcechuangzhi/update': {}
1.4、删除表1数据(参数为id)
  '/zhengcechuangzhi/delete': {}
  
2、表2接口：（行政机构）
2.1、获取表2数据
  '/xingzhengjigou/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'type': 1，//1-4对应四个类别
      'level': '地市级',
      'orgNames': 'XX省民政厅社会工作处、XX省民政厅基层政权和社区建设处（社会工作处）'
    }],
    'total': 88
}
2.2 '/xingzhengjigou/add': {id: 33, 'province': '北京市'}
2.3 '/xingzhengjigou/update': {}
2.4 '/xingzhengjigou/delete': {}

3、表3接口：（岗位）
3.1、 '/gangwei/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'type': 1，//1-5对应5个类别
      'gangweiNum': 20,
      'fuwuzhanNum': 20,
      'otherNum': 20,
      'nojobNum': 20
    }],
    'total': 88
}
3.2 '/gangwei/add': {id: 33, 'province': '北京市'}
3.3 '/gangwei/update': {}
3.4 '/gangwei/delete': {}

4、表4接口：（人才资源）
4.1 '/rencaiziyuan/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'type': 1，//1-13对应13个类别
      'num': 20,
      'deadline': '2017-11-30'
    }],
    'total': 88
}
4.2 '/rencaiziyuan/add': {id: 33, 'province': '北京市'}
4.3 '/rencaiziyuan/update': {}
4.4 '/rencaiziyuan/delete': {}

5、表5接口：（人才培训）
5.1 '/rencaipeixun/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'num': 20,
      'increase': 10
    }],
    'total': 88
}
5.2 '/rencaipeixun/add': {id: 33, 'province': '北京市'}
5.3 '/rencaipeixun/update': {}
5.4 '/rencaipeixun/delete': {}

6、表6接口：（行业协会）
6.1 '/hangyexiehui/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'level': '在省级民政部门登记的',
      'xiehuiNum': 20,
      'orgNum': 10
    }],
    'total': 88
}
6.2 '/hangyexiehui/add': {id: 33, 'province': '北京市'}
6.3 '/hangyexiehui/update': {}
6.4 '/hangyexiehui/delete': {}

7、表7接口：（民办机构）
7.1 '/minbanjigou/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'level': '省级民政部门登记',
      'jigouNum': 20,
      'zhuanzhiNum': 10,
      'jicengNum': 10,
      'dangyuanNum': 10,
      'totalNum': 60 //前端不用填写，后端计算得出
    }],
    'total': 88
}
7.2 '/minbanjigou/add': {id: 33, 'province': '北京市'}
7.3 '/minbanjigou/update': {}
7.4 '/minbanjigou/delete': {}

8、表8接口：（资金投入）
8.1 '/zijintouru/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'type': 1，//1-4对应4个类别
      'touruNum': 22,
      'increase': 3
    }],
    'total': 88
}
8.2 '/zijintouru/add': {id: 33, 'province': '北京市'}
8.3 '/zijintouru/update': {}
8.4 '/zijintouru/delete': {}

9、表9接口：（社会试点）
9.1 '/shehuishidian/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'type': 1，//1-2对应2个类别
      'name': '社会工作试点示范',
      'description': '试点描述信息',
      'areaUnit': '开展的地区和单位名称'
    }],
    'total': 88
}
9.2 '/shehuishidian/add': {id: 33, 'province': '北京市'}
9.3 '/shehuishidian/update': {}
9.4 '/shehuishidian/delete': {}

10、表10接口：(志愿服务政策)
10.1 '/zyfwzhengce/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'docName': '《关于加快XXXX的意见》',
      'docRef': '（津团发〔2016〕73号）',
      'creator': '发布单位',
      'creatTime': '2017-12-21 09:55:33'
    }],
    'total': 88
}
10.2 '/zyfwzhengce/add': {id: 33, 'province': '北京市'}
10.3 '/zyfwzhengce/update': {}
10.4 '/zyfwzhengce/delete': {}

11、表11接口：(志愿服务组织)
11.1 '/zyfwzuzhi/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'level': '地市级',
      'areaName': 'xx市',
      'shtt': 3,
      'shfwjg': 4,
      'jjh': 5,
      'innerOrgNum': 4 //全省站点数通过前端计算得出
    }],
    'total': 88
}
11.2 '/zyfwzuzhi/add': {id: 33, 'province': '北京市'}
11.3 '/zyfwzuzhi/update': {}
11.4 '/zyfwzuzhi/delete': {}

12、表12接口：(志愿者注册)
12.1 '/zyzzhuce/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'total': 55,
      'percent': 1%,
      'sysNum': 4
    }],
    'total': 88
}
12.2 '/zyzzhuce/add': {id: 33, 'province': '北京市'}
12.3 '/zyzzhuce/update': {}
12.4 '/zyzzhuce/delete': {}

13、表13接口：(志愿者培训)
13.1 '/zyzpeixun/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'jbdw': '举办单位',
      'pxbmc': '培训班名称',
      'content': '培训内容' ,
      'peixunNum': 34 //培训总人数由前端计算得出
    }],
    'total': 88
}
13.2 '/zyzpeixun/add': {id: 33, 'province': '北京市'}
13.3 '/zyzpeixun/update': {}
13.4 '/zyzpeixun/delete': {}

14、表14接口：(记录工作)
14.1 '/jilugongzuo/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'areaName': '地区名称',
      'num1': 2,
      'num2': 55,
      'num3': 55,
      'num4': 55,
    }],
    'total': 88
}
14.2 '/jilugongzuo/add': {id: 33, 'province': '北京市'}
14.3 '/jilugongzuo/update': {}
14.4 '/jilugongzuo/delete': {}

15、表15接口：(活动开展)
15.1 '/huodongkaizhan/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'totalHours': 44,
      'oneYearHours': 22,
      'activities': '省级重点志愿服务活动名称及简介',
    }],
    'total': 88
}
15.2 '/huodongkaizhan/add': {id: 33, 'province': '北京市'}
15.3 '/huodongkaizhan/update': {}
15.4 '/huodongkaizhan/delete': {}

16、表16接口：(激励保障)
16.1 '/jilibaozhang/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'czzj': 44, //财政资金投入
      'fcj': 22, //福彩金投入
      'measure': '本地区激励保障志愿者的主要政策措施',
    }],
    'total': 88
}
16.2 '/jilibaozhang/add': {id: 33, 'province': '北京市'}
16.3 '/jilibaozhang/update': {}
16.4 '/jilibaozhang/delete': {}

17、表17接口：(资金投入)
17.1 '/zyfwzijin/get': {
    'data': [{
      'id': 1,
      'province': '北京',
      'level': '省级层面',
      'czzj': 22, //财政性资金
      'cpgyj': 22, //彩票公益金
      'qtzjComment': '其他资金陪住'
      'qtzj': 22, //其他资金
      'totalZj': 22, //年度总投入
      'yyglzj': 22, //政府购买志愿服务运营管理的资金
    }],
    'total': 88
}
17.2 '/zyfwzijin/add': {id: 33, 'province': '北京市'}
17.3 '/zyfwzijin/update': {}
17.4 '/zyfwzijin/delete': {}



