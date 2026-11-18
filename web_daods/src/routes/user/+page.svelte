<style>
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
    a{
        text-decoration: none;
        color:wheat
    }


    .profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: 8px;
    color: aliceblue;
    transition: color 0.15s ease, background-color 0.15s ease;
    }
    .avatar {
        width: 25vh;
        height: 25vh;
        flex-shrink: 0;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .avatar:hover{
        color: #fff;
        background-color: rgb(40, 40, 40);
    }
    .info {
        display: flex;
        flex-direction: column;
        line-height: 1.3;
        min-width: 0;
    }
    strong{
        font-size: 10vh;
    }
</style>
<div class="container" id="container">
    <main class="content">
        <p class="cabecalho" class:collapsed={sidebar.collapsed}>Perfil</p>
        <div class="content__items">
            <div class="profile">
                <img class="avatar" src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" alt="Foto de perfil" />
                <div class="info">
                    <strong>Nome</strong>
                    <span>@usuario</span>
                </div>
            </div>
            <a href="/"><br>Trocar senha</a>
            <a href="/login"><br>Sair da conta</a>
        </div>
    </main>
    <Background></Background>
</div>

<script lang="ts">
    import Background from "#lib/assets/background.svelte";
    import { sidebar } from '#lib/assets/sidebar.svelte.ts';
</script>