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


<div class="container margin" id="container">
    <main class="content">
        <p class="cabecalho" class:collapsed={sidebar.collapsed}>Nova Grade</p>
        <div class="content__items">
            <h2>Quase nada a ver aqui</h2>
            <div class="plan center">
                <table>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>E</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <td>1</td>
                            <td><input type="text" name="A1"></td>
                            <td><input type="text" name="A2"></td>
                            <td><input type="text" name="A3"></td>
                            <td><input type="text" name="A4"></td>
                            <td><input type="text" name="A5"></td></tr>
                        <tr>
                            <td>2</td>
                            <td><input type="text" name="B1"></td>
                            <td><input type="text" name="B2"></td>
                            <td><input type="text" name="B3"></td>
                            <td><input type="text" name="B4"></td>
                            <td><input type="text" name="B5"></td></tr>
                        <tr>
                            <td>3</td>
                            <td><input type="text" name="C1"></td>
                            <td><input type="text" name="C2"></td>
                            <td><input type="text" name="C3"></td>
                            <td><input type="text" name="C4"></td>
                            <td><input type="text" name="C5"></td></tr>
                        <tr>
                            <td>4</td>
                            <td><input type="text" name="D1"></td>
                            <td><input type="text" name="D2"></td>
                            <td><input type="text" name="D3"></td>
                            <td><input type="text" name="D4"></td>
                            <td><input type="text" name="D5"></td></tr>
                        <tr>
                            <td>5</td>
                            <td><input type="text" name="E1"></td>
                            <td><input type="text" name="E2"></td>
                            <td><input type="text" name="E3"></td>
                            <td><input type="text" name="E4"></td>
                            <td><input type="text" name="E5"></td></tr>
                    </thead>
                </table>
            </div>
        </div>
    </main>
    <Background></Background>
</div>
<script lang="ts">
    import Background from "#lib/assets/background.svelte";
    import { sidebar } from '#lib/assets/sidebar.svelte.ts';
</script>