/**
 * Lazy loading module for dynamically importing components.
 * 
 * We look if there is any `data-lazy` attribute in the HTML.
 * If so, we will load the component when the element is in the viewport.
 */

async function lazy_fetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

async function lazy_load(){
    const lazyElements = document.querySelectorAll('[lazy-load]');
 
    const urls = Array.from(lazyElements).map(el => el.getAttribute('lazy-load')).filter(Boolean);
    urls.forEach(async (url) => {
        const content = await lazy_fetch(url);
        if (content) {
            const container = document.querySelector(`[lazy-load="${url}"]`);
            if (container) {
                container.outerHTML = content;
                
            }
        }
    });
}

lazy_load() 

window.addEventListener('DOMContentLoaded', () => {
    lazy_load();
});