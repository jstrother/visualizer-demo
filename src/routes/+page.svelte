<script>
  import hudsonValley from "$lib/img/Hudson-Valley--Oct-2022.jpg";
  import { onMount } from "svelte";

  let canvas;
  let startX;
  let displayImage;
  let height;
  let width;

  onMount(() => {
    displayImage = document.querySelector('img');
  });

  function changeSize(event) {
    let value = event.target.value;

    if (event.target.id === "height") {
      height = value;
    } else if (event.target.id === "width") {
      width = value;
    }

    // Set the canvas's width and height.
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  function handleMouseMove(event) {
    startX = displayImage.clientWidth / 2;
    const currentX = event.clientX;
    const deltaX = currentX - startX;
    displayImage.style.left = `${deltaX}px`;
    console.log(`displayImage.style.left (mouseMove): ${displayImage.style.left}`);
  }

  function handleMouseDown(event) {
    startX = event.clientX - (displayImage.clientWidth / 2);
    displayImage.draggable = true;
    console.log(`startX (mouseDown): ${startX}`);
  }
</script>

<h1>Area Public Visualizer</h1>

<form>
  <label for="height" class="measurement">Height</label>
  <input id="height" type="text" placeholder="Height" on:input={changeSize} />
  <label for="width" class="measurement">Width</label>
  <input id="width" type="text" placeholder="Width" on:input={changeSize} />
</form>

<div class="art-area" bind:this={canvas} {height}>
  <img
    src={hudsonValley}
    alt="Beautiful Hudson Valley"
    {height}
    aria-hidden="true"
    draggable="false"
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}
  />
</div>

<style>
  .art-area {
    border: 1px dotted black;
    z-index: 100;
    position: relative;
    min-height: 250px;
    overflow: hidden;
  }
  
  img {
    z-index: -5;
    overflow: hidden;
    position: absolute;
  }
</style>