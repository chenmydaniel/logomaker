<?php
// 设置错误报告
error_reporting(0);

// 设置内容类型为 CSS
header('Content-Type: text/css');

// 设置缓存控制头
$cache_time = 86400 * 7; // 7天缓存
header('Cache-Control: public, max-age=' . $cache_time);
header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $cache_time) . ' GMT');
header('Pragma: public');

// 检查文件是否存在
$css_file = 'style.css';
if (!file_exists($css_file) || !is_readable($css_file)) {
    header('HTTP/1.1 404 Not Found');
    header('Content-Type: text/plain');
    exit('/* 错误：找不到或无法读取 style.css 文件 */');
}

// 设置最后修改时间
$last_modified = filemtime($css_file);
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $last_modified) . ' GMT');

// 检查客户端缓存
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && 
    strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $last_modified) {
    header('HTTP/1.1 304 Not Modified');
    exit();
}

// 获取当前时间戳
$timestamp = time();

// 读取原始的 CSS 文件内容
$css = @file_get_contents($css_file);
if ($css === false) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: text/plain');
    exit('/* 错误：无法读取样式表内容 */');
}

// 为所有字体文件添加时间戳
$css = preg_replace_callback(
    '/url\(([\'\"]?)([^\'\"\)]+)\\1\)/i',
    function($matches) use ($timestamp) {
        $url = trim($matches[2]);
        // 只处理本地字体文件，不处理 data: 和 http(s):// 开头的 URL
        if (strpos($url, 'data:') === 0 || preg_match('#^https?://#i', $url)) {
            return $matches[0];
        }
        // 如果已经有查询参数，则替换时间戳，否则添加时间戳
        $separator = (strpos($url, '?') === false) ? '?' : '&';
        return 'url(' . $matches[1] . $url . $separator . 't=' . $timestamp . $matches[1] . ')';
    },
    $css
);

// 压缩 CSS（移除注释和多余的空格）
$css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
$css = str_replace(["\r\n", "\r", "\n", "\t", '  ', '    ', '    '], '', $css);

// 输出处理后的 CSS
echo $css;

// 记录日志（可选）
// error_log('Served CSS with font timestamps at ' . date('Y-m-d H:i:s'));
