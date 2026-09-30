document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const btn = document.getElementById('toggleSidebar');
    if (!container || !btn) return;
    function setCollapsed(collapsed) {
        container.classList.toggle('collapsed', collapsed);
        btn.setAttribute('aria-expanded', String(!collapsed));
        btn.setAttribute('aria-label', collapsed ? 'Abrir menu lateral' : 'Recolher menu lateral');
        try { localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0'); } catch (e) {}
    }
 
    btn.addEventListener('click', () => {
        setCollapsed(!container.classList.contains('collapsed'));
    });
    try {
        if (localStorage.getItem('sidebarCollapsed') === '1') setCollapsed(true);
    } catch (e) {}
});
 