let PlayerStats = (function () {

    class PlayerStats {

        constructor() {

        }

        lvlUp(player) {
            if (player.lvl === 1) {
                player.lvl = 2;
                player.expToNextLvl = 500;
            }

            player.exp = 0;
        }

    }

    return PlayerStats;
}());











