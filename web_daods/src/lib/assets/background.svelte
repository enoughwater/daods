<style>
    :global(html),
    :global(body) {
        margin: 0;
    }
    .page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }
    .bg__container {
        position: absolute;
        top: 60vh;
        transform: translate(-50%);
        z-index: -1;
    }
    .bg {
        position: absolute;
        top: -60vh;
        left: 0;
        width: 100%;
        height: calc(60vh + 100%);
        background: linear-gradient(180deg, #212121 60vh, #101010 100%);
        z-index: -2;
    }
    .column {
        display: flex;
        flex-direction: column;
        transform: translateX(-100px);
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .row:nth-child(2n) {
        margin-left: 50px;
    }

    .hexagono {
        width: 100px;
        height: 100px;
        clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
        rotate: 90deg;
    }

    .row:nth-child(1) .hexagono {
        opacity: 0;
    }

    .row:nth-child(1) .hexagono:nth-child(3n) {
        background-color: #1c1c1cff;
        opacity: 1;
    }

    .row:nth-child(2) .hexagono {
        background-color: #171717ff;
    }

    .row:nth-child(3) .hexagono {
        background-color: #101010ff;
    }

    .row:nth-child(4) .hexagono {
        background-color: #101010ff;
    }

    .row:nth-child(5) .hexagono {
        background-color: #101010ff;
    }
    

</style>


<div class="page">
    <div class="bg__container">
        <div class="bg"></div>
        <div class="column">
            {#each Array(5) as _, i}
                <div class="row">
                    {#each Array(500) as _, j}
                        <div class="hexagono"></div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<script lang="ts">

</script>

