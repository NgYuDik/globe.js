
function getLanguage(){
    const htmlElement = document.documentElement;
    const lang = htmlElement.lang;
    return lang;
}
// 1. 获取页面中所有标签
function getAllTags() {
    return document.querySelectorAll('*');
  }
  
  // 2. 读取名为 languageTo- 文件
  async function loadTranslationFile() {
    try {
      const response = await fetch('../language/languageTo-'+getLanguage()+'.json');
      if (!response.ok) {
        throw new Error('无法加载翻译文件');
      }
      const translations = await response.json();
      return translations;
    } catch (error) {
      console.error('读取翻译文件时发生错误:', error);
      return null;
    }
  }
  
  // 3. 替换HTML文本为翻译值
  async function translatePage() {
    const translations = await loadTranslationFile();
    if (!translations) return;
  
    // 获取页面中的所有标签
    const allTags = getAllTags();
  
    // 遍历所有标签，检查其文本内容是否需要替换
    allTags.forEach(tag => {
      // 对每个标签，检查其包含的文本
      if (tag.childNodes) {
        tag.childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            const textContent = child.textContent.trim();
            // 如果翻译文件中有对应的文本，则替换
            if (translations[textContent]) {
              child.textContent = translations[textContent];
            }
          }
        });
      }
    });
  }
  
  // 4. 页面加载时执行翻译
  window.onload = () => {
    translatePage();
  };
  