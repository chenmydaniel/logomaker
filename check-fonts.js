const fs = require('fs');
const path = require('path');

// 定义字体文件路径
const fontFiles = [
  'fonts/Great_Vibes/GreatVibes-Regular.ttf',
  'fonts/Roboto/static/Roboto-Regular.ttf',
  'fonts/Roboto/static/Roboto-Bold.ttf',
  'fonts/Montserrat/static/Montserrat-Regular.ttf',
  'fonts/Montserrat/static/Montserrat-Bold.ttf',
  'fonts/Raleway/static/Raleway-Regular.ttf',
  'fonts/Raleway/static/Raleway-Bold.ttf',
  'fonts/Dancing_Script/static/DancingScript-Regular.ttf',
  'fonts/Poppins/static/Poppins-Regular.ttf',
  'fonts/Oswald/static/Oswald-VariableFont_wght.ttf',
  'fonts/Lato/Lato-Regular.ttf',
  'fonts/Open_Sans/static/OpenSans-VariableFont_wdth,wght.ttf',
  'fonts/Parisienne/Parisienne-Regular.ttf'
];

console.log('正在检查字体文件...\n');

let allFontsExist = true;

fontFiles.forEach(fontPath => {
  const fullPath = path.join(__dirname, fontPath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    console.log(`✅ 找到: ${fontPath}`);
  } else {
    console.error(`❌ 未找到: ${fontPath}`);
    allFontsExist = false;
  }
});

if (allFontsExist) {
  console.log('\n✅ 所有字体文件都存在！');
} else {
  console.log('\n❌ 有些字体文件缺失，请检查以上路径。');
}
