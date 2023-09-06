<script>
  import hudsonValley from "$lib/img/Hudson-Valley--Oct-2022.jpg";
  import { onMount } from "svelte";

  let artArea;
  let startX;
  let displayImage;
  let height;
  let width;

  onMount(() => {
    displayImage = document.querySelector('img');
    artArea = document.querySelector('.art-area');

    artArea.style.width = '1000px';
    displayImage.style.width = '1200px';
    artArea.style.height = displayImage.style.height = '500px';
  });

  function changeSize(event) {
    let value = event.target.value;

    if (event.target.id === "height") {
      height = value;
    } else if (event.target.id === "width") {
      width = value;
    }

    artArea.style.width = `${width}px`;
    artArea.style.height = displayImage.style.height = `${height}px`;
  }

  function handleMouseMove(event) {
    startX = event.clientWidth / 2;
    const currentX = event.clientX;
    const deltaX = currentX - startX;
    displayImage.style.left = `${deltaX}px`;
    // console.log(`displayImage.style.left (mouseMove): ${displayImage.style.left}`);
  }

  function handleMouseDown(event) {
    startX = event.clientX - displayImage.clientWidth;
    displayImage.setAttribute('draggable', true);
    console.log(`draggable: ${displayImage.getAttribute('draggable')}`);
    // console.log(`startX (mouseDown): ${startX}`);
  }

  function handleMouseUp() {
    displayImage.setAttribute('draggable', false);
    console.log(`draggable: ${displayImage.getAttribute('draggable')}`);
  }
</script>

<h1>Area Public Visualizer</h1>

<form>
  <label for="height" class="measurement">Height</label>
  <input id="height" type="text" placeholder="Height" on:input={changeSize} />
  <label for="width" class="measurement">Width</label>
  <input id="width" type="text" placeholder="Width" on:input={changeSize} />
</form>

<div class="art-area" bind:this={artArea} {height}>
  <img
    src={hudsonValley}
    alt="Beautiful Hudson Valley"
    {height}
    aria-hidden="true"
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}
    on:mouseUp={handleMouseUp}
  />
</div>

<style>
  .art-area {
    border: 1px dotted black;
    z-index: 100;
    position: relative;
    overflow: hidden;
    margin-top: 2em;
  }
  
  img {
    z-index: -5;
    position: absolute;
  }
</style>