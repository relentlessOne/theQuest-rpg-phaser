let PlayerStats = (function () {

    class PlayerStats {

        constructor() {

        }

        lvlUp(player) {
               
            player.lvl++;
            player.expToNextLvl *= 1.5;
            player.bulletSpeed += 20;
            player.maxBulletDistance += 40;
            player.maxHp += 50;
            player.maxMana += 40;
            player.manaRefreshRate -= 250;
            player.exp = 0;
        }

    }

    return PlayerStats;
}());











