const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

const App = () => {
  const [name, setName] = useState('Logo Text');
  const [nameColor, setNameColor] = useState('#000000');
  const [nameScale, setNameScale] = useState(100);
  const [slogan, setSlogan] = useState('');
  const [sloganColor, setSloganColor] = useState('#000000');
  const [sloganScale, setSloganScale] = useState(100);
  const [font, setFont] = useState('Great Vibes');
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const fonts = [
    'Great Vibes', 'Roboto', 'Montserrat', 'Dancing Script', 'Raleway',
    'Poppins', 'Oswald', 'Lato', 'Open Sans', 'Abril Fatface',
    'Amatic SC', 'Arvo', 'Bangers', 'Bebas Neue', 'Cinzel',
    'Dosis', 'Fjalla One', 'Indie Flower', 'Josefin Sans', 'Kaushan Script',
    'Lobster', 'Merriweather', 'Pacifico', 'Playfair Display', 'Poiret One',
    'Quicksand', 'Shadows Into Light', 'Special Elite', 'Tangerine', 'Ubuntu',
    'Vollkorn', 'Aladin', 'Barriecito', 'Eater'
  ].sort();
  
  // 组件挂载后执行
  useEffect(() => {
    // 隐藏加载指示器
    const loadingElement = document.getElementById('loading');
    
    // 直接设置字体已加载，不等待字体加载完成
    setFontLoaded(true);
    
    // 短暂延迟后隐藏加载指示器，确保UI已经更新
    setTimeout(() => {
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    }, 100);
  }, []);

  // ========== SVG 矢量图尺寸设置 ==========
  const generateSVG = () => {
    const width = 600;  // SVG 宽度（像素）
    const height = 300; // SVG 高度（像素）
    const draw = SVG().size(width, height);
    
    // 添加样式定义，包含 @font-face 规则
    const style = `
      @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      text { font-family: 'Great Vibes', cursive; }
    `;
    
    // 添加样式到 SVG
    draw.defs().element('style').words(style);
    
    // 添加白色背景
    draw.rect(width, height).fill('#FFFFFF');
    
    // 计算中心点
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 绘制品牌名称
    const nameFontSize = 50 * (nameScale / 100);
    // 移除字体名称中的引号，因为 SVG.js 会自动处理
    const fontFamily = font.replace(/['"]/g, '');
    const nameText = draw.text(name || 'Logo Text')
      .font({
        family: fontFamily,
        size: nameFontSize,
        anchor: 'middle',
        weight: 'bold',
        style: 'normal'
      })
      .fill(nameColor);
    
    // 名称垂直居中，稍微上移
    nameText.center(centerX, centerY - nameFontSize * 0.3);

    // 绘制标语（如果有）
    if (slogan) {
      const sloganFontSize = 30 * (sloganScale / 100);
      const sloganText = draw.text(slogan)
        .font({
          family: fontFamily,
          size: sloganFontSize,
          anchor: 'middle',
          weight: 'bold',
          style: 'normal'
        })
        .fill(sloganColor);
      
      // 标语在名称下方，应用拖动偏移
      sloganText.center(centerX + dragX, centerY + sloganFontSize * 1.2);
    }
    
    return draw.svg();
  };

  const dataURLtoArrayBuffer = (dataURL) => {
    const base64 = dataURL.split(',')[1];
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const downloadFile = (format) => {
    if (format === 'svg') {
      const svgData = generateSVG();
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name || 'logo'}-logo.svg`;
      link.click();
      // 清理URL对象
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else if (format === 'ico') {
      // ========== ICO 图标尺寸设置 ==========
      const canvas = document.createElement('canvas');
      const size = 32; // ICO 图标尺寸（像素）
      canvas.width = size;
      canvas.height = size; // ICO 通常使用 32x32 或 64x64
      const ctx = canvas.getContext('2d');

      // Transparent background for ICO
      ctx.clearRect(0, 0, size, size);

      // Draw logo name (simple version for ICO)
      // Only use the first character of the name (or 'L' if empty)
      const firstChar = (name && name.trim().length > 0) ? name.trim().charAt(0).toUpperCase() : 'L';
      
      // 设置初始字体大小
      let fontSize = size * 0.9; // 从90%开始尝试
      let textWidth;
      
      // 调整字体大小直到字符宽度适合图标
      do {
        ctx.font = `bold ${fontSize}px ${font}`;
        textWidth = ctx.measureText(firstChar).width;
        if (textWidth < size * 0.8) {
          break;
        }
        fontSize -= 1;
      } while (fontSize > 8); // 最小字体大小为8px
      
      // 计算垂直位置，确保字符不会超出边界
      const yPos = size * 0.6; // 稍微下移一点，因为字母的上部通常有空白
      
      ctx.fillStyle = nameColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // 绘制字符
      ctx.fillText(firstChar, size / 2, yPos);

      canvas.toBlob((blob) => {
        if (!blob) {
            console.error('Failed to create blob for ICO');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const pngData = new Uint8Array(reader.result);

            // Create ICO structure
            // ICO Header (6 bytes)
            //   2 bytes: Reserved (must be 0)
            //   2 bytes: Image type (1 for ICO, 2 for CUR)
            //   2 bytes: Number of images in ICO (1 in this case)
            const icoHeader = new Uint8Array(6);
            icoHeader[2] = 1; // Type ICO
            icoHeader[4] = 1; // One image

            // Image Directory Entry (16 bytes)
            //   1 byte: Width (32px)
            //   1 byte: Height (32px)
            //   1 byte: Number of colors in palette (0 for true color)
            //   1 byte: Reserved (should be 0)
            //   2 bytes: Color planes (0 or 1)
            //   2 bytes: Bits per pixel (e.g., 32 for RGBA)
            //   4 bytes: Size of the DIB data in bytes
            //   4 bytes: Offset of DIB data from the beginning of the ICO/CUR file
            const imgDirEntry = new Uint8Array(16);
            imgDirEntry[0] = size; // Width
            imgDirEntry[1] = size; // Height
            imgDirEntry[2] = 0;    // Color Palette (0 for true color)
            imgDirEntry[3] = 0;    // Reserved
            imgDirEntry[4] = 1;    // Color Planes (usually 1)
            imgDirEntry[6] = 32;   // Bits per pixel (32 for RGBA PNG)
            const pngSize = pngData.length;
            imgDirEntry[8] = pngSize & 0xFF;
            imgDirEntry[9] = (pngSize >> 8) & 0xFF;
            imgDirEntry[10] = (pngSize >> 16) & 0xFF;
            imgDirEntry[11] = (pngSize >> 24) & 0xFF;
            const offset = 6 + 16; // Header size + Directory entry size
            imgDirEntry[12] = offset & 0xFF;
            imgDirEntry[13] = (offset >> 8) & 0xFF;
            imgDirEntry[14] = (offset >> 16) & 0xFF;
            imgDirEntry[15] = (offset >> 24) & 0xFF;

            const icoBlob = new Blob([icoHeader, imgDirEntry, pngData], { type: 'image/x-icon' });
            const url = URL.createObjectURL(icoBlob);
            const link = document.createElement('a');
            link.href = url;
            // 固定文件名为 favicon.ico
            link.download = 'favicon.ico';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 100);
        };
        reader.readAsArrayBuffer(blob);
      }, 'image/png');
    } else { // This is for PNG download
      // ========== PNG 图片尺寸设置 ==========
      const canvas = document.createElement('canvas');
      canvas.width = 600;  // PNG 宽度（像素）
      canvas.height = 300; // PNG 高度（像素）
      const ctx = canvas.getContext('2d');
      
      // 设置背景为白色
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 计算居中位置
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // 绘制品牌名称
      const nameFontSize = 50 * (nameScale / 100);
      ctx.font = `bold ${nameFontSize}px "${font}"`;
      ctx.fillStyle = nameColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // 名称垂直居中，稍微上移
      ctx.fillText(name || 'Logo Text', centerX, centerY - nameFontSize * 0.3);

      // 绘制标语（如果有）
      if (slogan) {
        const sloganFontSize = 30 * (sloganScale / 100);
        ctx.font = `bold ${sloganFontSize}px "${font}"`;
        ctx.fillStyle = sloganColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // 标语在名称下方，应用拖动偏移
        ctx.fillText(slogan, centerX + dragX, centerY + sloganFontSize * 1.2);
      }
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name || 'logo'}-logo.png`;
        link.click();
        // 清理URL对象
        setTimeout(() => URL.revokeObjectURL(url), 100);
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2; // 调整为居中
      setDragX(Math.max(-250, Math.min(250, x)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // 触摸事件处理
  const handleTouchStart = (e) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches && e.touches[0]) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left - rect.width/2;
      setDragX(Math.max(-250, Math.min(250, x)));
      e.preventDefault(); // 防止页面滚动
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-4 pb-4">
        <div className="flex items-center">
        <h1 
          style={{ 
            fontFamily: "'Indie Flower', cursive", 
            fontSize: '2.5rem',
            color: '#2e33cb', // 紫色
            textShadow: '1px 1px 2px rgba(19, 62, 219, 0.1)',
            letterSpacing: '1px'
          }} 
          className="text-gray-700"
        >
          Winwin Logo Maker
        </h1>
        </div>
        <div className="space-x-2">
          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition duration-200">Create with AI</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition duration-200">Create yourself</button>
        </div>
        <div className="relative">
          <span 
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setShowTip(!showTip)}
          >
            💡
          </span>
          {showTip && (
            <div className="absolute right-0 mt-2 w-64 p-2 bg-white border border-gray-300 rounded-lg shadow-lg text-xs text-gray-600 z-10">
              This tool uses Google Fonts under SIL Open Font License (OFL) or Apache License 2.0, copyright to original authors. See OFL and Apache License 2.0. Users are responsible for their input and generated logos. This tool is not liable for trademark, copyright, or legal issues. Check conflicts at USPTO/WIPO.
            </div>
          )}
        </div>
      </header>
      <div className="flex space-x-6 main-container pt-2">
        <div className="w-1/2 control-panel">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="flex items-center mt-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Type name"
              />
              <button
                className="color-picker ml-1"
                style={{ backgroundColor: nameColor }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'color';
                  input.value = nameColor;
                  input.onchange = (e) => setNameColor(e.target.value);
                  input.click();
                }}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Size: {nameScale}%</label>
              <input
                type="range"
                min="50"
                max="200"
                value={nameScale}
                onChange={(e) => setNameScale(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Slogan</label>
            <div className="flex items-center mt-1">
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Type slogan"
              />
              <button
                className="color-picker ml-1"
                style={{ backgroundColor: sloganColor }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'color';
                  input.value = sloganColor;
                  input.onchange = (e) => setSloganColor(e.target.value);
                  input.click();
                }}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Size: {sloganScale}%</label>
              <input
                type="range"
                min="50"
                max="200"
                value={sloganScale}
                onChange={(e) => setSloganScale(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Tip: You can drag slogan horizontally to adjust the position</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Font family</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              {fonts.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Font recommendations</label>
            <div className="font-preview-grid">
              {fonts.map((f) => (
                <div
                  key={f}
                  className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200 cursor-pointer text-center"
                  onClick={() => setFont(f)}
                >
                  <span className="font-preview-text" style={{ fontFamily: f, color: '#000000' }}>{name || 'Logo Text'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center preview-container">
          {!fontLoaded && <div className="text-gray-500 mb-2">正在加载字体...</div>}
          <div
            className="preview-area mb-8"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ width: '100%', height: '300px', position: 'relative', cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <span style={{ fontFamily: font, fontSize: `${50 * (nameScale / 100)}px`, color: nameColor, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', whiteSpace: 'nowrap', userSelect: 'none' }}>{name}</span>
            <span
              style={{
                fontFamily: font,
                fontSize: `${30 * (sloganScale / 100)}px`, // 增大slogan字体
                color: sloganColor,
                position: 'absolute',
                top: '50%', // 调整slogan的垂直位置，使其在name下方并有间距
                left: `calc(50% + ${dragX}px)`,
                transform: 'translate(-50%, 60%)', // 调整Y轴偏移以在name下方
                whiteSpace: 'nowrap', // 防止slogan换行
                userSelect: 'none' // 防止拖动时选中文本
              }}
            >
              {slogan}
            </span>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
              onClick={() => downloadFile('svg')}
            >
              Download SVG
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
              onClick={() => downloadFile('png')}
            >
            Download PNG
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
              onClick={() => downloadFile('ico')}
            >
            Download ICO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);