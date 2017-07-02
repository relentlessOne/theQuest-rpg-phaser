let PlayerStats = (function () {

    class PlayerStats {

        constructor() {

        }

        lvlUp(player) {
               
            player.lvl++;
            player.expToNextLvl += 500 * player.lvl;
            player.bulletSpeed += 10;
            player.maxBulletDistance += 5;
            player.maxHp += 100;
            player.maxMana += 100;
            player.manaRefreshRate -= 250;
            player.exp = 0;
        }

    }

    return PlayerStats;
}());











