<style>
    h2 {
        font-family: "Montserrat", sans-serif;
        box-sizing: border-box;
    }
    .cabecalho {
        color: aliceblue;
        background-color: rgb(25, 25, 25);
        margin-top: -0.8vh;
        padding: 8px;
        font-size: 1em;
        width: 200%;
        transition: margin 0.25s ease;
        padding-bottom: 0px;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .container {
        height: 100%;
        width: 100vw;
        display: flex;
        z-index: 1; 
        position: relative;
    }
    .content {
        position: relative;
        z-index: 15;
        width: calc(100% - 10px);
        transition: margin-left 0.25s ease, width 0.25s ease;
    }
    .content__items {
        padding: 20px;
    }
</style>

<div class="container" id="container">
    <main class="content">
        <p class="cabecalho" class:collapsed={sidebar.collapsed}>Dashboard - Professor</p>
        <div class="content__items">
            <h2>Nada a ver aqui</h2>
        </div>
    </main>
    <Background></Background>
</div>

<script lang="ts">
    import Background from "#lib/assets/background.svelte";
    import { sidebar } from '#lib/assets/sidebar.svelte.ts';
</script>