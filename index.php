<?php
// 获取当前时间戳
$timestamp = time();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Winwin Logo Maker</title>
  <script type="text/javascript">
        var gk_isXlsx = false;
        var gk_xlsxFileLookup = {};
        var gk_fileData = {};
        function filledCell(cell) {
          return cell !== '' && cell != null;
        }
        function loadFileData(filename) {
        if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
            try {
                var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                var firstSheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[firstSheetName];

                // Convert sheet to JSON to filter blank rows
                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                // Filter out blank rows (rows where all cells are empty, null, or undefined)
                var filteredData = jsonData.filter(row => row.some(filledCell));

                // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
                var headerRowIndex = filteredData.findIndex((row, index) =>
                  row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                );
                // Fallback
                if (headerRowIndex === -1 || headerRowIndex > 25) {
                  headerRowIndex = 0;
                }

                // Convert filtered JSON back to CSV
                var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
                csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                return csv;
            } catch (e) {
                console.error(e);
                return "";
            }
        }
        return gk_fileData[filename] || "";
        }
        </script>
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico">
  <meta name="theme-color" content="#7c3aed">
  
  <!-- 预加载 favicon 以提高加载性能 -->
  <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon">
  
  <!-- 预加载关键字体 -->
  <link rel="preload" href="./fonts/Roboto/static/Roboto-Regular.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="preload" href="./fonts/Open_Sans/static/OpenSans-Regular.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="preload" href="./fonts/Great_Vibes/GreatVibes-Regular.ttf" as="font" type="font/ttf" crossorigin>
  
  <!-- 使用 assets.php 动态加载 CSS 并添加时间戳 -->
  <link rel="stylesheet" href="assets.php">
  
  <!-- 使用 React 18 的 UMD 版本 -->
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.22.5/babel.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.1.2/dist/svg.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <!-- 使用 assets.php 动态加载 CSS 并添加时间戳 -->
  <link rel="stylesheet" href="assets.php">
  
  <style>
    /* 默认字体栈 */
    body {
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <style>
    #loading {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #7c3aed;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <div id="loading">
    <div class="spinner"></div>
  </div>
  
  <!-- 添加时间戳到 script.js -->
  <script type="text/babel" src="script.js?t=<?php echo $timestamp; ?>"></script>
  
  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 py-4">
    <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
      <p>© <?php echo date('Y'); ?> Winwin Logo Maker. All rights reserved.</p>
      <p class="mt-1 text-xs text-gray-400">
        Created by 
        <a href="https://winwin.com" target="_blank" class="text-blue-500 hover:underline">Winwin Team</a> 
        | Version 1.0.0
      </p>
    </div>
  </footer>
</body>
</html>
