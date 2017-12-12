//ogre adventure

function ogreAdventure() {

//objects

	const maxWeapDamage = {
		dagger: 20,
		longsword: 25,
		greatsword: 60,
		club: 30,
		wand: 1000
	}
	const adventurer = {
		character: '',
		class: 'Ranger',
		hitPoints: 60,
		weapons: ['Dagger', 'Long Sword'],
		chosenWeap: 0,
		alignment: 'good',
		attack: function(inven) {
			let maxDmg = this.weapons[inven].toLowerCase().replace(' ', '');
			let dmg = Math.floor(Math.random() * (maxWeapDamage[maxDmg] - (maxWeapDamage[maxDmg] - 10)) + 1) + (maxWeapDamage[maxDmg] - 10);
			return dmg;
		}
	}
	 const ogre = {
	 	character: 'Ogre',
	 	class: 'Ogre',
	 	hitPoints: 80,
	 	weapons: ['Club'],
	 	alignment: 'evil',
	 	attack: function(inven) {
			let maxDmg = this.weapons[inven].toLowerCase().replace(' ', '');
			let dmg = Math.floor(Math.random() * (maxWeapDamage[maxDmg] - (maxWeapDamage[maxDmg] - 10)) + 1) + (maxWeapDamage[maxDmg] - 10);
			return dmg;
		}
	 }
	 const fairie = {
	 	character: 'Matilda',
	 	class: 'Fairie',
	 	hitPoints: 500,
	 	weapons: ['Wand'],
	 	alignment: 'good',
	 	attack: function(inven) {
			let maxDmg = this.weapons[inven].toLowerCase().replace(' ', '');
			let dmg = Math.floor(Math.random() * (maxWeapDamage[maxDmg] - (maxWeapDamage[maxDmg] - 100)) + 1) + (maxWeapDamage[maxDmg] - 10);
			return dmg;
		},
		status: 0
	 }	
	 const currRoom = {
	 	north: true,
	 	south: true,
	 	east: false,
	 	west: false
	 }

//actions

	function upgradeWeapon() {
		let answer = confirm("The fairie approaches you slowly. 'If you are truly of a pure heart, surrender your weapon to me.' Press ok to surrender your weapon or cancel to keep it.");
		answer ? newSword() : fairieFight();
	}

	function newSword() {
		let exchange = prompt("Your weapons are " + checkWeapons(adventurer) + ". Enter the corresponding number to select the weapon you wish to surrender");
		alert("With only the slightest flick of her wand, the fairie showers your " + adventurer.weapons[exchange] + " with light. Again, you shield your eyes.");
		adventurer.weapons[exchange] = "Great Sword";
		alert("When you look back, your weapon has been replaced with a mighty " + adventurer.weapons[exchange] + "! 'Now go! Defeat the ogre!' Squeals the fairie. She vanishes in a shower of purple-blue light.");
		fairie.status = 1;
		advenStart();

	}

	function checkWeapons(char) {
		let tempWeap = "";
			for (let i = 0; i <= char.weapons.length - 1; i++) {
				i === 0 ? tempWeap += i.toString()+". "+char.weapons[i] : tempWeap += " | "+i.toString()+". "+char.weapons[i];
			}
		//returns string containing weapon names and the corresponding weapon index in which they are stored
		return tempWeap;
	}

	function dealDamage(char, damage) {
		let remainingHitPoints = char.hitPoints - damage;
		char.hitPoints = remainingHitPoints;
		return remainingHitPoints;
	}

	function fightOgre(char, weapon) {
		alert(char.character + " attacks with his "+char.weapons[weapon]+"!");
		let damageDealt = char.attack(weapon);
		ogre.hitPoints = ogre.hitPoints - damageDealt;
		alert(char.character + " deals " + damageDealt + " damage to the Ogre!");
		if (ogre.hitPoints >= 0) { 
			alert("The Ogre is still alive!"); 
			ogreFight(ogre, 0);
		}
		else {
			alert("The Ogre lets out a terrible cry and falls to the ground slain! You wipe off your weapon, sheath it, and exit the room.");
			advenEnd();
		}
	}

	function ogreFight(char, weapon) {
		alert(char.character + " attacks with his " +char.weapons[weapon]+"!");
		let damageDealt = char.attack(weapon);
		adventurer.hitPoints = adventurer.hitPoints - damageDealt;
		alert(char.character + " deals " + damageDealt + " damage to you!");
		if (adventurer.hitPoints >= 0) {
			alert("You're still alive! Strike back!");
			fightOgre(adventurer, adventurer.chosenWeap);
		}
		else {
			alert("You fight valiantly, but the ogre is too strong. As you sluggishly attempt to defend yourself one last time, his club rains down it's final blow, knocking the last of your strength from you.")
			youDie();
		}
	}

	function wakeOgre() {
		alert("As you attempt to carefully edge your way around the room, you trip on your shoelace. You knew velcro was the way to go! Immediately, the Ogre snaps awake.");
		adventurer.chosenWeap = prompt("Your weapons are: "+checkWeapons(adventurer)+". Enter the weapon's corresponding number to choose to fight with it.");
		fightOgre(adventurer, adventurer.chosenWeap);
	}

	function fairieFight() {
		alert("You are not pure of heart! You attack the fairie. As you leap to strike, she swings back and turns her wand on you in the blink of an eye!");
		let damageDealt = fairie.attack(0);
		adventurer.hitPoints = adventurer.hitPoints - damageDealt;
		alert(fairie.character + " deals " + damageDealt + " damage to you!");
		if (adventurer.hitPoints >= 0) {
			fightFairie();
		}
		else {
			alert("A devastating blast of magic strikes you square in the chest! You lose consciousness before your body hits the ground.");
			youDie();
		}
	}


//encounters


	function advenStart() {
		if (adventurer.character === ""){
			adventurer.character = prompt("Enter your character's name.");
		}
		let begin = confirm(adventurer.character+", you are in barren, dark room. The Wizard has trapped you! There are doors to your north and south. Press ok to head north, and cancel to go south.");
		begin ? headNorth() : headSouth();
	}

	function headNorth() {
		alert("As you make your way down the dark corridor, a rancid smell enters your nostrils. There is a light ahead. You press forward. Finally, you exit the hallway into a torchlit room.")
		let answer = prompt("In the center, near a (clearly) magically lit fire, an ogre slumbers! There is an exit on the opposite side of the room. COMMANDS: sneak | fight | turn back")
		ogreBattle = answer.trim().toLowerCase();
		if (ogreBattle === 'sneak') {
			let rng = Math.random();
			rng > 0.15 ? wakeOgre() : advenEnd();
		}
		else if (ogreBattle === 'fight') {
			adventurer.chosenWeap = prompt("Your weapons are: "+checkWeapons(adventurer)+". Enter the weapon's corresponding number to choose to fight with it.");
			fightOgre(adventurer, adventurer.chosenWeap);
		}
		else if (ogreBattle === 'turn back') {
			advenStart();
		}
		else {
			alert("please select one of the COMMANDS.");
			headNorth();
		}
	}

	function headSouth() {
		if (fairie.status === 1) {
			alert("You find nothing to the south");
			advenStart();
		}
		else {
			alert("The southern path winds back and forth through a crumbling tunnel. As you round a corner, you are suddenly met by a blinding bright purple glow!")
			let answer = prompt("You shield your eyes for a moment as they adjust. When you lower your arm, you see a fairie fluttering before you! COMMANDS: speak | fight | turn back")
			fairieEncounter = answer.trim().toLowerCase();
			if (fairieEncounter === 'speak') {
				let answer = confirm("The fairie eyes you suspiciously. 'Are you pure of heart?' she asks. Press ok to respond yes, and cancel to respond no.");
				answer ? upgradeWeapon() : fairieFight();
			}
			else if (fairieEncounter === 'fight') {
				adventurer.chosenWeap = prompt("Your weapons are: "+checkWeapons(adventurer)+". Enter the weapon's corresponding number to choose to fight with it.");
				fairieFight();
			}
			else if (fairieEncounter === 'turn back') {
				advenStart();
			}
			else {
				alert("Please select one of the COMMANDS.");
				headSouth();
			}
		}
	}

	function advenEnd() {
		let restart = confirm("You made it! You managed to escape the Wizard's hellish dungeon. Press ok to play again, or cancel to roll the credits. :~)")
		restart ? ogreAdventure() : credits();
	}

	function youDie() {
		let restart = confirm("You have perished. Fortunately (or unfortunately, depending on your perspective) the Wizard has granted you eternal chances to complete this game. Press ok to try again, or cancel to end your suffering.");
		restart ? ogreAdventure() : credits();
	}

	function credits() {
		document.getElementById('thanksforplaying').style.display = "block";
		document.getElementById('dancegalf').style.display = "block";
		document.getElementById('createdby').style.display = "block";
	}

	advenStart();
}

ogreAdventure();




