<script>
  import mural from '$lib/img/AHA-Tranquil-9.jpg';
  import { onMount } from 'svelte';

  const cmToInch = 0.393701;

  let artArea;
  let displayImage;

  let height;
  let height2 = 0;
  let width;
  let width2 = 0;

  let viewHeight = '500px';
  let viewWidth = '1000px';

  let unit = 'inches';
  let inches = true;
  let feet = false;
  let centimeters = false;

  onMount(() => {
    displayImage = document.querySelector('img');
    artArea = document.querySelector('.art-area');

    artArea.style.width = viewWidth;
    artArea.style.height = viewHeight;
    displayImage.style.height = viewHeight;
  });

  function changeSize(event) {
    let value = Number(event.target.value);
    let id = String(event.target.id);

    switch (id) {
      case 'height':
        height = value;
        break;
      case 'height-inches':
        height2 = value;
        break;
      case 'width':
        width = value;
        break;
      case 'width-inches':
        width2 = value;
        break;
    }
    
    switch (unit) {
      case 'inches':
        viewHeight = `${convertToPx(height)}px`;
        viewWidth = `${convertToPx(width)}px`;
        break;
      case 'centimeters':
        viewHeight = `${convertToPx(height * cmToInch)}px`;
        viewWidth = `${convertToPx(width * cmToInch)}px`;
        break;
      case 'feet':
        let tempHeight = height2 + (height * 12);
        let tempWidth = width2 + (width * 12);
        console.log(`temp: ${tempHeight} x ${tempWidth}`);
        viewHeight = `${convertToPx(tempHeight)}px`;
        viewWidth = `${convertToPx(tempWidth)}px`;
        console.log(`view: ${viewHeight} x ${viewWidth}`);
        break;
    }

    artArea.style.width = viewWidth;
    artArea.style.height = viewHeight;
    displayImage.style.height = viewHeight;

    function convertToPx(value) {
      return value * 3;
    }
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

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }

    displayImage.style.height = '500px';
    artArea.style.height = '500px';
    artArea.style.width = '1000px';
  }

  // Need to have three buttons to change between 'inches', 'feet & inches', and 'centimeters'
  // Need a function to calculate the total area and price based upon that.
</script>

<div class="visualizer">
  <h1>Area Public Visualizer</h1>

  <div class="art-container">
    <div class='art-area' bind:this={artArea}>
      <img
        src={mural}
        alt='Wonderful Art!'
      />
    </div>
    <form>      
      <div class='inputs'>
        <div class='height'>
          <h4>Height</h4>
          <input id='height' type='text' on:input={changeSize} placeholder={unit} />   
          <input id='height-inches' class='visible' type='text' on:input={changeSize} placeholder="inches" />
        </div>
        <div class='width'>
          <h4>Width</h4>
          <input id='width' type='text' on:input={changeSize} placeholder={unit} />    
          <input id='width-inches' class='visible' type='text' on:input={changeSize} placeholder="inches" />
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
    margin-top: 2em;
    max-width: 80%;
    align-self: center;
  }

  img {
    z-index: -5;
    position: absolute;
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
    margin-bottom: -0.025em;
    align-self: center;
  }

  .visible {
    display: none;
  }
</style>