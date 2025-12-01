// app.js (最终版)

import { initialLinks, ICONS, CATEGORIES, DEFAULT_ICON_NAME } from './data.js';

// --- 自动数据更新逻辑 ---
const generateDataHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash.toString();
};
const newDataHash = generateDataHash(JSON.stringify(initialLinks));

// --- 全局DOM元素 ---
const modal = document.getElementById('add-link-modal');
const modalTitle = document.getElementById('modal-title');
const submitBtn = document.getElementById('submit-btn');
const showModalBtn = document.getElementById('show-modal-btn');
const cancelBtn = document.getElementById('cancel-btn');
const addLinkForm = document.getElementById('add-link-form');
const iconSelectorGrid = document.getElementById('icon-selector-grid');
const categoriesContainer = document.getElementById('categories-container');
const categorySelect = document.getElementById('link-category');
let currentEditId = null;

// --- 数据存储函数 ---
const getLinks = () => {
    const savedDataHash = localStorage.getItem('commEngPortalDataHash');
    const linksJson = localStorage.getItem('commEngPortalLinks');
    if (savedDataHash !== newDataHash || !linksJson) {
        saveLinks(initialLinks);
        return initialLinks;
    }
    return JSON.parse(linksJson);
};
const saveLinks = (links) => {
    localStorage.setItem('commEngPortalLinks', JSON.stringify(links));
    localStorage.setItem('commEngPortalDataHash', newDataHash);
};

// --- 核心渲染函数 ---
const escapeHTML = (str) => str ? str.replace(/[&<>"']/g, m => ({'&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#39;'}[m])) : '';

const getIconHTML = (iconIdentifier, altText, className) => {
    if (iconIdentifier.trim().startsWith('<svg')) {
        return iconIdentifier.replace('class="w-8 h-8"', `class="${className}"`);
    }
    return `<img src="${escapeHTML(iconIdentifier)}" alt="${escapeHTML(altText)} icon" class="${className} object-contain">`;
};

const renderCard = (linkData) => {
    const { id, title, url, desc, categoryId, iconName } = linkData;
    const categoryElement = document.getElementById(categoryId)?.querySelector('.card-grid');
    if (!categoryElement) return;
    
    document.querySelector(`[data-id="${id}"]`)?.remove();

    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'card-link-wrapper bg-gray-800 rounded-xl shadow-lg border border-gray-700';
    cardWrapper.dataset.id = id;

    const iconIdentifier = ICONS[iconName] || ICONS[DEFAULT_ICON_NAME];
    const iconHTML = getIconHTML(iconIdentifier, title, 'w-8 h-8');

    cardWrapper.innerHTML = `
        <a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" class="block p-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <div class="flex items-center justify-center h-14 w-14 rounded-full bg-gray-700 text-gray-300 mb-4">${iconHTML}</div>
            <h3 class="text-xl font-semibold text-white mb-2">${escapeHTML(title)}</h3>
            <p class="text-gray-400 mb-4 text-sm">${escapeHTML(desc)}</p>
            <div class="text-yellow-400 font-medium inline-flex items-center">访问链接
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
        </a>
        <div class="card-actions">
            <button class="card-action-btn edit" aria-label="编辑链接" title="编辑" data-action="edit" data-id="${id}"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path></svg></button>
            <button class="card-action-btn delete" aria-label="删除链接" title="删除" data-action="delete" data-id="${id}"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
        </div>
    `;
    categoryElement.appendChild(cardWrapper);
};

const renderApp = () => {
    categoriesContainer.innerHTML = '';
    
    CATEGORIES.forEach(cat => {
        const section = document.createElement('section');
        section.id = cat.id;
        section.innerHTML = `
            <h2 class="text-3xl font-bold mb-6 border-l-4 border-yellow-400 pl-3">${escapeHTML(cat.title)}</h2>
            <div class="card-grid grid grid-cols-1 md:grid-cols-2 gap-8"></div>
        `;
        categoriesContainer.appendChild(section);
    });

    getLinks().forEach(renderCard);
};

// --- 初始化与事件监听器 ---
const populateCategorySelect = () => {
    categorySelect.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.title;
        categorySelect.appendChild(option);
    });
};

const populateIconSelector = () => {
    iconSelectorGrid.innerHTML = '';
    for (const name in ICONS) {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'icon-option';
        iconWrapper.dataset.iconName = name;
        const iconIdentifier = ICONS[name];
        iconWrapper.innerHTML = getIconHTML(iconIdentifier, name, 'w-6 h-6');
        iconSelectorGrid.appendChild(iconWrapper);
    }
};

const showModal = (mode = 'add', linkId = null) => {
    addLinkForm.reset();
    document.querySelectorAll('.icon-option.selected').forEach(el => el.classList.remove('selected'));
    if (mode === 'edit') {
        currentEditId = linkId;
        modalTitle.textContent = '编辑链接';
        submitBtn.textContent = '保存更改';
        const linkData = getLinks().find(l => l.id === linkId);
        if (linkData) {
            document.getElementById('link-title').value = linkData.title;
            document.getElementById('link-url').value = linkData.url;
            document.getElementById('link-desc').value = linkData.desc;
            categorySelect.value = linkData.categoryId;
            document.querySelector(`[data-icon-name="${linkData.iconName}"]`)?.classList.add('selected');
        }
    } else {
        currentEditId = null;
        modalTitle.textContent = '添加新链接';
        submitBtn.textContent = '添加链接';
        document.querySelector(`[data-icon-name="${DEFAULT_ICON_NAME}"]`)?.classList.add('selected');
        categorySelect.value = CATEGORIES[0]?.id || '';
    }
    modal.classList.remove('opacity-0', 'pointer-events-none');
};

const hideModal = () => modal.classList.add('opacity-0', 'pointer-events-none');

showModalBtn.addEventListener('click', () => showModal('add'));
cancelBtn.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => (e.target === modal) && hideModal());

iconSelectorGrid.addEventListener('click', (e) => {
    const clickedIcon = e.target.closest('.icon-option');
    if (!clickedIcon) return;
    iconSelectorGrid.querySelectorAll('.icon-option.selected').forEach(icon => icon.classList.remove('selected'));
    clickedIcon.classList.add('selected');
});

addLinkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedIconEl = iconSelectorGrid.querySelector('.icon-option.selected');
    const iconName = selectedIconEl ? selectedIconEl.dataset.iconName : DEFAULT_ICON_NAME;
    const linkData = {
        title: document.getElementById('link-title').value,
        url: document.getElementById('link-url').value,
        desc: document.getElementById('link-desc').value,
        categoryId: categorySelect.value,
        iconName: iconName,
    };
    let links = getLinks();
    let newOrUpdatedLink;
    if (currentEditId) {
        const linkIndex = links.findIndex(l => l.id === currentEditId);
        if (linkIndex > -1) {
            newOrUpdatedLink = { ...links[linkIndex], ...linkData };
            links[linkIndex] = newOrUpdatedLink;
        }
    } else {
        newOrUpdatedLink = { ...linkData, id: 'user-' + Date.now() };
        links.push(newOrUpdatedLink);
    }
    saveLinks(links);
    renderCard(newOrUpdatedLink);
    hideModal();
});

categoriesContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === 'edit') {
        showModal('edit', id);
    } else if (action === 'delete') {
        if (confirm('您确定要删除这个链接吗？此操作无法撤销。')) {
            let links = getLinks().filter(link => link.id !== id);
            saveLinks(links);
            document.querySelector(`[data-id="${id}"]`)?.remove();
        }
    }
});

document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (confirm('您确定要恢复到默认链接设置吗？所有您自己添加或修改的链接都将丢失。')) {
        localStorage.removeItem('commEngPortalLinks');
        localStorage.removeItem('commEngPortalDataHash');
        location.reload();
    }
});

document.getElementById('copyright-year').textContent = new Date().getFullYear();

// --- App Initialization ---
populateIconSelector();
populateCategorySelect();
renderApp();
