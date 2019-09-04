class Character {
  constructor(src,cssName,borderStyle){
    this.src = src;
    this.cssName = cssName;
    this.bigImgid = '#' + this.cssName + 'BigPic';
    this.borderStyle = borderStyle;
    this.mainTile = '.mainTile';
    this.lifeLevel = 100;
    this.lifeLevelDisplay = "#" + this.cssName + 'LifeLevel';
    this.currentWeapon = '';
    this.oldWeapon = '';
    this.WeaponName = '#' + this.cssName + 'WeaponName';
    this.WeaponPoint = '#' + this.cssName + 'WeaponPoint';
    this.WeaponImg = '#' + this.cssName + 'WeaponImg';
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
    $(this.WeaponPoint).text(10);

  }
};


class Weapon {
  constructor(name,src,attackPoint,cssClass, pigWsrc,hamsterWsrc,pigW,hamsterW){
    this.name = name;
    this.src = src;
    this.attackPoint = attackPoint;
    this.cssClass = cssClass;
    this.piggieWithWeapon = pigWsrc;
    this.hamsterWithWeapon = hamsterWsrc;
    this.pigW = pigW;
    this.hamsterW = hamsterW;
    weapons.push(this);
  }

};

