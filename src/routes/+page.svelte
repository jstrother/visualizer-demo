<script>
  import mural from '$lib/img/AHA-Tranquil-9.jpg';
  import { onMount } from 'svelte';

  import convertUnits from '$lib/functions/convertUnits.js';

  let artArea;
  let displayImage;
  let height;
  let width;
  let draggables;

  let unit = 'inches';
  let inches = true;
  let feet = false;
  let centimeters = false;

  onMount(() => {
    displayImage = document.querySelector('img');
    artArea = document.querySelector('.art-area');
    draggables = document.querySelectorAll('.drag');

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
        clearFields();
        toggleVisibility();
        break;
      case 'feet':
        unit = 'feet';
        feet = true;
        inches = centimeters = false;
        clearFields();
        toggleVisibility();
        break;
      case 'centimeters':
        unit = 'centimeters';
        centimeters = true;
        feet = inches = false;
        clearFields();
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

  function clearFields() {
    let inputs = document.querySelectorAll('input');
    displayImage.style.width = '1200px';

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  }

  // Need to have three buttons to change between 'inches', 'feet & inches', and 'centimeters'
  // Need a function to calculate the total area and price based upon that.
</script>

<div class="visualizer">
  <h1>Area Public Visualizer</h1>

  <div class="art-container">
    <div class='art-area' bind:this={artArea} {height}>
      <img
        src={mural}
        alt='Beautiful Hudson Valley'
        {height}
      />
    </div>
    <form>      
      <div class='inputs'>
        <div class='height'>
          <h4>Height</h4>
          <input id='height' type='text' on:input={changeSize} placeholder={unit} />   
          <input id='height-inches' class='visible' type='text' placeholder="inches" />
        </div>
        <div class='width'>
          <h4>Width</h4>
          <input id='width' type='text' on:input={changeSize} placeholder={unit} />    
          <input id='width-inches' class='visible' type='text' placeholder="inches" />
        </div>
      </div>
      <div class='buttons'>
        <button class='units' id='inches' on:click={setUnit}>Inches</button>
        <button class='units' id='feet' on:click={setUnit}>Feet & Inches</button>
        <button class='units' id='centimeters' on:click={setUnit}>Centimeters</button>
      </div>
    </form>
  </div>
</div>

<style>
  * {
    /* border: 1px solid red; */
  }

  .visualizer {
    display: flex;
    flex-flow: column nowrap;
  }

  h1 {
    align-self: center;
    margin-left: -10em;
  }

  .art-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
  .art-area {
    border: 1px dotted black;
    z-index: 100;
    position: relative;
    overflow: hidden;
    left: 0px;
    top: 0px;
    background-position-x: 0px;
    background-repeat: repeat-x;
    background-size: contain;
    margin-top: 2em;
    max-width: 80%;
    align-self: center;
  }

  form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-content: space-between;
    align-self: center;
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
    flex-direction: column;
  }

  h4 {
    margin-bottom: -0.1em;
    align-self: center;
  }

  .visible {
    display: none;
  }
  
  img {
    z-index: -5;
    position: absolute;
  }
</style>