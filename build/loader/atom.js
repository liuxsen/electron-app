/**
 * 基础原子类定义
 *
 * 原子类定义如下：
 *
 * margin：m、ml、mr、mt、mb、mx、my
 * padding：p、pl、pr、pt、pb、px、py
 * width：w、w-p
 * height：h、h-p
 * 四方向：l、r、t、b；（h5 端简写由于跟 margin 冲突，添加第二个字母 o：mol、mor、mot、mob）
 * 行高：lh
 * 字体：fs、fw
 * border-radius：br
 *
 * 「通用原子类」，在 /assets/style/atom.style 中单独支持
 *
 */
const _ = require('lodash');

const oDesktopClassNameMap = {
  // margin
  '.m': 'margin:$px;',
  '.ml': 'margin-left:$px;',
  '.mr': 'margin-right:$px;',
  '.mt': 'margin-top:$px;',
  '.mb': 'margin-bottom:$px;',
  '.mlr': 'margin-left:$px;margin-right:$px',
  '.mx': 'margin-left:$px;margin-right:$px;',
  '.my': 'margin-top:$px;margin-bottom:$px;',
  // margin !important
  '.mi': 'margin:$px !important;',
  '.mli': 'margin-left:$px !important;',
  '.mri': 'margin-right:$px !important;',
  '.mti': 'margin-top:$px !important;',
  '.mbi': 'margin-bottom:$px !important;',
  '.mxi': 'margin-left:$px !important;margin-right:$px !important;',
  '.myi': 'margin-top:$px !important;margin-bottom:$px !important;',
  // padding
  '.p': 'padding:$px;',
  '.pl': 'padding-left:$px;',
  '.pr': 'padding-right:$px;',
  '.pt': 'padding-top:$px;',
  '.pb': 'padding-bottom:$px;',
  '.px': 'padding-left:$px;padding-right:$px;',
  '.py': 'padding-top:$px;padding-bottom:$px;',
  // padding !important
  '.pi': 'padding:$px !important;',
  '.pli': 'padding-left:$px !important;',
  '.pri': 'padding-right:$px !important;',
  '.pti': 'padding-top:$px !important;',
  '.pbi': 'padding-bottom:$px !important;',
  '.pxi': 'padding-left:$px !important;padding-right:$px !important;',
  '.pyi': 'padding-top:$px !important;padding-bottom:$px !important;',
  // width
  '.w': 'width:$px;',
  '.wp': 'width:$%;',
  // height
  '.h': 'height:$px;',
  '.hp': 'height:$%;',
  // 四方向
  '.l': 'left:$px;',
  '.r': 'right:$px;',
  '.t': 'top:$px;',
  '.b': 'bottom:$px;',
  // 行高
  '.lh': 'line-height:$px;',
  // 字体
  '.fs': 'font-size:$px;',
  '.fw': 'font-weight:$;',
  // border-radius
  '.br': 'border-radius:$px',
  '.bgs': 'background-size:$px'
};

module.exports = function (sSource) {
  // 从 vue 文件中提取 pug 代码
  let sPugString;
  try {
    sPugString = sSource.match(/<template lang="pug">([\s\S]*)<\/template>/g)[0];
  } catch (e) {
    return sSource;
  }

  // 没有找到 template 模板，则无需处理
  if (!sPugString) return sSource;

  // 获取 pc 端原子类类名数组，并剔除重复的类名
  let aDesktopClassName = _.uniq(
    sPugString.match(
      /\.(m|ml|mr|mt|mb|mx|my)-[0-9]+|\.(mi|mli|mri|mti|mbi|mxi|myi)-[0-9]+|\.(p|pl|pr|pt|pb|px|py)-[0-9]+|\.(pi|pli|pri|pti|pbi|pxi|pyi)-[0-9]+|\.(w|wp)-[0-9]+|\.(h|hp)-[0-9]+|\.(l|r|t|b)-[0-9]+|\.lh-[0-9]+|\.(fs|fw)-[0-9]+|\.br-[0-9]+|\.(bgs)-[0-9]+/g
    )
  );

  // 输出 debug 数据
  this.query.debug && console.log('\n文件：', this.resourcePath, this.query);
  this.query.debug && console.log('desktop 类名：', aDesktopClassName);

  // 原子类样式接收数组
  let aDesktopStyle = [];

  // 开始生成 desktop 原子类
  aDesktopClassName.forEach(item => {
    let sKey = item.match(/\.\w+/)[0];
    let nValue = Number(item.match(/\d+/)[0]);

    let sStyle = oDesktopClassNameMap[sKey].replace(/\$/g, nValue);

    aDesktopStyle.push(`${item}{${sStyle}}`);
  });

  // 输出 debug 数据
  this.query.debug && console.log('desktop 样式：', aDesktopStyle);

  return `${sSource}\n<style>\n${aDesktopStyle.join('')}</style>\n`;
};