<script>
  import mural from '$lib/img/AHA-Tranquil-9.jpg';
  import { onMount } from 'svelte';
  import TextDisplay from '$lib/components/TextDisplay.svelte';

  const cmToInch = 0.393701;
  const priceSqFt = 7.95;

  const INCHES = 'inches';
  const FEET = 'feet';
  const CENTIMETERS = 'centimeters';

  const order = {
    height: 0,
    width: 0,
    totalArea: 0,
    price: 0,
  };

  let artArea;
  let displayImage;
  let totalArea = 0;
  let height = 0;
  let height2 = 0;
  let width = 0;
  let width2 = 0;

  let viewHeight = '500px';
  let viewWidth = '1000px';

  let unit;
  let inches = true;
  let feet = false;
  let centimeters = false;

  onMount(() => {
    unit = INCHES;
    displayImage = document.querySelector('img');
    artArea = document.querySelector('.art-area');   

    artArea.style.width = viewWidth;
    artArea.style.height = viewHeight;
    displayImage.style.height = viewHeight;
  });

  function changeSize(event) {
    let value = Number(event.target.value);
    let id = String(event.target.id);
    let tempHeight = 0;
    let tempWidth = 0;

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

    setTimeout(() => {      
      switch (unit) {
        case INCHES:
          if (height > 0) viewHeight = `${convertToPx(height)}px`;
          if (width > 0) viewWidth = `${convertToPx(width)}px`;
          totalArea = height * width !== 0 ? Math.round((height / 12) * (width / 12)) : 0;
          order.height = `${height} in.`;
          order.width = `${width} in.`;
          order.totalArea = `${totalArea} sq ft`;
          order.price = `$${totalArea * priceSqFt}`;
          break;
        case CENTIMETERS:
          tempHeight = height * cmToInch;;
          tempWidth = width * cmToInch;
          if (height > 0) viewHeight = `${convertToPx(tempHeight)}px`;
          if (width > 0) viewWidth = `${convertToPx(tempWidth)}px`;
          totalArea = tempHeight * tempWidth !== 0 ? Math.round((tempHeight / 12) * (tempWidth / 12)) : 0;
          order.height = `${height} in.`;
          order.width = `${width} in.`;
          order.totalArea = `${totalArea} sq ft`;
          order.price = `$${totalArea * priceSqFt}`;
          break;
        case FEET:
          tempHeight = height2 + (height * 12);
          tempWidth = width2 + (width * 12);
          if (height > 0) viewHeight = `${convertToPx(tempHeight)}px`;
          if (width > 0) viewWidth = `${convertToPx(tempWidth)}px`;
          totalArea = tempHeight * tempWidth !== 0 ? Math.round((tempHeight / 12) * (tempWidth / 12)) : 0;
          order.height = `${height} in.`;
          order.width = `${width} in.`;
          order.totalArea = `${totalArea} sq ft`;
          order.price = `$${totalArea * priceSqFt}`;
          break;
      }

      artArea.style.width = viewWidth;
      artArea.style.height = viewHeight;
      displayImage.style.height = viewHeight;
    }, 1000)

    function convertToPx(value) {
      return value * 3;
    }
  }

  function setUnit(event) {
    switch (event.target.id) {
      case INCHES:
        unit = INCHES;
        inches = true;
        feet = centimeters = false;
        event.target.disabled = true;
        document.getElementById(FEET).disabled = false;
        document.getElementById(CENTIMETERS).disabled = false;
        clearFields();
        toggleVisibility();
        break;
      case FEET:
        unit = FEET;
        feet = true;
        inches = centimeters = false;
        event.target.disabled = true;
        document.getElementById(INCHES).disabled = false;
        document.getElementById(CENTIMETERS).disabled = false;
        clearFields();
        toggleVisibility();
        break;
      case CENTIMETERS:
        unit = CENTIMETERS;
        centimeters = true;
        feet = inches = false;
        event.target.disabled = true;
        document.getElementById(FEET).disabled = false;
        document.getElementById(INCHES).disabled = false;
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

    totalArea = 0;
    height = 0;
    height2 = 0;
    width = 0;
    width2 = 0;

    displayImage.style.height = '500px';
    artArea.style.height = '500px';
    artArea.style.width = '1000px';
  }
</script>

<div class="visualizer">
  <h1>Area Public Visualizer</h1>

  <div class="art-container">
    <div class="art-holder">
      <div class='art-area' bind:this={artArea}>
        <img
          src={mural}
          alt='Wonderful Art!'
        />
      </div>
    </div>
    <div class="show">
      <form>      
        <div class='inputs'>
          <div class='height'>
            <h4>Height</h4>
            <input id='height' type='text' on:input={changeSize} placeholder={unit} />   
            <input id='height-inches' class='visible' type='text' on:input={changeSize} placeholder='inches' />
          </div>
          <div class='width'>
            <h4>Width</h4>
            <input id='width' type='text' on:input={changeSize} placeholder={unit} />
            <input id='width-inches' class='visible' type='text' on:input={changeSize} placeholder='inches' />
          </div>
        </div>
        <div class='unit-buttons'>
          <button class='units' id={INCHES} on:click={setUnit} disabled>Inches</button>
          <button class='units' id={FEET} on:click={setUnit}>Feet & Inches</button>
          <button class='units' id={CENTIMETERS} on:click={setUnit}>Centimeters</button>
        </div>
      </form>
      <div class="price">
        <p>{totalArea} sq ft</p>
        <p>${priceSqFt} per square foot</p>
        <h3>Total: ${(totalArea * priceSqFt).toFixed(2)}</h3>
        <div class="cart-buttons">
          <button>Add to Cart</button>
          <button>Show Panels</button>
          <button class="clear" on:click={clearFields}>Clear Fields</button>
        </div>
      </div>
      <div class="text">
        <TextDisplay />
        <TextDisplay />
      </div>
    </div>
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
    border-bottom: 1px solid black;
  }  

  .art-holder {
    display: flex;
    justify-content: center;
    width: 85em;
    margin: 0;
  }

  .art-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
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
    margin-left: 1.5em;
  }

  .unit-buttons {
    align-self: center;
    max-width: 25em;
  }

  button {
    margin: 0.5em;
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

  .show {
    display: flex;
    flex-flow: column nowrap;
    align-self: center;
    margin-right: 3em;
  }
  
  .price {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    align-self: center;
    height: 15em;
    width: 25em;
    margin: 0;
  }

  .clear {
    align-self: center;
  }
  
  .text {
    max-width: 20em;
    align-self: center;
  }
</style>