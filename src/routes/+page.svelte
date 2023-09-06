<script>
  import hudsonValley from '$lib/img/Hudson-Valley--Oct-2022.jpg';
  import { onMount } from 'svelte';

  import convertUnits from '$lib/functions/convertUnits.js';

  let artArea;
  let displayImage;
  let height;
  let width;
  let unit = 'inches';
  let inches = true;
  let feet = false;
  let centimeters = false;

  onMount(() => {
    displayImage = document.querySelector('img');
    artArea = document.querySelector('.art-area');

    artArea.style.width = '1000px';
    displayImage.style.width = '1200px';
    artArea.style.height = displayImage.style.height = '500px';
  });

  function changeSize(event) {
    let value = event.target.value;
    let id = event.target.id;

    if (id === 'height') { // if unit === feet, need to capture inches also
      height = value;
    } else if (id === 'width') {
      width = value;
    }

    artArea.style.width = `${width}px`;
    artArea.style.height = displayImage.style.height = `${height}px`;
  }

  function setUnit(event) {
    switch (event.target.id) {
      case 'inches':
        unit = 'inches';
        inches = true;
        feet = centimeters = false;
        toggleVisibility();
        break;
      case 'feet':
        unit = 'feet';
        feet = true;
        inches = centimeters = false;
        toggleVisibility();
        break;
      case 'centimeters':
        unit = 'centimeters';
        centimeters = true;
        feet = inches = false;
        toggleVisibility();
        break;
    }
  }

  function toggleVisibility() {
    let elements = document.getElementsByClassName('visible');
    
    for (let i = 0; i < elements.length; i++) {
      const style = elements[i].style;
      style.display = feet ? 'block' : 'none';
    }
  }

  

  // Need to have three buttons to change between 'inches', 'feet & inches', and 'centimeters'
  // Need a function to calculate the total area and price based upon that.
</script>

<h1>Area Public Visualizer</h1>

<form>
  <div class='buttons'>
    <button class='units' id='inches' on:click={setUnit}>Inches</button>
    <button class='units' id='feet' on:click={setUnit}>Feet & Inches</button>
    <button class='units' id='centimeters' on:click={setUnit}>Centimeters</button>
  </div>
  <div class='inputs'>
    <div class='height'>
      <label for='height' class='measurement'>Height({unit}): </label>
      <input id='height' type='text' on:input={changeSize} />

      <label for='height' class='measurement visible'>Height(inches): </label>
      <input id='height-inches' class='visible' type='text' />
    </div>
    <div class='width'>
      <label for='width' class='measurement'>Width({unit}): </label>
      <input id='width' type='text' on:input={changeSize} />

      <label for='width' class='measurement visible'>Width(inches): </label>
      <input id='width-inches' class='visible' type='text' />
    </div>
  </div>
</form>

<div class='art-area' bind:this={artArea} {height}>
  <img
    src={hudsonValley}
    alt='Beautiful Hudson Valley'
    {height}
  />
</div>

<style>
  * {
    border: 1px solid red;
  }
  .art-area {
    border: 1px dotted black;
    z-index: 100;
    position: relative;
    overflow: hidden;
    margin-top: 2em;
    max-width: 80%;
  }

  form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-content: space-between;
    max-width: 80%;
  }

  .buttons {
    align-self: center;
    max-width: 25em;
  }

  button {
    margin: 1em;
  }

  .inputs {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 1em;
  }

  .height, .width {
    display: flex;
    flex-direction: row;
  }

  .visible {
    display: none;
  }
  
  img {
    z-index: -5;
    position: absolute;
  }
</style>