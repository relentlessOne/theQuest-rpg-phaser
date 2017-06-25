let PlayerStats = (function () {

    class PlayerStats {

        constructor() {

        }

        lvlUp(player) {
               
            player.lvl++;
            player.expToNextLvl *= 2;
            player.bulletSpeed += 20;
            player.maxBulletDistance += 40;
            player.maxHp += 50;
            player.maxMana += 20;
            player.manaRefreshRate -= 4000;
            player.exp = 0;
        }

    }

    return PlayerStats;
}());











