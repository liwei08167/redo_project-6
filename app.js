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
  $('#piggieBigPic');
  tileBlocks();
  tileWeapons();
  addCharactersPig();

  activePlayer = piggie;

  updateHighlight(activePlayer); //start the highlight for beginning of the game already
  
  addCharactersHamster();
  twoNotTogether();

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
    return randomNumber();
  }
  lastrandomNum = randomNum;
  return randomNum;

}

//loop over the selected random tile until it finds one that's not occupied, and make sure all the elements are presented

function selectRandomTile(){
  let randomT = $('.mainTile:eq(' + randomNumber() +')');
  while($(randomT).hasClass('occupiedTile') && $(randomT).hasClass('weapon') && randomT === -1 && $(randomT).hasClass('piggie') && $(randomT).hasClass('hamster')){
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
  $(selectRandomTile()).attr('src','img/banana.png').addClass('weapon').addClass(banana.cssClass).removeClass('occupiedTile').removeClass('occupiredTile');
  $(selectRandomTile()).attr('src','img/donut.png').addClass('weapon').addClass(donut.cssClass).removeClass('occupiedTile').removeClass('occupiredTile');
  $(selectRandomTile()).attr('src','img/music.png').addClass('weapon').addClass(music.cssClass).removeClass('occupiedTile').removeClass('occupiredTile');
  $(selectRandomTile()).attr('src','img/pipe.png').addClass('weapon').addClass(pipe.cssClass).removeClass('occupiredTile').removeClass('occupiredTile');  
  
}


//use character function constructor for TWo characters and put them on the canvas


let piggie = new Character (pigSrc, 'piggie','2px solid deeppink');
let hamster = new Character(hamsterSrc,'hamster', '2px solid darkorange');



function addCharactersPig(){
  $(selectRandomTile()).attr('src', pigSrc).addClass('occupiedTile character piggie').css('transform','scaleX(1)');
  

}

function addCharactersHamster(){

  $(selectRandomTile()).attr('src',hamsterSrc).addClass('occupiedTile character hamster');
}

// add extra function to make sure they are not next to each other in the beginning of the game, also bug-prevention. 


function twoNotTogether(){

  var pig = $('.mainTile').index($('.piggie'));
  var hamster = $(".mainTile").index($(".hamster"));
  var cht = $(".mainTile").index($(".character"));
  var Wp = $(".mainTile").index($(".weapon"));
  var bk = $(".mainTile").index($(".occupiedTile"));
  
  $('.mainTile:eq('+($(".mainTile").index($(".hamster")))+')').hasClass('banana');
 

  if( pig === hamster || pig - hamster == Columns || pig - hamster == - Columns ||pig - hamster === 1 || pig - hamster === -1 || $('.weapon').length < 4 || $('.occupiedTile').length < 9 || hamster == -1 || piggie == -1 || $('.mainTile:eq('+($(".mainTile").index($(".piggie")))+')').hasClass('weapon') ==true || $('.mainTile:eq('+($(".mainTile").index($(".hamster")))+')').hasClass('weapon') == true || $('.mainTile:eq('+($(".mainTile").index($(".weapon")))+')').hasClass('occupiedTile')==true ) {

    
   location.reload();

  }
}

let activePlayer = piggie;
let passivePlayer = hamster;


//Weapons and their img src/ attack point and cssClass name

let banana = new Weapon('Banana','img/banana.png',30, 'banana','img/pig_banana.png','img/crazy_hamster_banana.png','img/banana.png','img/banana.png');
let music = new Weapon ('Music', 'img/music.png',25,'Music', 'img/pig_music.png','img/crazy_hamster_music.png','img/music.png','img/music.png');
let pipe = new Weapon('pipe','img/pipe.png',40, 'pipe', 'img/pig_pipe.png','img/crazy_hamster_pipe.png','img/pipe.png','img/pipe.png');
let donut = new Weapon('donut','img/donut.png',35,'donut','img/pig_donut.png','img/crazy_hamster_donut.png','img/donut.png','img/donut.png');




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
    i++;
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

function checkWeapons(player, position){
  
  //loop through all the weapons cell
  $.each(weapons,function(index, w){
    
    //remove the weapon class from oldPosition
    if($('.mainTile:eq(' + (position) + ')').hasClass(w.cssClass)){

        $('.mainTile:eq('+(position)+')').removeClass(w.cssClass).removeClass('weapon');
      
        
        //oldweapon and new weapon , if first time, then old/current are same

        player.oldWeapon = player.currentWeapon;
        // 1. if 2nd weapon: change the cssclassName and also 'weapon' and update the img src 
        
        if(player.oldWeapon !== ''){
          
          $('.mainTile:eq('+(position)+')').addClass(player.oldWeapon.cssClass).addClass('weapon');
          
          $('.mainTile:eq('+(position)+')').attr('src', player.oldWeapon.src);
      
          
        }else {
          
          //2 if 1st weapon : change the attr img source to maintile
          $('.mainTile:eq('+(position)+')').attr('src','img/maintiles.png');
        }
        
        
        //3, update the text name and attack point on the player stats
        
        $(player.WeaponName).text(w.name);
        $(player.WeaponPoint).text(w.attackPoint);
        
        //4. update the images on player stats
        
        if(player === piggie){
          
          $(piggie.bigImgid).attr('src', w.piggieWithWeapon);
          piggie.currentWeapon = w;

          $('.piggieWeaponImg').attr('src', w.pigW).css('width','120px').css('height','120px').css('padding','2px').css('border','2px solid deeppink');
        
        }else {
          
          $(hamster.bigImgid).attr('src', w.hamsterWithWeapon);
          hamster.currentWeapon = w;
          $('.hamsterWeaponImg').attr('src', w.hamsterW).css('width','120px').css('height','120px').css('padding','2px').css('border','2px solid orange');
        }
        
        return false;
      }
  });
};

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


       // character will leave the 1st weapon behind( when leaving the tile) and pick up the new one , condition: if the cell has class of weapon and also player's oldWeapon !== '', if so, then change the oldPos src to old weapson's src. If not, then change it to mainTile

       if($('.mainTile:eq('+(oldPos)+')').hasClass('weapon') && (player.oldWeapon !== '')){

          $('.mainTile:eq('+(oldPos)+')').attr('src',player.oldWeapon.src);
       }else {
          $('.mainTile:eq('+(oldPos)+')').attr('src','img/maintiles.png');
       };

       //defining which direction to check for weapons, then loop over the selection, condition: newPos - OldPos > 0 and < 4, for loop

       if((newPos - oldPos) < 4 && (newPos - oldPos) > 0){

        //right
        for(var i = 1; i <= (newPos - oldPos); i++){
          checkWeapons(player, oldPos + i);
        }

       }else if((newPos - oldPos) > -4 && (newPos - oldPos) < 0 ){

        //left
        for(var i = -1; i >= (newPos - oldPos); i--){
          checkWeapons(player, oldPos + i);

        }
      }else if((newPos - oldPos) >= Columns){

      //down

        for(var i = Columns; i <= (newPos - oldPos); i += Columns){
          checkWeapons(player, oldPos + i);

        }  
       }else {

        //up
        for(var i = -Columns; i >= (newPos - oldPos); i -= Columns){
          checkWeapons(player, oldPos + i);

       }
      }

        //add the img/src to the newPos
      $(this).attr('src',player.src).css('transform','none');
      $(this).addClass('occupiedTile character').addClass(player.cssName);

      //Get into Battle Mode if both character are next to each other , condition: new - another player = 1 or -1, 10 or -10, 

      if(newPos - passivePlayer.calculatePos() == 1 || newPos - passivePlayer.calculatePos() == -1 || newPos - passivePlayer.calculatePos() == Columns || newPos - passivePlayer.calculatePos() == -Columns ){
        
        battleUI();
        return;
      }

      //End current player's term and next player start
      nextPlayer();


      //update the highlighting part /use selectedavaialableTile function and repeat this movement function for next player again

      updateHighlight(activePlayer); 

    });

  });

};



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
/*-----------------------BattleMode --------------------------*/

//the gameboard should disappear and replace by fighting scene + attack and defend button div/ button

function battleUI(){
  $('#gameboard').fadeOut(300);

  $('#player1').delay(3000).append('<div id="piggieBtnDiv"><button id="piggieFightBtn"> Piggie Fight</button> <button id="piggieDefendBtn"> Piggie Defend </button></div>');

  $('#player2').delay(3000).append('<div id="hamsterBtnDiv"> <button id="hamsterFightBtn">Hamster Fight</button><button id="hamsterDefendBtn"> Hamster Defend </button></div>');

  // $('#main').css('margin-top','30px');
  $('h1').css('margin-top','50px');


//change the fight picture

  $('#hamsterBigPic').css('margin-top','15px');


//fight function and nextPlayer function
  
  nextPlayer();
  fight(activePlayer);

};

// fighting scene

function fight(player){
  
 
  showActivePlayer(player);
  player.isDefending = false;

  /*when activeplayer click attack 
  if(with weapon){
    passiveplayer (if Not defending), whose life will be deducted from activeplayer's attack power (weapon attackpoints), but 
    IF (passive player defending== true) {
      passiveplayer 's life will be deducted by (activePlayer's weapon /2)
    }
    
  }else(without weapon){
    passiveplayer (if Not defending), whose life will be deducted from activeplayer's attack power (which is only 10 by default);
    
    IF (passive player defending == true) {
      passiveplayer 's life will be deducted by (activePlayer's weapon /2)
    }
  }
  */

 $(player.attackBtn).on('click', function(){
  
    if(player.currentWeapon === ""){
      
      if(passivePlayer.isDefending === true){
        passivePlayer.lifeLevel -= 10 / 2;
        passivePlayer.isDefending = false; 
      
      }else{
        passivePlayer.lifeLevel -= 10;
      
      }
    }else{
      if(passivePlayer.isDefending === true){
        
        passivePlayer.lifeLevel -= Math.floor(player.currentWeapon.attackPoint / 2);
        passivePlayer.isDefending = false;
       
      }else{
        passivePlayer.lifeLevel -= player.currentWeapon.attackPoint;
        
      }
    }

    $(passivePlayer.lifeLevelDisplay).text(' '  + passivePlayer.lifeLevel);
    //animation effect for being attack?

    //Winning condition: when Passiveplayer lifelevel <= 0, then  player1, player2 will fade out and then append an winner img to the #main , then a H1 message said who is the winner, and then append a button for playing again.

    if(passivePlayer.lifeLevel <= 0){

      
      $('#main').css('text-align','center');
      $('#player1').fadeOut(1000);
      $('#player2').fadeOut(1000, function(){
        $('#main').css('display','block');

        $('<div id="winnerImgDiv"><img src=' + player.WinningPic + '  width= 600px </div>').hide().appendTo('#main').fadeIn(1250);

        $('<h1 id="winningMsg">'+ player.cssName + ' ' +' is the WINNER!</h1>').appendTo('#main').fadeIn(1500);

        $('#main').append('<div id="playAgain"><button id="playAgainBtn"> Play Again </button></div>').fadeIn(1800);

        playAgain();
      });
    }

    $(player.attackBtn).off('click');
    $(player.defendBtn).off('click');

    nextPlayer();
    fight(activePlayer);
   
  });

  //Defend button, when Player press defending, isDefending will bbe TRUE, then it will switch to next player (meaning player's button off and back to fight function)   and when passivePlayer got attacked, the life will only be deducted by half.

  $(player.defendBtn).on('click',function(){
    
    player.isDefending = true;
    $(player.attackBtn).off('click');
    $(player.defendBtn).off('click');

    nextPlayer();
    fight(activePlayer);

  })

}

function showActivePlayer(player){


  $(player.dot).addClass('activeDot');
  $(passivePlayer.dot).removeClass('activeDot');
  $(player.bigImgid).delay(2500).css('transform','scale(1.3)').removeClass('fade');
  $(passivePlayer.bigImgid).delay(2500).css('transform','scale(0.9)').addClass('fade');

  $(passivePlayer.attackBtn).hide();
  $(passivePlayer.defendBtn).hide();

  $(player.attackBtn).show();
  $(player.defendBtn).show();

}

/*--------------------------Play Again Button -------------------*/
// press play again button will enable : 1 removal of id winnerImgDiv, winnerImg winnerMSG playagain div  2. back to the beginning reload()/ or init()?

function playAgain(){

  $('#playAgainBtn').on('click', function(){

    $('#playAgain').remove();
    $('#winningMsg').remove();
    $('#winnerImgDiv').remove();
    $('#piggieBtnDiv').remove();
    $('#hamsterBtnDiv').remove();
    $('#gameboard').css('display','block');

    $('#main').css('display', 'flex').css('margin-top','20px');

    //player1 and player 2 should be displayed again!

    $('#player1').fadeIn(1000);
    $('#player2').fadeIn(1000);
   
    $('#piggieBigPic').removeClass('fade').css('transform','scale(1)').attr('src','img/pig_big.png');
    $('#piggiedot').removeClass('activeDot');
    $('#hamsterBigPic').removeClass('fade').css('transform','scale(1)').attr('src','img/crazy_hamster_big.png');
    $('#hamsterdot').removeClass('activeDot');
    $('.piggieWeaponImg').attr('src','').css('width',0).css('height',0).css('border','none');
    $('.hamsterWeaponImg').attr('src','').css('width',0).css('height',0).css('border','none');

    
    init();
    
   
  })

}



/*--------------------------Modal -------------------*/