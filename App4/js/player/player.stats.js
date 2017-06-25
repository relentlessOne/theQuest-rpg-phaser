let PlayerInfo = (function () {

    class PlayerInfo {

        constructor() {

        }

        lvlUp(player) {
            if (player.lvl === 1) {
                player.lvl = 2;
                player.expToNextLvl = 500;
            }
        }

    }

    return PlayerInfo;
}());











