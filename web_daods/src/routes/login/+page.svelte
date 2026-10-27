<style>
    main {
    color: aliceblue;
    font-family: "Montserrat", sans-serif;
    font-size: 120%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    z-index: 2; 
    }
    .class1{
        display: block;
        margin-left: auto;
        margin-right: auto;
        border-style: solid;
        border-color: rgb(12, 12, 12);
        background-color: rgb(12, 12, 12);
        border-width: thick;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 300px;
    }
    .class2{
        display: block;
        flex-direction: column;
        text-align: center;
        margin-top: auto;
        justify-content: center;
    }
    .inputmargin{
        margin-top: 150px;
        padding: 10px 20px;
    }
    .inputlogin{
        margin-top: 30px;
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        background-color: #f1f1f1;
    }
    form button{
        margin-top: 25px;
        padding: 8px 12px;
        border-radius: 10px;
        border: none;
        background-color: #f1f1f1;
        color: black;
    }
    form button:hover{
        background-color: #bdbbbb;
    }
    
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

</style>
<main>
    <div class="class2">
        <h1 class="inputmargin">Daods</h1>
        <br>
        <form class="class1" id="formulario-login" action="/" method="POST">
            <label for="email">Email:</label>
            <input id="email" class="inputlogin" type="Email" name="email" placeholder="Nome@url.com"><br>
            <label for="senha">Senha: </label>
            <input id=senha class="inputlogin" type="password" name="password" placeholder="Senha"><br>
            <button type="submit">Enviar</button>
        </form>
    </div>
</main>
    <Background></Background>



<script lang="ts">
    import Background from "#lib/assets/background.svelte";
</script>