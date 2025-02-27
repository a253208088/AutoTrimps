var upgradeList = ['Miners', 'Scientists', 'Coordination', 'Speedminer', 'Speedlumber', 'Speedfarming', 'Speedscience', 'Speedexplorer', 'Megaminer', 'Megalumber', 'Megafarming', 'Megascience', 'Efficiency', 'TrainTacular', 'Trainers', 'Explorers', 'Blockmaster', 'Battle', 'Bloodlust', 'Bounty', 'Egg', 'Anger', 'Formations', 'Dominance', 'Barrier', 'UberHut', 'UberHouse', 'UberMansion', 'UberHotel', 'UberResort', 'Trapstorm', 'Gigastation', 'Shieldblock', 'Potency', 'Magmamancers'];

function buyUpgrades() {

    for (var upgrade in upgradeList) {
        upgrade = upgradeList[upgrade];
        var gameUpgrade = game.upgrades[upgrade];
        var available = (gameUpgrade.allowed > gameUpgrade.done && canAffordTwoLevel(gameUpgrade));
	var fuckbuildinggiga = (game.talents.autoStructure.purchased && game.talents.deciBuild.purchased && getPageSetting('hidebuildings')==true && getPageSetting('BuyBuildingsNew')==0);
		
	//Coord & Amals
	if (upgrade == 'Coordination' && (getPageSetting('BuyUpgradesNew') == 2 || !canAffordCoordinationTrimps())) continue;
	if (upgrade == 'Coordination' && getPageSetting('amalcoord')==true && getPageSetting('amalcoordhd') > 0 && calcHDratio() < getPageSetting('amalcoordhd') && ((getPageSetting('amalcoordt') < 0 && (game.global.world < getPageSetting('amalcoordz') || getPageSetting('amalcoordz') < 0)) || (getPageSetting('amalcoordt') > 0 && getPageSetting('amalcoordt') > game.jobs.Amalgamator.owned && (game.resources.trimps.realMax() / game.resources.trimps.getCurrentSend()) > 2000))) continue;
	
	//WS
	if (
	    upgrade == 'Coordination' && getEmpowerment() == "Wind" && 
	    (
		(getPageSetting('AutoStance') == 3 && game.global.challengeActive != "Daily" && getPageSetting('WindStackingMin') > 0 && game.global.world >= getPageSetting('WindStackingMin') && calcHDratio() < 5) || 
		(getPageSetting('use3daily') == true && game.global.challengeActive == "Daily" && getPageSetting('dWindStackingMin') > 0 && game.global.world >= getPageSetting('dWindStackingMin') && calcHDratio() < 5)
	    )
	) continue;
	
	if (
	    upgrade == 'Coordination' && 
	    (
		(getPageSetting('AutoStance') == 3 && game.global.challengeActive != "Daily" && getPageSetting('wsmax') > 0 && getPageSetting('wsmaxhd') > 0 && game.global.world >= getPageSetting('wsmax') && calcHDratio() < getPageSetting('wsmaxhd')) || 
		(getPageSetting('use3daily') == true && game.global.challengeActive == "Daily" && getPageSetting('dwsmax') > 0 && getPageSetting('dwsmaxhd') > 0 && game.global.world >= getPageSetting('dwsmax') && calcHDratio() < getPageSetting('dwsmaxhd'))
	    )
	) continue;

	//Other
        if (upgrade == 'Shieldblock' && !getPageSetting('BuyShieldblock')) continue;
        if (upgrade == 'Gigastation' && !fuckbuildinggiga && (game.global.lastWarp ? game.buildings.Warpstation.owned < (Math.floor(game.upgrades.Gigastation.done * getPageSetting('DeltaGigastation')) + getPageSetting('FirstGigastation')) : game.buildings.Warpstation.owned < getPageSetting('FirstGigastation'))) continue;
        if (upgrade == 'Bloodlust' && game.global.challengeActive == 'Scientist' && getPageSetting('BetterAutoFight')) continue;

        if (!available) continue;
        if (game.upgrades.Scientists.done < game.upgrades.Scientists.allowed && upgrade != 'Scientists') continue;
        buyUpgrade(upgrade, true, true);
        debug('Upgraded ' + upgrade, "upgrades", "*upload2");
    }
}
