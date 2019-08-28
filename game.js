class Character {
  constructor(src,cssName,borderStyle){
    this.src = src;
    this.cssName = cssName;
    this.bigImgid = "#" + this.cssName + 'BigPic';
    this.mainTile = '.mainTile';
    this.lifeLevel = 100;
    this.lifeLevelDisplay = "#" + this.cssName + 'LifeLevel';
    this.currentWeapon = '';
    this.borderStyle = borderStyle;
    this.WeaponName = '#' + this.cssName + 'WeaponName';
    this.weaponPoint = '#' + this.cssName + 'WeaponPoint';
  }

  calculatePos(){
    console.log($('.' + this.cssName).index(this.mainTile));
    return ($('.' + this.cssName).index(this.mainTile));
  }
  resetChaStatus(){
    this.currentWeapon = '';
    this.lifeLevel = 100;
    $(this.lifeLevelDisplay).text(' ' + this.lifeLevel); 
    $(this.WeaponName).text('Tiny Cute Punch');
    $(this.weaponPoint).text(10);

  }



};




class Weapon {
  constructor(name,src,attackPoint,cssClass){
    this.name = name;
    this.src = src;
    this.attackPoint = attackPoint;
    this.cssClass = cssClass;
    weapons.push(this);
  }

};

