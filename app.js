// Define Variables --> use Jquery to write obj for main tile and source img/row/square and fruit veg src img

let Rows = 10;
let Columns = 10;

//create img element with Jquery, //Equivalent: $(document.createElement('img'))

const landTile = $('<img />',{
  class: 'mainTile',
  src:'img/maintiles.png',
}) 

// var testing = $('<img />',
//              { id: 'Myid',
//                src: 'img/PIG_01.png', 
//                width: 300
//              }).appendTo('#mytest');

const ROW = $('<div />',{
  class:'row'
});
const Square = $('<div />',{
  class: 'square'
});

let pigSrc = 'img/pig_small_01.png';
let hamsterSrc = 'img/crazy_hamster_01.png';
let weapons = [];

function init(){
  //set character stats to default

  piggie.resetChaStatus();
  hamster.resetChaStatus();

  //redraw map

  $('.mainTile').attr('class','mainTile').attr('src','img/maintiles.png');
  tileBlocks();
  tileWeapons();
  addCharactersPig();

  activePlayer = piggie;

  updateHighlight(activePlayer); //start the highlight for beginning of the game already
  
  addCharactersHamster();

}


//Document Ready

$().ready(function(){
  $(Square).append(landTile);

  for(var i = 0; i < Columns; i++){
    ROW.append(Square.clone());
  }

  for(var i = 0; i <Rows; i++){
    $('#gameboard').append(ROW.clone());
  }

  init();
})



// create random tile for weapsons and blocks

function randomNumber(){

  let randomNum = Math.floor(Math.random() * $('.mainTile').length);
  var lastrandomNum;
  if(randomNum === lastrandomNum ){
    console.log('opps! same number, do it again!');
    randomNumber();
  }
  lastrandomNum = randomNum;
  return randomNum;

}

//loop over the selected random tile until it finds one that's not occupied. 

function selectRandomTile(){
  let randomT = $('.mainTile:eq(' + randomNumber() +')');
  while($(randomT).hasClass('occupiedTile') || $(randomT).hasClass('weapon') || randomT === -1 ){
    randomT = $('.mainTle:eq(' + randomNumber() +')');
  }
 
  return randomT;
}


function tileBlocks(){
  for(var i =0; i < 7; i++){
    $(selectRandomTile()).attr('src', 'img/blocks.png').addClass('occupiedTile');
  }
  for(var i = 0; i < 3; i++){
    $(selectRandomTile()).attr('src','img/mushroom_house.png').addClass('occupiedTile');
  }

}

function tileWeapons(){
  $(selectRandomTile()).attr('src','img/banana.png').addClass('weapon').addClass(banana.cssClass).removeClass('occupiedTile');
  $(selectRandomTile()).attr('src','img/donut.png').addClass('weapon').addClass(donut.cssClass).removeClass('occupiedTile');
  $(selectRandomTile()).attr('src','img/music.png').addClass('weapon').addClass(music.cssClass).removeClass('occupiedTile');
  $(selectRandomTile()).attr('src','img/pipe.png').addClass('weapon').addClass(pipe.cssClass).removeClass('occupiredTile');
}


//use character function constructor for TWo characters and put them on the canvas


let piggie = new Character (pigSrc, 'piggie','2px solid deeppink');
let hamster = new Character(hamsterSrc,'hamster', '2px solid darkorange');



function addCharactersPig(){
  $(selectRandomTile()).attr('src', pigSrc).addClass('occupiedTile character piggie');
}

function addCharactersHamster(){

  $(selectRandomTile()).attr('src',hamsterSrc).addClass('occupiedTile character hamster');
}

let activePlayer = piggie;
let passivePlayer = hamster;


//debug for two charcater start not next to each other!!



//Weapons and their img src/ attack point and cssClass name

let banana = new Weapon('Banana','img/banana.png',30, 'banana');
let music = new Weapon ('Music', 'img/music.png',25,'Music');
let pipe = new Weapon('pipe','img/pipe.png',40, 'pipe');
let donut = new Weapon('donut','img/donut.png',35,'donut');



//push all avaliable tiles from 4 direction of the character into an array 
//condition: 1. should be within the number column/row 2. the direction +/- 1,2,3 tile should NOT have a class name of 'occupiedTile', 3. aval. tiles should be max 3 steps away from characters, 

function getAvailableTile(characterPos){
    
  let avaliableTiles = [];

  let i = 1; //right side
  while(!((characterPos + i) % Columns === 0) && !($('.mainTile:eq(' + (characterPos + i) + ')').hasClass('occupiedTile')) && i<=3) {
    avaliableTiles.push($('.mainTile:eq(' + (characterPos + i) + ')'));

    i++;
  }

  i = 1; //left side
  while(!((characterPos - i + 1) % Columns === 0) && !($('.mainTile:eq(' + (characterPos - i ) + ')').hasClass('occupiedTile')) && i <= 3){
    avaliableTiles.push($('.mainTile:eq('+(characterPos - i) +')'));
    i++
  }

  i = 1; // top
  
  while(((characterPos - Columns * i) >= 0) && !($('.mainTile:eq('+(characterPos - Columns * i) + ')').hasClass('occupiedTile')) && i <=3){
    avaliableTiles.push($('.mainTile:eq('+(characterPos - Columns * i) +')'));
    i++;
  }

  i = 1; //bottom
  
  while(((characterPos + Columns * i) >= 0) && !($('.mainTile:eq('+(characterPos + Columns * i) + ')').hasClass('occupiedTile')) && i <= 3){

    avaliableTiles.push($('.mainTile:eq('+(characterPos + Columns * i)+')'));
    i++;
  }

  console.log(avaliableTiles);
  return avaliableTiles;
}



//adding hover effect (mouseEnter mouseLeave) functionality to avalable tiles

function selectAvailableTiles(player){
  //1. loop over all the avalible tiles of the player and give box sizing and border-box,  hint: $.each(array or obj), function callback)/ $(this)  

  $.each((getAvailableTile(player.calculatePos())), function(){
    $(this).css('box-sizing','border-box');
    $(this).css('border', player.borderStyle);

    //2. on mouseenter evt , the aval tiles array attr src and css transform none $(this)/ css transform

    $(this).mouseenter(function(){
      $(this).attr('src', player.src).css('transform','none');
      
    });

    //3.On mouse Leave evt  set back tile's img src (weapons. maintile), $(this).mouseleave(function(){ })// if it's a weapon, use $.each to loop through all weapons, if normal tile then just change the attr img src back to original maintile img src

    $(this).mouseleave(function(){
      $(this).css('transform','none');

      if($(this).hasClass('weapon')){
        that = $(this);
        $.each(weapons, function(index, w){ //!!need attention!
          if(that.hasClass(w.cssClass)){
            that.attr('src', w.src);
          };
        });
      }else {
        $(this).attr('src','img/maintiles.png');
      }
    });

  });
  
}

/* --------------remove event listeners--------------- */

//use off(evt) to deselet all the event listener, also reset the border to none for both characters,

function deselectAvailableTiles(characterPosition){

    $.each((getAvailableTile(characterPosition)), function(){
      $(this).off('click');
      $(this).off('mouseenter');
      $(this).off('mouseleave');
      $(this).css('border','none');

      var p = $('.piggie').index('.mainTile');
      var h = $('.hamster').index('.mainTile');
      let newPiggiePos = $('.maintile:eq('+p+')');
      let newHamsterPos = $('.mainTile:eq('+h+')');

      newPiggiePos.css('border','none');
      newHamsterPos.css('border','none');


    });
};

/*---------------- Weapon Function----------------------- */














/*---------------- Movement ----------------------- */

//this function will use chracter's Pos  and also move it to a new pos/ as well as changing the img src and css classses

function movement(player){

  //1. loop through all available tiles and define old/ new pos

  $.each(getAvailableTile(player.calculatePos()),function(){

    $(this).on('click',function(){

      oldPos = player.calculatePos();
      newPos = ($(this).index('.mainTile'));

      deselectAvailableTiles(oldPos);

        //delete the oldPos class and img src
      $('.mainTile:eq('+(oldPos)+')').removeClass('occupiedTile character piggie hamster');

      $('.mainTile:eq('+(oldPos)+')').attr('src','img/maintiles.png');



        //add the img/src to the newPos
      $(this).attr('src',player.src).css('transform','none');
      $(this).addClass('occupiedTile character').addClass(player.cssName);

      //Get into Battle Mode if both character are next to each other , condition: new - another player = 1 or -1, 10 or -10, 



      //End current player's term and next player start
      nextPlayer();


      //update the highlighting part /use selectedavaialableTile function and repeat this movement function for next player again

      updateHighlight(activePlayer);
      

    })

  })

}

function updateHighlight(player){

  selectAvailableTiles(player);
  movement(player);

}



function nextPlayer(){

  if(activePlayer === piggie){
    activePlayer = hamster;
    passivePlayer = piggie;
  }else {
    activePlayer = piggie;
    passivePlayer = hamster;
  }

}