<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    let { children } = $props();
    let collapsed = $state(false);
    const links = [
        { href: '/', label: 'Início' },
        { href: '/dashboard-professor', label: 'Dashboard' },
        { href: '/grade', label: 'Nova Grade' },
        { href: '/user', label: 'Perfil' },
        { href: '/notificacoes', label: 'Notificações' },
        { href: '/configuracao', label: 'Configurações' }
    ];
    function isActive(href: string) {
        const path = page.url.pathname;
        return href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
    }
    function setCollapsed(value: boolean) {
        collapsed = value;
        try {
            localStorage.setItem('sidebarCollapsed', value ? '1' : '0');
        } catch (e) {}
    }
    
    onMount(() => {
        try {
            if (localStorage.getItem('sidebarCollapsed') === '1') collapsed = true;
        } catch (e) {}
    });
  const semLayout = ['/login', '/logon'];
</script>

{#if semLayout.includes(page.url.pathname)}
  {@render children()}
{:else}
  <div class="container" class:collapsed id="container">
    <button
        class="toggle-sidebar"
        id="toggleSidebar"
        type="button"
        aria-label={collapsed ? 'Abrir menu lateral' : 'Recolher menu lateral'}
        aria-expanded={!collapsed}
        aria-controls="sidebar"
        onclick={() => setCollapsed(!collapsed)}
    >
        ☰
    </button>
    <aside class="sidebar" id="sidebar">
        <h2>Dados</h2>
        <ul data-sveltekit-preload-data="false">
            {#each links as link}
                <li>
                    <a
                        href={link.href}
                        class:active={isActive(link.href)}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>
    </aside>
    <main class="content">
        {@render children()}
    </main>
</div>
{/if}





<style>
    :global(*) {
        font-family: "Montserrat", sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        background-color: #101010;
        background-image: url("/img/background1.png"); /* arquivo em static/img/ */
        background-repeat: no-repeat;
        color: aliceblue;
        font-size: 120%;
    }
    h2 {
        color: aliceblue;
        font-size: 120%;
        margin-top: 5px;
    }
    a {
        text-decoration: none;
        color: wheat;
    }
    .sidebar {
        background-color: rgb(12, 12, 12);
        width: 250px;
        padding: 20px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: width 0.25s ease;
    }
    .sidebar ul {
        list-style: none;
        margin-top: 20px;
    }
    .sidebar ul li a {
        color: #bbb;
        text-decoration: none;
        padding: 8px;
        display: block;
        border-radius: 8px;
        transition:
            color 0.15s ease,
            background-color 0.15s ease;
    }
    .sidebar ul li a:hover {
        color: #fff;
    }
    .sidebar ul li a.active {
        color: #fff;
        background-color: rgb(40, 40, 40);
    }
    .sidebar h2,
    .sidebar ul {
        transition: opacity 0.2s ease;
    }
    .content {
        margin-left: 250px;
        transition: margin-left 0.25s ease;
    }
    .toggle-sidebar {
        position: fixed;
        top: 20px;
        left: 208px;
        z-index: 10;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(12, 12, 12);
        color: #bbb;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition:
            left 0.25s ease,
            color 0.15s ease,
            background-color 0.15s ease;
    }
    .toggle-sidebar:hover {
        color: #fff;
        background-color: rgb(30, 30, 30);
    }
    .toggle-sidebar:focus-visible {
        outline: 2px solid wheat;
        outline-offset: 2px;
    }
    .container.collapsed .sidebar {
        width: 50px;
    }
    .container.collapsed .sidebar h2,
    .container.collapsed .sidebar ul {
        opacity: 0;
        pointer-events: none;
    }
    .container.collapsed .content {
        margin-left: 50px;
    }
    .container.collapsed .toggle-sidebar {
        left: 9px;
    }
    @media (prefers-reduced-motion: reduce) {
        .sidebar,
        .content,
        .toggle-sidebar {
            transition: none;
        }
    }
</style>