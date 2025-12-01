// data.js (精修版)

// ★ 新增：分类数据
// 在这里定义所有分类的ID和标题。顺序也会影响页面上的显示顺序。
export const CATEGORIES = [
    { id: 'category-tech', title: '科技文献' },
    { id: 'category-ai', title: 'AI' },
    { id: 'category-data', title: '资料' },
    { id: 'category-repo', title: '网站基石' }, // <- 修改了标题
    { id: 'category-study', title: '日常学习' },
];

// 图标库 (键值对形式，可以混合SVG代码和图片路径)
export const ICONS = {
    // --- SVG Icons ---
    'link': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"></path></svg>',
    'signal': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
    'chat': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>',
    'computer': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    'star': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>',
    'chip': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path><path d="M4 9h16M4 12h16M4 15h16"></path></svg>',
    'lightbulb': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 21v-1m-6.657-3.343l.707-.707m12.728 0l.707.707M12 6a3 3 0 110-6 3 3 0 010 6z"></path><path d="M12 18a6 6 0 00-6-6H6a6 6 0 006 6v0z"></path></svg>',
    'book': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
    'globe': '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9a3 3 0 013-3h2.6a3 3 0 013 3v4a3 3 0 01-3 3H10.7a3 3 0 01-3-3V9zM12 21a9 9 0 100-18 9 9 0 000 18z"></path></svg>',
    
    // --- PNG Icons ---
    'github': 'icons/github.png',
    'cloudflare': 'icons/cloudflare.png',
};

export const DEFAULT_ICON_NAME = 'link'; // 默认图标

// 初始链接数据
export const initialLinks = [
    { id: 'preset-1', title: 'IEEE Signal Processing Magazine', url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=79', desc: '信号处理领域的顶级期刊，提供深入的教程、评论和行业动态，是学习信号处理最新进展的绝佳资源。', categoryId: 'category-tech', iconName: 'signal' },
    { id: 'preset-2', title: 'IEEE Communications Surveys & Tutorials', url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=9739', desc: '通信领域的高影响力综述期刊，提供对各项通信技术全面且深入的概述，是掌握学科体系的最佳选择。', categoryId: 'category-tech', iconName: 'chat' },
    
    // ... 其他链接可以放在这里 ...

    // ★ 修正：将 GitHub 和 Cloudflare 都放在 'category-repo' 分类下
    { id: 'preset-9', title: 'GitHub (网站仓库)', url: 'https://github.com/Lv-Mansion/221027', desc: '本项目（导航网站）的源代码存放处，您可以访问此链接查看代码或fork。', categoryId: 'category-repo', iconName: 'github' },
    { id: 'preset-10', title: 'Cloudflare (DNS & CDN)', url: 'https://www.cloudflare.com/', desc: '全球领先的CDN与安全服务商, 本站使用其服务进行DNS解析与全球加速。', categoryId: 'category-repo', iconName: 'cloudflare' } 
];
